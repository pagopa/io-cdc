module "roles" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.0"

  principal_id    = module.backend_func.cdc_backend_func.principal_id
  subscription_id = data.azurerm_subscription.current.subscription_id

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
}