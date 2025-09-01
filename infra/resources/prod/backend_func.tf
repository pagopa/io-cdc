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
  ai_sampling_percentage = 100

  subnet_id                            = resource.azurerm_subnet.cdc_subnet_01.id
  private_endpoint_subnet_id           = data.azurerm_subnet.pep.id
  private_dns_zone_resource_group_name = data.azurerm_resource_group.weu_common.name
  virtual_network = {
    resource_group_name = data.azurerm_virtual_network.vnet_common_itn.resource_group_name
    name                = data.azurerm_virtual_network.vnet_common_itn.name
  }

  pagopa_idp_keys_base_url = data.azurerm_key_vault_secret.pagopa_idp_keys_base_url.value

  audit_log_connection_string = data.azurerm_key_vault_secret.audit_log_connection_string.value
  audit_log_container         = data.azurerm_key_vault_secret.audit_log_container.value

  cdc_base_url = data.azurerm_key_vault_secret.cdc_base_url.value

  cdc_api_base_url      = data.azurerm_key_vault_secret.cdc_api_base_url.value
  cdc_api_base_url_test = data.azurerm_key_vault_secret.cdc_api_base_url_test.value

  cosmosdb_cdc_uri           = module.cosmos_db.cosmos_db.endpoint
  cosmosdb_cdc_key           = data.azurerm_key_vault_secret.cosmosdb_cdc_key.value
  cosmosdb_cdc_database_name = data.azurerm_key_vault_secret.cosmosdb_cdc_database_name.value

  storage_account_queue_uri = data.azurerm_key_vault_secret.storage_account_queue_uri.value
  card_request_queue_name   = data.azurerm_key_vault_secret.card_request_queue_name.value

  services_api_url = data.azurerm_key_vault_secret.services_api_url.value
  services_api_key = data.azurerm_key_vault_secret.services_api_key.value

  fims_redirect_url  = data.azurerm_key_vault_secret.fims_redirect_url.value
  fims_client_id     = data.azurerm_key_vault_secret.fims_client_id.value
  fims_client_secret = data.azurerm_key_vault_secret.fims_client_secret.value
  fims_issuer_url    = data.azurerm_key_vault_secret.fims_issuer_url.value
  fims_scope         = data.azurerm_key_vault_secret.fims_scope.value

  jwt_public_key  = data.azurerm_key_vault_secret.jwt_public_key.value
  jwt_private_key = data.azurerm_key_vault_secret.jwt_private_key.value

  encryption_public_key  = data.azurerm_key_vault_secret.encryption_public_key.value
  encryption_private_key = data.azurerm_key_vault_secret.encryption_private_key.value

  jwt_issuer     = data.azurerm_key_vault_secret.jwt_issuer.value
  jwt_audience   = data.azurerm_key_vault_secret.jwt_audience.value
  jwt_expiration = data.azurerm_key_vault_secret.jwt_expiration.value

  algorithm_keys       = data.azurerm_key_vault_secret.algorithm_keys.value
  algorithm_signature  = data.azurerm_key_vault_secret.algorithm_signature.value
  algorithm_encryption = data.azurerm_key_vault_secret.algorithm_encryption.value
  encoding_encryption  = data.azurerm_key_vault_secret.encoding_encryption.value

  nat_gateway_id = data.azurerm_nat_gateway.itn_ng.id

  redis_url      = module.redis_cdc.hostname
  redis_port     = module.redis_cdc.ssl_port
  redis_password = module.redis_cdc.primary_access_key

  cdc_backend_func_url = data.azurerm_key_vault_secret.cdc_backend_func_url.value
  cdc_backend_func_key = data.azurerm_key_vault_secret.cdc_backend_func_key.value

  action_group_id = azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id

  tags = local.tags
}
