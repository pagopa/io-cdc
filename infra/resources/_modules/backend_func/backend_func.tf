module "cdc_backend_func" {
  source  = "pagopa-dx/azure-function-app/azurerm"
  version = "0.2.9"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = "backend"
    instance_number = var.instance_number
  }

  resource_group_name = var.resource_group_name
  health_check_path   = "/api/v1/info"
  node_version        = 20

  subnet_id                            = var.subnet_id
  subnet_pep_id                        = var.private_endpoint_subnet_id
  private_dns_zone_resource_group_name = var.private_dns_zone_resource_group_name

  virtual_network = {
    name                = var.virtual_network.name
    resource_group_name = var.virtual_network.resource_group_name
  }

  application_insights_connection_string   = var.ai_connection_string
  application_insights_sampling_percentage = var.ai_sampling_percentage

  app_settings = local.cdc_backend.app_settings

  slot_app_settings = merge(
    local.cdc_backend.app_settings, {
      // disable queue triggered functions on staging slot
      "AzureWebJobs.ProcessPendingRequest.Disabled" = "1"
  })

  sticky_app_setting_names = [
    "AzureWebJobs.ProcessPendingRequest.Disabled"
  ]

  action_group_id = var.action_group_id

  tags = var.tags
}

resource "azurerm_subnet_nat_gateway_association" "cdc_backend_func_subnet" {
  subnet_id      = module.cdc_backend_func.subnet.id
  nat_gateway_id = var.nat_gateway_id
}
