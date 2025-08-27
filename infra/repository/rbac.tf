data "azurerm_storage_account" "storage_be" {
  name                = "iopitncdcbest01"
  resource_group_name = "io-p-itn-cdc-rg-01"
}

module "roles" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.0"

  principal_id    = module.repo.identities.infra.ci.principal_id
  subscription_id = data.azurerm_subscription.current.subscription_id

  storage_queue = [
    {
      storage_account_name = data.azurerm_storage_account.storage_be.name
      resource_group_name  = data.azurerm_storage_account.storage_be.resource_group_name
      role                 = "writer"
      description          = "we need to write queue"
    },
    {
      storage_account_name = data.azurerm_storage_account.storage_be.name
      resource_group_name  = data.azurerm_storage_account.storage_be.resource_group_name
      role                 = "reader"
      description          = "we need to read queue"
    }
  ]

  key_vault = [
    {
      name                = "io-p-itn-cdc-kv-01"
      resource_group_name = "io-p-itn-cdc-rg-01"
      has_rbac_support    = true
      description         = "Allow read access to keys"
      roles = {
        keys = "writer"
      }
    }
  ]
}

module "roles_cd" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.0"

  principal_id    = module.repo.identities.infra.cd.principal_id
  subscription_id = data.azurerm_subscription.current.subscription_id

  storage_queue = [
    {
      storage_account_name = data.azurerm_storage_account.storage_be.name
      resource_group_name  = data.azurerm_storage_account.storage_be.resource_group_name
      role                 = "writer"
      description          = "we need to write queue"
    },
    {
      storage_account_name = data.azurerm_storage_account.storage_be.name
      resource_group_name  = data.azurerm_storage_account.storage_be.resource_group_name
      role                 = "reader"
      description          = "we need to read queue"
    }
  ]

  key_vault = [
    {
      name                = "io-p-itn-cdc-kv-01"
      resource_group_name = "io-p-itn-cdc-rg-01"
      has_rbac_support    = true
      description         = "Allow read access to keys"
      roles = {
        keys = "writer"
      }
    }
  ]
}
