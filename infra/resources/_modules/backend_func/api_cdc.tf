resource "azurerm_api_management_product" "cdc" {
  product_id   = "io-cdc-public-api"
  display_name = "IO CDC PUBLIC API"
  description  = "Product for IO CDC"

  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name

  published             = true
  subscription_required = false
  approval_required     = false
}

resource "azurerm_api_management_product_policy" "cdc" {
  product_id          = azurerm_api_management_product.cdc.product_id
  api_management_name = azurerm_api_management_product.cdc.api_management_name
  resource_group_name = azurerm_api_management_product.cdc.resource_group_name

  xml_content = file("${path.module}/policies/_base_policy.xml")
}

resource "azurerm_api_management_api_version_set" "cdc" {
  name                = "cdc_v1"
  api_management_name = azurerm_api_management_product.cdc.api_management_name
  resource_group_name = azurerm_api_management_product.cdc.resource_group_name
  display_name        = "Carta della Cultura APIs"
  versioning_scheme   = "Segment"
}

resource "azurerm_api_management_api" "cdc_v1" {
  name = format("%s-%s-cdc-public-api", var.prefix, var.env_short)

  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name

  subscription_required = false

  version_set_id = azurerm_api_management_api_version_set.cdc.id
  version        = "v1"
  revision       = "1"

  description  = "IO CDC PUBLIC API"
  display_name = "IO CDC PUBLIC API"
  path         = "api/cdc"
  protocols    = ["https"]

  import {
    content_format = "openapi-link"
    content_value  = "https://raw.githubusercontent.com/pagopa/io-cdc/refs/heads/boilerplate-1/apps/backend-func/api/internal.yaml"
  }
}

resource "azurerm_api_management_api_policy" "cdc_v1" {
  api_name            = azurerm_api_management_api.cdc_v1.name
  api_management_name = azurerm_api_management_api.cdc_v1.api_management_name
  resource_group_name = azurerm_api_management_api.cdc_v1.resource_group_name

  xml_content = file("${path.module}/policies/v1/_base_policy.xml")
}

resource "azurerm_api_management_product_api" "cdc_v1" {
  api_name            = azurerm_api_management_api.cdc_v1.name
  api_management_name = azurerm_api_management_api.cdc_v1.api_management_name
  resource_group_name = azurerm_api_management_api.cdc_v1.resource_group_name
  product_id          = azurerm_api_management_product.cdc.product_id
}

resource "azurerm_api_management_named_value" "cdc_backend_func_url" {
  name                = "io-cdc-backend-func-url"
  api_management_name = azurerm_api_management_api.cdc_v1.api_management_name
  resource_group_name = azurerm_api_management_api.cdc_v1.resource_group_name
  display_name        = "io-cdc-backend-func-url"
  value               = var.cdc_backend_func_url
  secret              = "true"
}

resource "azurerm_api_management_named_value" "cdc_backend_func_key" {
  name                = "io-cdc-backend-func-key"
  api_management_name = azurerm_api_management_api.cdc_v1.api_management_name
  resource_group_name = azurerm_api_management_api.cdc_v1.resource_group_name
  display_name        = "io-cdc-backend-func-key"
  value               = var.cdc_backend_func_key
  secret              = "true"
}