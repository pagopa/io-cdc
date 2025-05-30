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
  sensitive   = true
}

variable "cosmosdb_cdc_key" {
  type        = string
  description = "Connection key for CdC cosmosdb"
  sensitive   = true
}

variable "cosmosdb_cdc_database_name" {
  type        = string
  description = "Database name for CdC cosmosdb"
  sensitive   = true
}

variable "services_api_url" {
  type        = string
  description = "Services API url"
  sensitive   = true
}

variable "services_api_key" {
  type        = string
  description = "Services API key"
  sensitive   = true
}

variable "redis_url" {
  type        = string
  description = "Redis url"
  sensitive   = true
}

variable "redis_port" {
  type        = string
  description = "Redis port"
  sensitive   = true
}

variable "redis_password" {
  type        = string
  description = "Redis password"
  sensitive   = true
}

variable "fims_base_url" {
  type        = string
  description = "FIMS base url"
  sensitive   = true
}

variable "fims_client_id" {
  type        = string
  description = "FIMS client id"
  sensitive   = true
}

variable "fims_client_secret" {
  type        = string
  description = "FIMS client secret"
  sensitive   = true
}

variable "fims_issuer_url" {
  type        = string
  description = "FIMS issuer url"
  sensitive   = true
}

variable "fims_scope" {
  type        = string
  description = "FIMS scope"
  sensitive   = true
}

variable "jwt_public_key" {
  type        = string
  description = "JWT public key"
  sensitive   = true
}

variable "jwt_private_key" {
  type        = string
  description = "JWT private key"
  sensitive   = true
}

variable "jwt_issuer" {
  type        = string
  description = "JWT issuer"
  sensitive   = true
}

variable "jwt_audience" {
  type        = string
  description = "JWT audience"
  sensitive   = true
}

variable "jwt_expiration" {
  type        = string
  description = "JWT expiration"
  sensitive   = true
}

variable "encryption_public_key" {
  type        = string
  description = "Encryption public key"
  sensitive   = true
}

variable "encryption_private_key" {
  type        = string
  description = "Encryption private key"
  sensitive   = true
}

variable "algorithm_keys" {
  type        = string
  description = "Keys' algorithm"
  sensitive   = true
}

variable "algorithm_signature" {
  type        = string
  description = "Signature's algorithm"
  sensitive   = true
}

variable "algorithm_encryption" {
  type        = string
  description = "Encryption's algorithm"
  sensitive   = true
}

variable "encoding_encryption" {
  type        = string
  description = "Encryption's encoding"
  sensitive   = true
}

variable "cdc_backend_func_url" {
  type        = string
  description = "The url for apim to call functions APIs"
  sensitive   = true
}

variable "cdc_backend_func_key" {
  type        = string
  description = "The key for apim to call functions APIs"
  sensitive   = true
}