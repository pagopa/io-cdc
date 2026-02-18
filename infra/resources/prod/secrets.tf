resource "azurerm_key_vault_secret" "redis_primary_access_key" {
  key_vault_id     = module.key_vaults.key_vault_cdc.id
  name             = "REDIS-PRIMARY-ACCESS-KEY"
  value_wo         = ""
  value_wo_version = 1
}

resource "azurerm_key_vault_secret" "app_backend_primary_key" {
  key_vault_id     = module.key_vaults.key_vault_cdc.id
  name             = "APP-BACKEND-PRIMARY-KEY"
  value_wo         = ""
  value_wo_version = 1
}

resource "azurerm_key_vault_secret" "cdc_backend_function_key" {
  key_vault_id     = module.key_vaults.key_vault_cdc.id
  name             = "CDC-BACKEND-FUNCTION-KEY"
  value_wo         = ""
  value_wo_version = 1
}
