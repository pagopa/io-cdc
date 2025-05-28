module "apim_platform_cdc_product" {
  source = "git::https://github.com/pagopa/terraform-azurerm-v4//api_management_product?ref=v6.11.0"

  product_id   = "io-cdc-public-api"
  display_name = "IO CDC PUBLIC API"
  description  = "Product for IO CDC"

  api_management_name = data.azurerm_api_management.apim_platform.name
  resource_group_name = data.azurerm_api_management.apim_platform.resource_group_name

  published             = true
  subscription_required = false
  approval_required     = false

  policy_xml = file("${path.module}/api_product/_base_policy.xml")
}

module "apim_platform_cdc_api_v1" {
  source = "git::https://github.com/pagopa/terraform-azurerm-v4//api_management_api?ref=v6.11.0"

  name                  = format("%s-%s-cdc-public-api", var.prefix, var.env_short)
  api_management_name   = data.azurerm_api_management.apim_platform.name
  resource_group_name   = data.azurerm_api_management.apim_platform.resource_group_name
  product_ids           = [module.apim_platform_cdc_product.product_id]
  subscription_required = false
  service_url           = format("https://%s/api/v1", module.cdc_backend_func.function_app.function_app.default_hostname)

  description  = "IO CDC PUBLIC API"
  display_name = "IO CDC PUBLIC API"
  path         = "cdc/api/v1"
  protocols    = ["https"]

  content_format = "openapi"
  content_value  = data.http.cdc_backend_func_openapi.body

  xml_content = file("${path.module}/api/_base_policy.xml")
}