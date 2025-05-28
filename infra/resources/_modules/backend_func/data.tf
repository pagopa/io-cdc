data "azurerm_api_management" "apim_platform" {
  name                = "io-p-itn-platform-api-gateway-apim-01"
  resource_group_name = "io-p-itn-common-rg-01"
}

data "http" "cdc_backend_func_openapi" {
  url = "https://raw.githubusercontent.com/pagopa/io-cdc/refs/heads/main/apps/backend-func/api/internal.yaml"
}