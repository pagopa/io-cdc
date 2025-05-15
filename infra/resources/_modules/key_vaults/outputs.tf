output "key_vault_cdc" {
  value = {
    id                  = azurerm_key_vault.cdc.id
    name                = azurerm_key_vault.cdc.name
    resource_group_name = azurerm_key_vault.cdc.resource_group_name
  }
}