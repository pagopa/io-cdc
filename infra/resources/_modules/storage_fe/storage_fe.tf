module "cdc_storage_fe" {
  source  = "pagopa-dx/azure-storage-account/azurerm"
  version = "0.1.0"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = var.app_name
    instance_number = var.instance_number
  }

  resource_group_name                 = var.resource_group_name
  subnet_pep_id                       = var.subnet_pep_id
  force_public_network_access_enabled = true

  static_website = {
    enabled = true
  }

  tier = "l"

  tags = var.tags
}
