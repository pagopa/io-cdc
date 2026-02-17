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

data "azurerm_application_gateway" "io_app_gateway" {
  name                = "io-p-itn-agw-01"
  resource_group_name = "io-p-itn-common-rg-01"
}

// SECRETS
data "azurerm_key_vault_secret" "cdc_backend_func_key" {
  name         = "CDC-BACKEND-FUNC-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "cdc_backend_func_url" {
  name         = "CDC-BACKEND-FUNC-URL"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_key_vault_secret" "app_backend_api_key_secret" {
  name         = "appbackend-APP-BACKEND-PRIMARY-KEY"
  key_vault_id = module.key_vaults.key_vault_cdc.id
}

data "azurerm_storage_account" "storage_cdc_be" {
  name                = "iopitncdcbest01"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
}
