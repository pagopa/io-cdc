data "azurerm_private_dns_zone" "privatelink_blob_core_windows_net" {
  name                = "privatelink.blob.core.windows.net"
  resource_group_name = "io-p-rg-common"
}

data "azurerm_subscription" "current" {}
