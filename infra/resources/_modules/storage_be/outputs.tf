output "cdc_storage_be" {
  value = {
    id                  = module.cdc_storage_be.id
    name                = module.cdc_storage_be.name
    resource_group_name = module.cdc_storage_be.resource_group_name
    primary_web_host    = module.cdc_storage_be.primary_web_host
  }
}
