output "cosmos_db" {
  value = {
    id = module.cdc_cosmos_account.id
    name = module.cdc_cosmos_account.name
    resource_group_name = module.cdc_cosmos_account.resource_group_name
    endpoint = module.cdc_cosmos_account.endpoint
  }
}
