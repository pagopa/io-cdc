output "immutable_cdc_audit_logs_storage_proxy" {
  value = {
    id                  = module.immutable_cdc_audit_logs_storage_proxy.id
    name                = module.immutable_cdc_audit_logs_storage_proxy.name
    resource_group_name = module.immutable_cdc_audit_logs_storage_proxy.resource_group_name
  }
}
