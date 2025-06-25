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
      description          = "we need to write queue message"
    }
  ]
}