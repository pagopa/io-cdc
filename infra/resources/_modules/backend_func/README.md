# backend_func

<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_azurerm"></a> [azurerm](#provider\_azurerm) | n/a |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_cdc_backend_func"></a> [cdc\_backend\_func](#module\_cdc\_backend\_func) | pagopa-dx/azure-function-app/azurerm | 0.2.9 |

## Resources

| Name | Type |
|------|------|
| [azurerm_api_management_api.cdc_v1](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_api) | resource |
| [azurerm_api_management_api_policy.cdc_v1](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_api_policy) | resource |
| [azurerm_api_management_api_version_set.cdc](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_api_version_set) | resource |
| [azurerm_api_management_named_value.cdc_backend_func_key](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_named_value) | resource |
| [azurerm_api_management_named_value.cdc_backend_func_url](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_named_value) | resource |
| [azurerm_api_management_product.cdc](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_product) | resource |
| [azurerm_api_management_product_api.cdc_v1](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_product_api) | resource |
| [azurerm_api_management_product_policy.cdc](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_product_policy) | resource |
| [azurerm_subnet_nat_gateway_association.cdc_backend_func_subnet](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet_nat_gateway_association) | resource |
| [azurerm_api_management.apim_platform](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/data-sources/api_management) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_ai_connection_string"></a> [ai\_connection\_string](#input\_ai\_connection\_string) | The connection string to connect to application insights | `string` | n/a | yes |
| <a name="input_ai_instrumentation_key"></a> [ai\_instrumentation\_key](#input\_ai\_instrumentation\_key) | The key to connect to application insights | `string` | n/a | yes |
| <a name="input_ai_sampling_percentage"></a> [ai\_sampling\_percentage](#input\_ai\_sampling\_percentage) | The sampling percentage for application insights | `string` | n/a | yes |
| <a name="input_algorithm_encryption"></a> [algorithm\_encryption](#input\_algorithm\_encryption) | Encryption's algorithm | `string` | n/a | yes |
| <a name="input_algorithm_keys"></a> [algorithm\_keys](#input\_algorithm\_keys) | Keys' algorithm | `string` | n/a | yes |
| <a name="input_algorithm_signature"></a> [algorithm\_signature](#input\_algorithm\_signature) | Signature's algorithm | `string` | n/a | yes |
| <a name="input_card_request_queue_name"></a> [card\_request\_queue\_name](#input\_card\_request\_queue\_name) | Card request queue name | `string` | n/a | yes |
| <a name="input_cdc_backend_func_key"></a> [cdc\_backend\_func\_key](#input\_cdc\_backend\_func\_key) | The key for apim to call functions APIs | `string` | n/a | yes |
| <a name="input_cdc_backend_func_url"></a> [cdc\_backend\_func\_url](#input\_cdc\_backend\_func\_url) | The url for apim to call functions APIs | `string` | n/a | yes |
| <a name="input_cdc_base_url"></a> [cdc\_base\_url](#input\_cdc\_base\_url) | The base url for CDC redirects | `string` | n/a | yes |
| <a name="input_cosmosdb_cdc_database_name"></a> [cosmosdb\_cdc\_database\_name](#input\_cosmosdb\_cdc\_database\_name) | Database name for CdC cosmosdb | `string` | n/a | yes |
| <a name="input_cosmosdb_cdc_key"></a> [cosmosdb\_cdc\_key](#input\_cosmosdb\_cdc\_key) | Connection key for CdC cosmosdb | `string` | n/a | yes |
| <a name="input_cosmosdb_cdc_uri"></a> [cosmosdb\_cdc\_uri](#input\_cosmosdb\_cdc\_uri) | Connection uri for CdC cosmosdb | `string` | n/a | yes |
| <a name="input_domain"></a> [domain](#input\_domain) | Domain | `string` | n/a | yes |
| <a name="input_encoding_encryption"></a> [encoding\_encryption](#input\_encoding\_encryption) | Encryption's encoding | `string` | n/a | yes |
| <a name="input_encryption_private_key"></a> [encryption\_private\_key](#input\_encryption\_private\_key) | Encryption private key | `string` | n/a | yes |
| <a name="input_encryption_public_key"></a> [encryption\_public\_key](#input\_encryption\_public\_key) | Encryption public key | `string` | n/a | yes |
| <a name="input_env_short"></a> [env\_short](#input\_env\_short) | Short environment | `string` | n/a | yes |
| <a name="input_fims_client_id"></a> [fims\_client\_id](#input\_fims\_client\_id) | FIMS client id | `string` | n/a | yes |
| <a name="input_fims_client_secret"></a> [fims\_client\_secret](#input\_fims\_client\_secret) | FIMS client secret | `string` | n/a | yes |
| <a name="input_fims_issuer_url"></a> [fims\_issuer\_url](#input\_fims\_issuer\_url) | FIMS issuer url | `string` | n/a | yes |
| <a name="input_fims_redirect_url"></a> [fims\_redirect\_url](#input\_fims\_redirect\_url) | FIMS redirect url | `string` | n/a | yes |
| <a name="input_fims_scope"></a> [fims\_scope](#input\_fims\_scope) | FIMS scope | `string` | n/a | yes |
| <a name="input_instance_number"></a> [instance\_number](#input\_instance\_number) | The istance number to create | `string` | n/a | yes |
| <a name="input_jwt_audience"></a> [jwt\_audience](#input\_jwt\_audience) | JWT audience | `string` | n/a | yes |
| <a name="input_jwt_expiration"></a> [jwt\_expiration](#input\_jwt\_expiration) | JWT expiration | `string` | n/a | yes |
| <a name="input_jwt_issuer"></a> [jwt\_issuer](#input\_jwt\_issuer) | JWT issuer | `string` | n/a | yes |
| <a name="input_jwt_private_key"></a> [jwt\_private\_key](#input\_jwt\_private\_key) | JWT private key | `string` | n/a | yes |
| <a name="input_jwt_public_key"></a> [jwt\_public\_key](#input\_jwt\_public\_key) | JWT public key | `string` | n/a | yes |
| <a name="input_location"></a> [location](#input\_location) | Azure region | `string` | n/a | yes |
| <a name="input_nat_gateway_id"></a> [nat\_gateway\_id](#input\_nat\_gateway\_id) | The ID of the NAT Gateway | `string` | n/a | yes |
| <a name="input_pagopa_idp_keys_base_url"></a> [pagopa\_idp\_keys\_base\_url](#input\_pagopa\_idp\_keys\_base\_url) | The base url to get idp keys | `string` | n/a | yes |
| <a name="input_prefix"></a> [prefix](#input\_prefix) | IO Prefix | `string` | n/a | yes |
| <a name="input_private_dns_zone_resource_group_name"></a> [private\_dns\_zone\_resource\_group\_name](#input\_private\_dns\_zone\_resource\_group\_name) | Resource group name of the private DNS zone to use for private endpoints | `string` | n/a | yes |
| <a name="input_private_endpoint_subnet_id"></a> [private\_endpoint\_subnet\_id](#input\_private\_endpoint\_subnet\_id) | Private Endpoints subnet Id | `string` | n/a | yes |
| <a name="input_project"></a> [project](#input\_project) | IO prefix and short environment | `string` | n/a | yes |
| <a name="input_redis_password"></a> [redis\_password](#input\_redis\_password) | Redis password | `string` | n/a | yes |
| <a name="input_redis_port"></a> [redis\_port](#input\_redis\_port) | Redis port | `string` | n/a | yes |
| <a name="input_redis_url"></a> [redis\_url](#input\_redis\_url) | Redis url | `string` | n/a | yes |
| <a name="input_resource_group_name"></a> [resource\_group\_name](#input\_resource\_group\_name) | Name of the resource group where resources will be created | `string` | n/a | yes |
| <a name="input_services_api_key"></a> [services\_api\_key](#input\_services\_api\_key) | Services API key | `string` | n/a | yes |
| <a name="input_services_api_url"></a> [services\_api\_url](#input\_services\_api\_url) | Services API url | `string` | n/a | yes |
| <a name="input_storage_account_queue_uri"></a> [storage\_account\_queue\_uri](#input\_storage\_account\_queue\_uri) | Storage account queue host | `string` | n/a | yes |
| <a name="input_subnet_id"></a> [subnet\_id](#input\_subnet\_id) | A predefined subnet id | `string` | `null` | no |
| <a name="input_tags"></a> [tags](#input\_tags) | Resource tags | `map(any)` | n/a | yes |
| <a name="input_virtual_network"></a> [virtual\_network](#input\_virtual\_network) | Virtual network to create subnet in | <pre>object({<br/>    name                = string<br/>    resource_group_name = string<br/>  })</pre> | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_cdc_backend_func"></a> [cdc\_backend\_func](#output\_cdc\_backend\_func) | n/a |
<!-- END_TF_DOCS -->
