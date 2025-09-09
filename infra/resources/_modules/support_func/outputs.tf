output "cdc_support_func" {
  value = {
    id                   = module.cdc_support_func.function_app.function_app.id
    name                 = module.cdc_support_func.function_app.function_app.name
    resource_group_name  = module.cdc_support_func.function_app.resource_group_name
    principal_id         = module.cdc_support_func.function_app.function_app.principal_id
    staging_principal_id = module.cdc_support_func.function_app.function_app.slot.principal_id
  }
}
