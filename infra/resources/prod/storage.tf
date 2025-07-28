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

  action_group_id = azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id

  tags = local.tags
}

module "storage_be" {
  source = "../_modules/storage_be"

  prefix          = local.prefix
  env_short       = local.env_short
  location        = local.location
  project         = local.project
  domain          = local.domain
  app_name        = "be"
  instance_number = "01"

  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  subnet_pep_id       = data.azurerm_subnet.pep.id

  action_group_id = azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id

  tags = local.tags
}

resource "azurerm_storage_queue" "card_request" {
  name                 = "card-request"
  storage_account_name = module.storage_be.cdc_storage_be.name
}

resource "azurerm_storage_queue" "card_request_poison" {
  name                 = "card-request-poison"
  storage_account_name = module.storage_be.cdc_storage_be.name
}

module "storage_audit" {
  source = "../_modules/storage_audit"

  location = local.location
  project  = local.project
  domain   = local.domain

  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  subnet_pep_id       = data.azurerm_subnet.pep.id
  key_vault_id        = module.key_vaults.key_vault_cdc.id

  tags = local.tags
}
