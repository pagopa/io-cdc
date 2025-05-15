output "cdc_backend_func" {
  value = {
    id                   = module.cdc_backend_func.function_app.function_app.id
    name                 = module.cdc_backend_func.function_app.function_app.name
    resource_group_name  = module.cdc_backend_func.function_app.resource_group_name
    principal_id         = module.cdc_backend_func.function_app.function_app.principal_id
    staging_principal_id = module.cdc_backend_func.function_app.function_app.slot.principal_id
  }
}
