module "cdn_fe" {
  source = "../_modules/cdn"

  prefix          = local.prefix
  env_short       = local.env_short
  location        = local.location
  project         = local.project
  domain          = local.domain
  app_name        = "fe"
  instance_number = "01"

  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  host_name           = module.storage_fe.cdc_storage_fe.primary_web_host

  tags = local.tags
}
