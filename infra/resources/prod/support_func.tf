module "support_func" {
  source = "../_modules/support_func"

  prefix          = local.prefix
  env_short       = local.env_short
  location        = local.location
  project         = local.project
  domain          = local.domain
  instance_number = "01"

  resource_group_name = data.azurerm_resource_group.itn_cdc.name

  ai_instrumentation_key = data.azurerm_application_insights.common.instrumentation_key
  ai_connection_string   = data.azurerm_application_insights.common.connection_string
  ai_sampling_percentage = 100

  subnet_id                            = resource.azurerm_subnet.cdc_subnet_01.id
  private_endpoint_subnet_id           = data.azurerm_subnet.pep.id
  private_dns_zone_resource_group_name = data.azurerm_resource_group.weu_common.name
  virtual_network = {
    resource_group_name = data.azurerm_virtual_network.vnet_common_itn.resource_group_name
    name                = data.azurerm_virtual_network.vnet_common_itn.name
  }

  cdc_api_base_url      = data.azurerm_key_vault_secret.cdc_api_base_url.value
  cdc_api_base_url_test = data.azurerm_key_vault_secret.cdc_api_base_url_test.value

  cosmosdb_cdc_uri           = module.cosmos_db.cosmos_db.endpoint
  cosmosdb_cdc_key           = data.azurerm_key_vault_secret.cosmosdb_cdc_key.value
  cosmosdb_cdc_database_name = data.azurerm_key_vault_secret.cosmosdb_cdc_database_name.value

  jwt_private_key      = data.azurerm_key_vault_secret.jwt_private_key.value
  jwt_private_key_test = data.azurerm_key_vault_secret.jwt_private_key_test.value

  encryption_public_key      = data.azurerm_key_vault_secret.encryption_public_key.value
  encryption_public_key_test = data.azurerm_key_vault_secret.encryption_public_key_test.value

  jwt_issuer     = data.azurerm_key_vault_secret.jwt_issuer.value
  jwt_audience   = data.azurerm_key_vault_secret.jwt_audience.value
  jwt_expiration = data.azurerm_key_vault_secret.jwt_expiration.value

  algorithm_keys       = data.azurerm_key_vault_secret.algorithm_keys.value
  algorithm_signature  = data.azurerm_key_vault_secret.algorithm_signature.value
  algorithm_encryption = data.azurerm_key_vault_secret.algorithm_encryption.value
  encoding_encryption  = data.azurerm_key_vault_secret.encoding_encryption.value

  test_users = data.azurerm_key_vault_secret.test_users.value

  app_backend_api_key_secret = azurerm_key_vault_secret.app_backend_primary_key.versionless_id

  nat_gateway_id = data.azurerm_nat_gateway.itn_ng.id

  action_group_id = azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id

  tags = local.tags
}
