###
# Immutable Audit Log Storage
###
module "immutable_cdc_audit_logs_storage" {
  source  = "pagopa-dx/azure-storage-account/azurerm"
  version = "0.1.0"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = var.app_name
    instance_number = var.instance_number
  }

  resource_group_name = var.resource_group_name
  subnet_pep_id       = var.subnet_pep_id

  blob_features = {
    versioning          = true
    restore_policy_days = 0
    immutability_policy = {
      enabled                       = true
      allow_protected_append_writes = false
      period_since_creation_in_days = var.cdc_storage_immutability_policy_days
    }
  }

  action_group_id = var.action_group_id

  tier = "l"

  tags = var.tags
}


module "immutable_cdc_audit_logs_storage_customer_managed_key" {
  source               = "git::https://github.com/pagopa/terraform-azurerm-v4//storage_account_customer_managed_key?ref=v7.26.3"
  tenant_id            = var.tenant_id
  location             = var.location
  resource_group_name  = var.resource_group_name
  key_vault_id         = var.key_vault_id
  key_name             = format("%s-key", module.immutable_cdc_audit_logs_storage.name)
  storage_id           = module.immutable_cdc_audit_logs_storage.id
  storage_principal_id = module.immutable_cdc_audit_logs_storage.identity.0.principal_id
}

resource "azurerm_private_endpoint" "immutable_cdc_audit_logs_storage_blob" {
  depends_on = [module.immutable_cdc_audit_logs_storage]

  name                = "${module.immutable_cdc_audit_logs_storage.name}-blob-endpoint"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.subnet_pep_id

  private_service_connection {
    name                           = "${module.immutable_cdc_audit_logs_storage.name}-blob"
    private_connection_resource_id = module.immutable_cdc_audit_logs_storage.id
    is_manual_connection           = false
    subresource_names              = ["blob"]
  }

  private_dns_zone_group {
    name                 = "private-dns-zone-group"
    private_dns_zone_ids = [var.privatelink_blob_core_windows_net_id]
  }

  tags = var.tags
}

# Containers
resource "azurerm_storage_container" "immutable_cdc_audit_logs_storage_logs" {
  depends_on = [module.immutable_cdc_audit_logs_storage, azurerm_private_endpoint.immutable_cdc_audit_logs_storage_blob]

  name                  = "logs"
  storage_account_name  = module.immutable_cdc_audit_logs_storage.name
  container_access_type = "private"
}

# Policies
resource "azurerm_storage_management_policy" "immutable_cdc_audit_logs_storage_management_policy" {
  depends_on = [module.immutable_cdc_audit_logs_storage, azurerm_storage_container.immutable_cdc_audit_logs_storage_logs]

  storage_account_id = module.immutable_cdc_audit_logs_storage.id

  rule {
    name    = "deletepolicy"
    enabled = true
    filters {
      prefix_match = [
        azurerm_storage_container.immutable_cdc_audit_logs_storage_logs.name,
      ]
      blob_types = ["blockBlob"]
    }
    actions {
      base_blob {
        delete_after_days_since_creation_greater_than = var.cdc_storage_immutability_policy_days + 1
      }
      snapshot {
        delete_after_days_since_creation_greater_than = var.cdc_storage_immutability_policy_days + 1
      }
      version {
        delete_after_days_since_creation = var.cdc_storage_immutability_policy_days + 1
      }
    }
  }
}
