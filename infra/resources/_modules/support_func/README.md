# support_func

<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

No providers.

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_cdc_support_func"></a> [cdc\_support\_func](#module\_cdc\_support\_func) | pagopa-dx/azure-function-app/azurerm | 0.2.9 |
| <a name="module_func_autoscaler"></a> [func\_autoscaler](#module\_func\_autoscaler) | pagopa-dx/azure-app-service-plan-autoscaler/azurerm | 2.0.0 |

## Resources

No resources.

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_action_group_id"></a> [action\_group\_id](#input\_action\_group\_id) | The action group id for alerts | `string` | n/a | yes |
| <a name="input_ai_connection_string"></a> [ai\_connection\_string](#input\_ai\_connection\_string) | The connection string to connect to application insights | `string` | n/a | yes |
| <a name="input_ai_instrumentation_key"></a> [ai\_instrumentation\_key](#input\_ai\_instrumentation\_key) | The key to connect to application insights | `string` | n/a | yes |
| <a name="input_ai_sampling_percentage"></a> [ai\_sampling\_percentage](#input\_ai\_sampling\_percentage) | The sampling percentage for application insights | `string` | n/a | yes |
| <a name="input_algorithm_encryption"></a> [algorithm\_encryption](#input\_algorithm\_encryption) | Encryption's algorithm | `string` | n/a | yes |
| <a name="input_algorithm_keys"></a> [algorithm\_keys](#input\_algorithm\_keys) | Keys' algorithm | `string` | n/a | yes |
| <a name="input_algorithm_signature"></a> [algorithm\_signature](#input\_algorithm\_signature) | Signature's algorithm | `string` | n/a | yes |
| <a name="input_cdc_api_base_url"></a> [cdc\_api\_base\_url](#input\_cdc\_api\_base\_url) | The base url for cdc api | `string` | n/a | yes |
| <a name="input_cdc_api_base_url_test"></a> [cdc\_api\_base\_url\_test](#input\_cdc\_api\_base\_url\_test) | The test base url for cdc api | `string` | n/a | yes |
| <a name="input_cosmosdb_cdc_database_name"></a> [cosmosdb\_cdc\_database\_name](#input\_cosmosdb\_cdc\_database\_name) | Database name for CdC cosmosdb | `string` | n/a | yes |
| <a name="input_cosmosdb_cdc_key"></a> [cosmosdb\_cdc\_key](#input\_cosmosdb\_cdc\_key) | Connection key for CdC cosmosdb | `string` | n/a | yes |
| <a name="input_cosmosdb_cdc_uri"></a> [cosmosdb\_cdc\_uri](#input\_cosmosdb\_cdc\_uri) | Connection uri for CdC cosmosdb | `string` | n/a | yes |
| <a name="input_domain"></a> [domain](#input\_domain) | Domain | `string` | n/a | yes |
| <a name="input_encoding_encryption"></a> [encoding\_encryption](#input\_encoding\_encryption) | Encryption's encoding | `string` | n/a | yes |
| <a name="input_encryption_public_key"></a> [encryption\_public\_key](#input\_encryption\_public\_key) | Encryption public key | `string` | n/a | yes |
| <a name="input_encryption_public_key_test"></a> [encryption\_public\_key\_test](#input\_encryption\_public\_key\_test) | Encryption public key for test | `string` | n/a | yes |
| <a name="input_env_short"></a> [env\_short](#input\_env\_short) | Short environment | `string` | n/a | yes |
| <a name="input_instance_number"></a> [instance\_number](#input\_instance\_number) | The istance number to create | `string` | n/a | yes |
| <a name="input_jwt_audience"></a> [jwt\_audience](#input\_jwt\_audience) | JWT audience | `string` | n/a | yes |
| <a name="input_jwt_expiration"></a> [jwt\_expiration](#input\_jwt\_expiration) | JWT expiration | `string` | n/a | yes |
| <a name="input_jwt_issuer"></a> [jwt\_issuer](#input\_jwt\_issuer) | JWT issuer | `string` | n/a | yes |
| <a name="input_jwt_private_key"></a> [jwt\_private\_key](#input\_jwt\_private\_key) | JWT private key | `string` | n/a | yes |
| <a name="input_jwt_private_key_test"></a> [jwt\_private\_key\_test](#input\_jwt\_private\_key\_test) | JWT private key for test | `string` | n/a | yes |
| <a name="input_location"></a> [location](#input\_location) | Azure region | `string` | n/a | yes |
| <a name="input_nat_gateway_id"></a> [nat\_gateway\_id](#input\_nat\_gateway\_id) | The ID of the NAT Gateway | `string` | n/a | yes |
| <a name="input_prefix"></a> [prefix](#input\_prefix) | IO Prefix | `string` | n/a | yes |
| <a name="input_private_dns_zone_resource_group_name"></a> [private\_dns\_zone\_resource\_group\_name](#input\_private\_dns\_zone\_resource\_group\_name) | Resource group name of the private DNS zone to use for private endpoints | `string` | n/a | yes |
| <a name="input_private_endpoint_subnet_id"></a> [private\_endpoint\_subnet\_id](#input\_private\_endpoint\_subnet\_id) | Private Endpoints subnet Id | `string` | n/a | yes |
| <a name="input_project"></a> [project](#input\_project) | IO prefix and short environment | `string` | n/a | yes |
| <a name="input_resource_group_name"></a> [resource\_group\_name](#input\_resource\_group\_name) | Name of the resource group where resources will be created | `string` | n/a | yes |
| <a name="input_subnet_id"></a> [subnet\_id](#input\_subnet\_id) | A predefined subnet id | `string` | `null` | no |
| <a name="input_tags"></a> [tags](#input\_tags) | Resource tags | `map(any)` | n/a | yes |
| <a name="input_test_users"></a> [test\_users](#input\_test\_users) | List of test users | `string` | n/a | yes |
| <a name="input_virtual_network"></a> [virtual\_network](#input\_virtual\_network) | Virtual network to create subnet in | <pre>object({<br/>    name                = string<br/>    resource_group_name = string<br/>  })</pre> | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_cdc_support_func"></a> [cdc\_support\_func](#output\_cdc\_support\_func) | n/a |
<!-- END_TF_DOCS -->
