output "immutable_cdc_audit_logs_storage_proxy" {
  value = {
    id                  = module.immutable_cdc_audit_logs_proxy_storage.id
    name                = module.immutable_cdc_audit_logs_proxy_storage.name
    resource_group_name = module.immutable_cdc_audit_logs_proxy_storage.resource_group_name
    primary_web_host    = module.immutable_cdc_audit_logs_proxy_storage.primary_web_host
  }
}
