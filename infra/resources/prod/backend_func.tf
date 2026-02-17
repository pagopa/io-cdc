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

  pagopa_idp_keys_base_url = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=PAGOPA-IDP-KEYS-BASE-URL)"

  audit_log_connection_string = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CDC-AUDIT-LOG-CONNECTION-STRING)"
  audit_log_container         = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CDC-AUDIT-LOG-CONTAINER)"

  cdc_base_url = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CDC-BASE-URL)"

  cdc_api_base_url      = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CDC-API-BASE-URL)"
  cdc_api_base_url_test = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CDC-API-BASE-URL-TEST)"

  cosmosdb_cdc_uri           = module.cosmos_db.cosmos_db.endpoint
  cosmosdb_cdc_key           = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=COSMOSDB-CDC-KEY)"
  cosmosdb_cdc_database_name = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=COSMOSDB-CDC-DATABASE-NAME)"

  storage_account_queue_uri = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=STORAGE-ACCOUNT-QUEUE-URI)"
  card_request_queue_name   = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CARD-REQUEST-QUEUE-NAME)"

  services_api_url = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=SERVICES-API-URL)"
  services_api_key = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=SERVICES-API-KEY)"

  fims_redirect_url  = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=FIMS-REDIRECT-URL)"
  fims_client_id     = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=FIMS-CLIENT-ID)"
  fims_client_secret = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=FIMS-CLIENT-SECRET)"
  fims_issuer_url    = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=FIMS-ISSUER-URL)"
  fims_scope         = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=FIMS-SCOPE)"

  jwt_private_key_test = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=JWT-PRIVATE-KEY-TEST)"
  jwt_private_key      = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=JWT-PRIVATE-KEY)"

  encryption_public_key_test = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=ENCRYPTION-PUBLIC-KEY-TEST)"
  encryption_public_key      = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=ENCRYPTION-PUBLIC-KEY)"

  jwt_issuer     = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=JWT-ISSUER)"
  jwt_audience   = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=JWT-AUDIENCE)"
  jwt_expiration = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=JWT-EXPIRATION)"

  algorithm_keys       = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=ALGORITHM-KEYS)"
  algorithm_signature  = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=ALGORITHM-SIGNATURE)"
  algorithm_encryption = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=ALGORITHM-ENCRYPTION)"
  encoding_encryption  = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=ENCODING-ENCRYPTION)"

  nat_gateway_id = data.azurerm_nat_gateway.itn_ng.id

  redis_url      = module.redis_cdc.hostname
  redis_port     = module.redis_cdc.ssl_port
  redis_password = module.redis_cdc.primary_access_key

  cdc_backend_func_url = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CDC-BACKEND-FUNC-URL)"
  cdc_backend_func_key = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=CDC-BACKEND-FUNC-KEY)"

  test_users = "@Microsoft.KeyVault(VaultName=${module.key_vaults.key_vault_cdc.name};SecretName=TEST-USERS)"

  action_group_id = azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id

  tags = local.tags
}
