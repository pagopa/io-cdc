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

data "azurerm_application_insights" "common" {
  name                = "${local.project_legacy}-ai-common"
  resource_group_name = data.azurerm_resource_group.weu_common.name
}

// SECRETS
data "azurerm_key_vault_secret" "cosmosdb_cdc_database_name" {
  name         = "COSMOSDB-CDC-DATABASE-NAME"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cosmosdb_cdc_key" {
  name         = "COSMOSDB-CDC-KEY"
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

data "azurerm_key_vault_secret" "fims_base_url" {
  name         = "FIMS-BASE-URL"
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

data "azurerm_key_vault_secret" "jwt_public_key" {
  name         = "JWT-PUBLIC-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "jwt_private_key" {
  name         = "JWT-PRIVATE-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cdc_backend_func_key" {
  name         = "CDC-BACKEND-FUNC-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}