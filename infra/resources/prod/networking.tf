resource "azurerm_subnet" "cdc_subnet_01" {
  name                 = "${local.prefix}-${local.env_short}-${local.location_short}-${local.domain}-snet-01"
  virtual_network_name = data.azurerm_virtual_network.vnet_common_itn.name
  resource_group_name  = data.azurerm_virtual_network.vnet_common_itn.resource_group_name
  address_prefixes     = ["10.20.30.0/26"]

  delegation {
    name = "default"
    service_delegation {
      name    = "Microsoft.Web/serverFarms"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }
}