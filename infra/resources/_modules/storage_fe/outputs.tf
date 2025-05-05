output "cdc_storage_fe" {
  value = {
    id = module.cdc_storage_fe.id
    name = module.cdc_storage_fe.name
    resource_group_name = module.cdc_storage_fe.resource_group_name
    primary_web_host = module.cdc_storage_fe.primary_web_host
  }
}
