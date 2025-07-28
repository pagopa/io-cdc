variable "project" {
  type        = string
  description = "IO prefix and short environment"
}

variable "location" {
  type        = string
  description = "Azure region"
}

variable "domain" {
  type        = string
  description = "Domain"
}

variable "tags" {
  type        = map(any)
  description = "Resource tags"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group where resources will be created"
}

variable "subnet_pep_id" {
  type = string
  description = "ID of the subnet for private endpoints"
}

variable "cdc_storage_immutability_policy_days" {
  type        = number
  description = "Number of days for the immutability policy"
  default     = 730
}

variable "key_vault_id" {
  type        = string
  description = "ID of the Key Vault for storing secrets"
}