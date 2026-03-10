###
# Immutable Audit Log Storage for proxy
###
module "immutable_cdc_audit_logs_storage_proxy" {
  source  = "pagopa-dx/azure-storage-account/azurerm"
  version = "~> 2.0"

  resource_group_name = var.resource_group_name
  subnet_pep_id       = var.subnet_pep_id

  use_case                           = "audit"
  audit_retention_days               = var.cdc_storage_proxy_immutability_policy_days
  override_infrastructure_encryption = true
  secondary_location                 = "spaincentral"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = var.app_name
    instance_number = var.instance_number
  }

  diagnostic_settings = {
    enabled                    = true
    log_analytics_workspace_id = var.log_analytics_workspace_id
  }

  containers = [{
    name        = "logs"
    access_type = "private"
  }]

  subservices_enabled = {
    blob = true
  }

  blob_features = {
    versioning = true
  }

  customer_managed_key = {
    enabled      = true
    type         = "kv"
    key_vault_id = var.key_vault_id
  }

  action_group_id = var.action_group_id

  tags = var.tags
}
