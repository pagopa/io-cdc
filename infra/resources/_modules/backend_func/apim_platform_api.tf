resource "azurerm_api_management_product" "apim_platform_cdc_product" {
  product_id   = "io-cdc-public-api"
  display_name = "IO CDC PUBLIC API"
  description  = "Product for IO CDC"

  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name

  published             = true
  subscription_required = false
  approval_required     = false
}

resource "azurerm_api_management_product_policy" "apim_platform_cdc_product_policy" {
  product_id          = azurerm_api_management_product.apim_platform_cdc_product.product_id
  api_management_name = azurerm_api_management_product.apim_platform_cdc_product.api_management_name
  resource_group_name = azurerm_api_management_product.apim_platform_cdc_product.resource_group_name

  xml_content = file("${path.module}/api_product/_base_policy.xml")
}

resource "azurerm_api_management_api" "apim_platform_cdc_api_v1" {
  name = format("%s-%s-cdc-public-api", var.prefix, var.env_short)

  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name

  subscription_required = false
  service_url           = format("https://%s/api/v1", module.cdc_backend_func.function_app.function_app.default_hostname)

  revision = "1"

  description  = "IO CDC PUBLIC API"
  display_name = "IO CDC PUBLIC API"
  path         = "api/cdc"
  protocols    = ["https"]

  import {
    content_format = "openapi"
    content_value  = "https://raw.githubusercontent.com/pagopa/io-cdc/refs/heads/main/apps/backend-func/api/internal.yaml"
  }
}

resource "azurerm_api_management_api_policy" "apim_platform_cdc_api_v1_policy" {
  api_name            = azurerm_api_management_api.apim_platform_cdc_api_v1.name
  api_management_name = azurerm_api_management_api.apim_platform_cdc_api_v.api_management_name
  resource_group_name = azurerm_api_management_api.apim_platform_cdc_api_v.resource_group_name

  xml_content = file("${path.module}/api/_base_policy.xml")
}

resource "azurerm_api_management_product_api" "apim_platform_cdc_api_v1_product" {
  api_name            = azurerm_api_management_api.apim_platform_cdc_api_v1.name
  api_management_name = azurerm_api_management_api.apim_platform_cdc_api_v.api_management_name
  resource_group_name = azurerm_api_management_api.apim_platform_cdc_api_v.resource_group_name
  product_id          = azurerm_api_management_product.apim_platform_cdc_product.product_id
}