data "azurerm_api_management" "apim_platform" {
  name                = "io-p-itn-platform-api-gateway-apim-01"
  resource_group_name = "io-p-itn-common-rg-01"
}

data "azurerm_key_vault" "key_vault_common" {
  name                = "io-p-kv-common"
  resource_group_name = "io-p-rg-common"
}

data "azurerm_key_vault_secret" "app_backend_api_key_secret" {
  name         = "appbackend-APP-BACKEND-PRIMARY-KEY"
  key_vault_id = data.azurerm_key_vault.key_vault_common.id
}