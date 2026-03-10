module "roles" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.0"

  principal_id    = module.backend_func.cdc_backend_func.principal_id
  subscription_id = data.azurerm_subscription.current.subscription_id

  storage_blob = [
    {
      storage_account_name = module.storage_audit.immutable_cdc_audit_logs_storage.name
      resource_group_name  = module.storage_audit.immutable_cdc_audit_logs_storage.resource_group_name
      role                 = "owner"
      description          = "Allow backend func to write FIMS audit blobs"
    },
    {
      storage_account_name = module.storage_audit_proxy.immutable_cdc_audit_logs_storage_proxy.name
      resource_group_name  = module.storage_audit_proxy.immutable_cdc_audit_logs_storage_proxy.resource_group_name
      role                 = "owner"
      description          = "Allow backend func to write external audit blobs"
    }
  ]

  storage_queue = [
    {
      storage_account_name = module.storage_be.cdc_storage_be.name
      resource_group_name  = module.storage_be.cdc_storage_be.resource_group_name
      role                 = "writer"
      description          = "we need to write queue"
    },
    {
      storage_account_name = module.storage_be.cdc_storage_be.name
      resource_group_name  = module.storage_be.cdc_storage_be.resource_group_name
      role                 = "reader"
      description          = "we need to read queue"
    },
    {
      storage_account_name = module.storage_be.cdc_storage_be.name
      resource_group_name  = module.storage_be.cdc_storage_be.resource_group_name
      role                 = "owner"
      description          = "we need to own the queue"
    }
  ]

  key_vault = [
    {
      name                = module.key_vaults.key_vault_cdc.name
      resource_group_name = module.key_vaults.key_vault_cdc.resource_group_name
      description         = "Allow CDC Backend Function to read secrets from Key Vault"
      roles = {
        secrets = "reader"
      }
    }
  ]

  cosmos = [{
    account_name        = module.cosmos_db.cosmos_db.name
    resource_group_name = module.cosmos_db.cosmos_db.resource_group_name
    role                = "writer"
    description         = "Allow CDC Backend Function to read/write CosmosDB via RBAC"
  }]
}

module "roles_staging" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.0"

  principal_id    = module.backend_func.cdc_backend_func.staging_principal_id
  subscription_id = data.azurerm_subscription.current.subscription_id

  storage_blob = [
    {
      storage_account_name = module.storage_audit.immutable_cdc_audit_logs_storage.name
      resource_group_name  = module.storage_audit.immutable_cdc_audit_logs_storage.resource_group_name
      role                 = "owner"
      description          = "Allow backend func (staging) to write FIMS audit blobs with index tags"
    },
    {
      storage_account_name = module.storage_audit_proxy.immutable_cdc_audit_logs_storage_proxy.name
      resource_group_name  = module.storage_audit_proxy.immutable_cdc_audit_logs_storage_proxy.resource_group_name
      role                 = "owner"
      description          = "Allow backend func (staging) to write external audit blobs with index tags"
    }
  ]

  storage_queue = [
    {
      storage_account_name = module.storage_be.cdc_storage_be.name
      resource_group_name  = module.storage_be.cdc_storage_be.resource_group_name
      role                 = "writer"
      description          = "we need to write queue"
    },
    {
      storage_account_name = module.storage_be.cdc_storage_be.name
      resource_group_name  = module.storage_be.cdc_storage_be.resource_group_name
      role                 = "reader"
      description          = "we need to read queue"
    },
    {
      storage_account_name = module.storage_be.cdc_storage_be.name
      resource_group_name  = module.storage_be.cdc_storage_be.resource_group_name
      role                 = "owner"
      description          = "we need to own the queue"
    }
  ]

  key_vault = [
    {
      name                = module.key_vaults.key_vault_cdc.name
      resource_group_name = module.key_vaults.key_vault_cdc.resource_group_name
      description         = "Allow CDC Backend Function (staging slot) to read secrets from Key Vault"
      roles = {
        secrets = "reader"
      }
    }
  ]

  cosmos = [{
    account_name        = module.cosmos_db.cosmos_db.name
    resource_group_name = module.cosmos_db.cosmos_db.resource_group_name
    role                = "writer"
    description         = "Allow CDC Backend Function (staging) to read/write CosmosDB via RBAC"
  }]

}

module "support_func_roles" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.0"

  principal_id    = module.support_func.cdc_support_func.principal_id
  subscription_id = data.azurerm_subscription.current.subscription_id

  key_vault = [
    {
      name                = module.key_vaults.key_vault_cdc.name
      resource_group_name = module.key_vaults.key_vault_cdc.resource_group_name
      description         = "Allow Support Function to read secrets from Key Vault"
      roles = {
        secrets = "reader"
      }
    }
  ]

  cosmos = [{
    account_name        = module.cosmos_db.cosmos_db.name
    resource_group_name = module.cosmos_db.cosmos_db.resource_group_name
    role                = "writer"
    description         = "Allow CDC Support Function to read/write CosmosDB via RBAC"
  }]
}

module "support_func_staging_roles" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.0"

  principal_id    = module.support_func.cdc_support_func.staging_principal_id
  subscription_id = data.azurerm_subscription.current.subscription_id

  key_vault = [
    {
      name                = module.key_vaults.key_vault_cdc.name
      resource_group_name = module.key_vaults.key_vault_cdc.resource_group_name
      description         = "Allow Support Function (staging slot) to read secrets from Key Vault"
      roles = {
        secrets = "reader"
      }
    }
  ]

  cosmos = [{
    account_name        = module.cosmos_db.cosmos_db.name
    resource_group_name = module.cosmos_db.cosmos_db.resource_group_name
    role                = "writer"
    description         = "Allow CDC Support Function (staging) to read/write CosmosDB via RBAC"
  }]
}
