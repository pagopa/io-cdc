module "backend_func" {
  source = "../_modules/backend_func"

  prefix          = local.prefix
  env_short       = local.env_short
  location        = local.location
  project         = local.project
  domain          = local.domain
  instance_number = "01"

  resource_group_name = data.azurerm_resource_group.itn_cdc.name

  ai_instrumentation_key = data.azurerm_application_insights.common.instrumentation_key
  ai_connection_string   = data.azurerm_application_insights.common.connection_string
  ai_sampling_percentage = 5

  subnet_id                            = resource.azurerm_subnet.cdc_subnet_01.id
  private_endpoint_subnet_id           = data.azurerm_subnet.pep.id
  private_dns_zone_resource_group_name = data.azurerm_resource_group.weu_common.name
  virtual_network = {
    resource_group_name = data.azurerm_virtual_network.vnet_common_itn.resource_group_name
    name                = data.azurerm_virtual_network.vnet_common_itn.name
  }

  cosmosdb_cdc_uri = module.cosmos_db.cosmos_db.endpoint
  cosmosdb_cdc_key = ""
  cosmosdb_cdc_database_name = ""

  services_api_url = ""
  services_api_key = ""

  nat_gateway_id = data.azurerm_nat_gateway.itn_ng.id
  
  redis_url      = module.redis_cdc.hostname
  redis_port     = module.redis_cdc.ssl_port
  redis_password = module.redis_cdc.primary_access_key

  tags = local.tags
}
