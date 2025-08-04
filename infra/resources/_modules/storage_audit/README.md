# storage_audit

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
| <a name="module_immutable_cdc_audit_logs_storage"></a> [immutable\_cdc\_audit\_logs\_storage](#module\_immutable\_cdc\_audit\_logs\_storage) | pagopa-dx/azure-storage-account/azurerm | 0.1.0 |
| <a name="module_immutable_cdc_audit_logs_storage_customer_managed_key"></a> [immutable\_cdc\_audit\_logs\_storage\_customer\_managed\_key](#module\_immutable\_cdc\_audit\_logs\_storage\_customer\_managed\_key) | git::https://github.com/pagopa/terraform-azurerm-v4//storage_account_customer_managed_key | v7.26.3 |

## Resources

| Name | Type |
|------|------|
| [azurerm_private_endpoint.immutable_cdc_audit_logs_storage_blob](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/private_endpoint) | resource |
| [azurerm_storage_container.immutable_cdc_audit_logs_storage_logs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container) | resource |
| [azurerm_storage_management_policy.immutable_cdc_audit_logs_storage_management_policy](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_management_policy) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_action_group_id"></a> [action\_group\_id](#input\_action\_group\_id) | The action group id for alerts | `string` | n/a | yes |
| <a name="input_app_name"></a> [app\_name](#input\_app\_name) | App name | `string` | n/a | yes |
| <a name="input_cdc_storage_immutability_policy_days"></a> [cdc\_storage\_immutability\_policy\_days](#input\_cdc\_storage\_immutability\_policy\_days) | Number of days for the immutability policy | `number` | `730` | no |
| <a name="input_domain"></a> [domain](#input\_domain) | Domain | `string` | n/a | yes |
| <a name="input_env_short"></a> [env\_short](#input\_env\_short) | Short environment | `string` | n/a | yes |
| <a name="input_instance_number"></a> [instance\_number](#input\_instance\_number) | The istance number to create | `string` | n/a | yes |
| <a name="input_key_vault_id"></a> [key\_vault\_id](#input\_key\_vault\_id) | ID of the Key Vault for storing secrets | `string` | n/a | yes |
| <a name="input_location"></a> [location](#input\_location) | Azure region | `string` | n/a | yes |
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
| <a name="output_immutable_cdc_audit_logs_storage"></a> [immutable\_cdc\_audit\_logs\_storage](#output\_immutable\_cdc\_audit\_logs\_storage) | n/a |
<!-- END_TF_DOCS -->
