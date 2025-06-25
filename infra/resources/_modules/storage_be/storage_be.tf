module "cdc_storage_be" {
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

  resource_group_name = var.resource_group_name
  subnet_pep_id       = var.subnet_pep_id

  subservices_enabled = {
    blob  = false
    queue = true
  }

  tier = "l"

  tags = var.tags
}
