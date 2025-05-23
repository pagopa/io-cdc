variable "prefix" {
  type        = string
  description = "IO Prefix"
}

variable "env_short" {
  type        = string
  description = "Short environment"
}

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

variable "instance_number" {
  type        = string
  description = "The istance number to create"
}

variable "tags" {
  type        = map(any)
  description = "Resource tags"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group where resources will be created"
}

variable "subnet_id" {
  type        = string
  description = "A predefined subnet id"
  default     = null
}

variable "private_endpoint_subnet_id" {
  type        = string
  description = "Private Endpoints subnet Id"
}

variable "virtual_network" {
  type = object({
    name                = string
    resource_group_name = string
  })
  description = "Virtual network to create subnet in"
}

variable "private_dns_zone_resource_group_name" {
  type        = string
  description = "Resource group name of the private DNS zone to use for private endpoints"
}

variable "ai_instrumentation_key" {
  type        = string
  description = "The key to connect to application insights"
}

variable "ai_connection_string" {
  sensitive   = true
  type        = string
  description = "The connection string to connect to application insights"
}

variable "ai_sampling_percentage" {
  type        = string
  description = "The sampling percentage for application insights"
}

# REPO DEFINED VARIABLES
variable "nat_gateway_id" {
  type        = string
  description = "The ID of the NAT Gateway"
}

variable "cosmosdb_cdc_uri" {
  type        = string
  description = "Connection uri for CdC cosmosdb"
}

variable "cosmosdb_cdc_key" {
  type        = string
  description = "Connection key for CdC cosmosdb"
}

variable "cosmosdb_cdc_database_name" {
  type        = string
  description = "Database name for CdC cosmosdb"
}

variable "services_api_url" {
  type        = string
  description = "Services API url"
}

variable "services_api_key" {
  type        = string
  description = "Services API key"
}

variable "redis_url" {
  type        = string
  description = "Redis url"
}

variable "redis_port" {
  type        = string
  description = "Redis port"
}

variable "redis_password" {
  type        = string
  description = "Redis password"
}

variable "fims_base_url" {
  type        = string
  description = "FIMS base url"
}

variable "fims_client_id" {
  type        = string
  description = "FIMS client id"
}

variable "fims_client_secret" {
  type        = string
  description = "FIMS client secret"
}

variable "jwt_public_key" {
  type        = string
  description = "JWT public key"
}

variable "jwt_private_key" {
  type        = string
  description = "JWT private key"
}
