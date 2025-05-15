module "cosmos_db" {
  source = "../_modules/cosmos_db"

  environment = {
    prefix          = local.prefix
    env_short       = local.env_short
    location        = local.location
    app_name        = "cdc"
    instance_number = "01"
  }

  resource_group  = data.azurerm_resource_group.itn_cdc.name
  action_group_id = azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id
  subnet_pep_id   = data.azurerm_subnet.pep.id

  tags = local.tags
}
