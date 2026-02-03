resource "azurerm_api_management_product" "cdc_support_platform" {
  product_id   = "io-cdc-support-api"
  display_name = "IO CDC SUPPORT API"
  description  = "Product for IO CDC Support Platform APIs"

  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name

  published             = true
  subscription_required = false
  approval_required     = false
}

resource "azurerm_api_management_product_policy" "cdc_support_platform" {
  product_id          = azurerm_api_management_product.cdc_support_platform.product_id
  api_management_name = azurerm_api_management_product.cdc_support_platform.api_management_name
  resource_group_name = azurerm_api_management_product.cdc_support_platform.resource_group_name

  xml_content = file("${path.module}/policies/_base_policy.xml")
}

resource "azurerm_api_management_api_version_set" "cdc_support_platform" {
  name                = "cdc_support_platform_v1"
  api_management_name = azurerm_api_management_product.cdc_support_platform.api_management_name
  resource_group_name = azurerm_api_management_product.cdc_support_platform.resource_group_name
  display_name        = "Carta della Cultura Support Platform APIs"
  versioning_scheme   = "Segment"
}

resource "azurerm_api_management_api" "cdc_support_platform_v1" {
  name = format("%s-%s-cdc-support-api", var.prefix, var.env_short)

  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name

  subscription_required = false

  version_set_id = azurerm_api_management_api_version_set.cdc_support_platform.id
  version        = "v1"
  revision       = "1"

  description  = "These APIs serve App IO related to Carta della Cultura"
  display_name = "CdC App IO Backend API"
  path         = "api/cdc-support"
  protocols    = ["https"]

  import {
    content_format = "openapi-link"
    content_value  = "https://raw.githubusercontent.com/pagopa/io-backend/980c38029102ea3c48a02104e29685082aee8f68/openapi/generated/api_cdc_support_platform.yaml"
  }
}

resource "azurerm_api_management_api_policy" "cdc_support_platform_v1" {
  api_name            = azurerm_api_management_api.cdc_support_platform_v1.name
  api_management_name = azurerm_api_management_api.cdc_support_platform_v1.api_management_name
  resource_group_name = azurerm_api_management_api.cdc_support_platform_v1.resource_group_name

  xml_content = file("${path.module}/policies/v1/_base_policy.xml")
}

resource "azurerm_api_management_product_api" "cdc_support_platform_v1" {
  api_name            = azurerm_api_management_api.cdc_support_platform_v1.name
  api_management_name = azurerm_api_management_api.cdc_support_platform_v1.api_management_name
  resource_group_name = azurerm_api_management_api.cdc_support_platform_v1.resource_group_name
  product_id          = azurerm_api_management_product.cdc_support_platform.product_id
}

resource "azurerm_api_management_named_value" "app_backend_key" {
  name                = "io-app-backend-key"
  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name
  display_name        = "io-app-backend-key"
  value               = var.app_backend_api_key_secret
  secret              = true
}

resource "azurerm_api_management_tag" "io_cdc_tag" {
  api_management_id = data.azurerm_api_management.apim_platform.id
  name              = "IO-CDC"
}

resource "azurerm_api_management_api_tag" "io_cdc_api_tag" {
  api_id = azurerm_api_management_api.cdc_support_platform_v1.id
  name   = azurerm_api_management_tag.io_cdc_tag.name
}