module "cdc_fe_cdn" {
  source  = "pagopa-dx/azure-cdn/azurerm"
  version = "0.0.6"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = var.app_name
    instance_number = var.instance_number
  }

  resource_group_name = var.resource_group_name

  origins = {
    storage = {
      host_name = var.host_name
      priority  = 1
    }
  }

  custom_domains = [{
    host_name = "cdc.io.pagopa.it",
    dns = {
      zone_name                = "io.pagopa.it",
      zone_resource_group_name = "io-p-rg-external"
    }
  }]

  tags = var.tags
}
