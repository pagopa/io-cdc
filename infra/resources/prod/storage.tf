module "storage_fe" {
  source = "../_modules/storage_fe"

  prefix          = local.prefix
  env_short       = local.env_short
  location        = local.location
  project         = local.project
  domain          = local.domain
  app_name        = "fe"
  instance_number = "01"

  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  subnet_pep_id       = data.azurerm_subnet.pep.id

  tags = local.tags
}
