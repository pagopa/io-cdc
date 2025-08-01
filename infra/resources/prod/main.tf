terraform {

  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "iopitntfst001"
    container_name       = "terraform-state"
    key                  = "io-cdc.resources.tfstate"
    use_azuread_auth     = true
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "<= 4.32.0"
    }
  }
}

provider "azurerm" {
  features {}
  storage_use_azuread = true
}

# KEY VAULTS
module "key_vaults" {
  source = "../_modules/key_vaults"

  project             = local.project
  location            = local.location
  resource_group_name = data.azurerm_resource_group.itn_cdc.name

  tenant_id = data.azurerm_client_config.current.tenant_id

  tags = local.tags
}

# REDIS
module "redis_cdc" {
  source = "github.com/pagopa/terraform-azurerm-v4//redis_cache?ref=v5.5.0"

  name                = "${local.project}-${local.domain}-redis-01"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = data.azurerm_resource_group.itn_cdc.location

  capacity              = 1
  family                = "P"
  sku_name              = "Premium"
  redis_version         = "6"
  enable_authentication = true
  custom_zones          = [1, 2]

  // when azure can apply patch?
  patch_schedules = [{
    day_of_week    = "Sunday"
    start_hour_utc = 23
    },
    {
      day_of_week    = "Monday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Tuesday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Wednesday"
      start_hour_utc = 23
    },
    {
      day_of_week    = "Thursday"
      start_hour_utc = 23
    },
  ]

  private_endpoint = {
    enabled              = true
    subnet_id            = data.azurerm_subnet.pep.id
    virtual_network_id   = data.azurerm_virtual_network.vnet_common_itn.id
    private_dns_zone_ids = [data.azurerm_private_dns_zone.privatelink_redis_cache.id]
  }

  tags = local.tags
}


