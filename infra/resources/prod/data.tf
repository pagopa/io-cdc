data "azurerm_subscription" "current" {}

data "azurerm_client_config" "current" {}

data "azuread_group" "bonus_admins" {
  display_name = "${local.prefix}-${local.env_short}-adgroup-bonus-admins"
}

data "azurerm_resource_group" "weu_common" {
  name = "${local.project_legacy}-rg-common"
}

data "azurerm_resource_group" "weu_operations" {
  name = "${local.project_legacy}-rg-operations"
}

data "azurerm_resource_group" "weu_sec" {
  name = "${local.project_legacy}-sec-rg"
}

data "azurerm_resource_group" "itn_cdc" {
  name = "${local.project}-${local.domain}-rg-01"
}

data "azurerm_virtual_network" "vnet_common_itn" {
  name                = "${local.project}-common-vnet-01"
  resource_group_name = "${local.project}-common-rg-01"
}

data "azurerm_subnet" "pep" {
  name                 = "${local.project}-pep-snet-01"
  virtual_network_name = data.azurerm_virtual_network.vnet_common_itn.name
  resource_group_name  = data.azurerm_virtual_network.vnet_common_itn.resource_group_name
}

data "azurerm_nat_gateway" "itn_ng" {
  name                = "${local.project}-ng-01"
  resource_group_name = "${local.project}-common-rg-01"
}

data "azurerm_private_dns_zone" "privatelink_redis_cache" {
  name                = "privatelink.redis.cache.windows.net"
  resource_group_name = data.azurerm_resource_group.weu_common.name
}

data "azurerm_private_dns_zone" "privatelink_blob_core_windows_net" {
  name                = "privatelink.blob.core.windows.net"
  resource_group_name = data.azurerm_resource_group.weu_common.name
}

data "azurerm_application_insights" "common" {
  name                = "${local.project_legacy}-ai-common"
  resource_group_name = data.azurerm_resource_group.weu_common.name
}

// SECRETS
data "azurerm_key_vault_secret" "cdc_base_url" {
  name         = "CDC-BASE-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cosmosdb_cdc_database_name" {
  name         = "COSMOSDB-CDC-DATABASE-NAME"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cosmosdb_cdc_key" {
  name         = "COSMOSDB-CDC-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "storage_account_queue_uri" {
  name         = "STORAGE-ACCOUNT-QUEUE-URI"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "card_request_queue_name" {
  name         = "CARD-REQUEST-QUEUE-NAME"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "services_api_url" {
  name         = "SERVICES-API-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "services_api_key" {
  name         = "SERVICES-API-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "fims_redirect_url" {
  name         = "FIMS-REDIRECT-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "fims_client_id" {
  name         = "FIMS-CLIENT-ID"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "fims_client_secret" {
  name         = "FIMS-CLIENT-SECRET"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "fims_issuer_url" {
  name         = "FIMS-ISSUER-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "fims_scope" {
  name         = "FIMS-SCOPE"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "jwt_public_key" {
  name         = "JWT-PUBLIC-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "jwt_private_key" {
  name         = "JWT-PRIVATE-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "encryption_public_key" {
  name         = "ENCRYPTION-PUBLIC-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "encryption_private_key" {
  name         = "ENCRYPTION-PRIVATE-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "jwt_issuer" {
  name         = "JWT-ISSUER"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "jwt_audience" {
  name         = "JWT-AUDIENCE"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "jwt_expiration" {
  name         = "JWT-EXPIRATION"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "algorithm_keys" {
  name         = "ALGORITHM-KEYS"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "algorithm_signature" {
  name         = "ALGORITHM-SIGNATURE"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "algorithm_encryption" {
  name         = "ALGORITHM-ENCRYPTION"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "encoding_encryption" {
  name         = "ENCODING-ENCRYPTION"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cdc_backend_func_url" {
  name         = "CDC-BACKEND-FUNC-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cdc_backend_func_key" {
  name         = "CDC-BACKEND-FUNC-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "pagopa_idp_keys_base_url" {
  name         = "PAGOPA-IDP-KEYS-BASE-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cdc_api_base_url" {
  name         = "CDC-API-BASE-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cdc_api_base_url_test" {
  name         = "CDC-API-BASE-URL-TEST"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}
