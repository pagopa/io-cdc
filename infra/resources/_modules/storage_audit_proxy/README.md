# storage_audit_proxy

<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

No providers.

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_immutable_cdc_audit_logs_storage_proxy"></a> [immutable\_cdc\_audit\_logs\_storage\_proxy](#module\_immutable\_cdc\_audit\_logs\_storage\_proxy) | pagopa-dx/azure-storage-account/azurerm | ~> 2.0 |

## Resources

No resources.

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_action_group_id"></a> [action\_group\_id](#input\_action\_group\_id) | The action group id for alerts | `string` | n/a | yes |
| <a name="input_app_name"></a> [app\_name](#input\_app\_name) | App name | `string` | n/a | yes |
| <a name="input_cdc_storage_proxy_immutability_policy_days"></a> [cdc\_storage\_proxy\_immutability\_policy\_days](#input\_cdc\_storage\_proxy\_immutability\_policy\_days) | Number of days for the immutability policy | `number` | `90` | no |
| <a name="input_domain"></a> [domain](#input\_domain) | Domain | `string` | n/a | yes |
| <a name="input_env_short"></a> [env\_short](#input\_env\_short) | Short environment | `string` | n/a | yes |
| <a name="input_instance_number"></a> [instance\_number](#input\_instance\_number) | The istance number to create | `string` | n/a | yes |
| <a name="input_key_vault_id"></a> [key\_vault\_id](#input\_key\_vault\_id) | ID of the Key Vault for storing secrets | `string` | n/a | yes |
| <a name="input_location"></a> [location](#input\_location) | Azure region | `string` | n/a | yes |
| <a name="input_log_analytics_workspace_id"></a> [log\_analytics\_workspace\_id](#input\_log\_analytics\_workspace\_id) | ID of the Log Analytics workspace | `string` | n/a | yes |
| <a name="input_prefix"></a> [prefix](#input\_prefix) | IO Prefix | `string` | n/a | yes |
| <a name="input_privatelink_blob_core_windows_net_id"></a> [privatelink\_blob\_core\_windows\_net\_id](#input\_privatelink\_blob\_core\_windows\_net\_id) | Blob private link | `string` | n/a | yes |
| <a name="input_project"></a> [project](#input\_project) | IO prefix and short environment | `string` | n/a | yes |
| <a name="input_resource_group_name"></a> [resource\_group\_name](#input\_resource\_group\_name) | Name of the resource group where resources will be created | `string` | n/a | yes |
| <a name="input_subnet_pep_id"></a> [subnet\_pep\_id](#input\_subnet\_pep\_id) | ID of the subnet for private endpoints | `string` | n/a | yes |
| <a name="input_tags"></a> [tags](#input\_tags) | Resource tags | `map(any)` | n/a | yes |
| <a name="input_tenant_id"></a> [tenant\_id](#input\_tenant\_id) | Tenant ID for the Azure subscription | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_immutable_cdc_audit_logs_storage_proxy"></a> [immutable\_cdc\_audit\_logs\_storage\_proxy](#output\_immutable\_cdc\_audit\_logs\_storage\_proxy) | n/a |
<!-- END_TF_DOCS -->
