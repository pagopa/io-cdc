# storage_be

<!-- BEGIN_TF_DOCS -->

## Requirements

No requirements.

## Providers

No providers.

## Modules

| Name                                                                          | Source                                  | Version |
| ----------------------------------------------------------------------------- | --------------------------------------- | ------- |
| <a name="module_cdc_storage_be"></a> [cdc_storage_be](#module_cdc_storage_be) | pagopa-dx/azure-storage-account/azurerm | 0.1.0   |

## Resources

No resources.

## Inputs

| Name                                                                                       | Description                                                | Type       | Default | Required |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ---------- | ------- | :------: |
| <a name="input_app_name"></a> [app_name](#input_app_name)                                  | App name                                                   | `string`   | n/a     |   yes    |
| <a name="input_domain"></a> [domain](#input_domain)                                        | Domain                                                     | `string`   | n/a     |   yes    |
| <a name="input_env_short"></a> [env_short](#input_env_short)                               | Short environment                                          | `string`   | n/a     |   yes    |
| <a name="input_instance_number"></a> [instance_number](#input_instance_number)             | The istance number to create                               | `string`   | n/a     |   yes    |
| <a name="input_location"></a> [location](#input_location)                                  | Azure region                                               | `string`   | n/a     |   yes    |
| <a name="input_prefix"></a> [prefix](#input_prefix)                                        | IO Prefix                                                  | `string`   | n/a     |   yes    |
| <a name="input_project"></a> [project](#input_project)                                     | IO prefix and short environment                            | `string`   | n/a     |   yes    |
| <a name="input_resource_group_name"></a> [resource_group_name](#input_resource_group_name) | Name of the resource group where resources will be created | `string`   | n/a     |   yes    |
| <a name="input_subnet_pep_id"></a> [subnet_pep_id](#input_subnet_pep_id)                   | n/a                                                        | `string`   | n/a     |   yes    |
| <a name="input_tags"></a> [tags](#input_tags)                                              | Resource tags                                              | `map(any)` | n/a     |   yes    |

## Outputs

| Name                                                                          | Description |
| ----------------------------------------------------------------------------- | ----------- |
| <a name="output_cdc_storage_be"></a> [cdc_storage_be](#output_cdc_storage_be) | n/a         |

<!-- END_TF_DOCS -->
