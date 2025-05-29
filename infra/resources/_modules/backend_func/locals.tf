locals {
  cdc_backend = {
    app_settings = {
      FUNCTIONS_WORKER_PROCESS_COUNT = 4
      NODE_ENV                       = "production"

      // COSMOS
      COSMOSDB_CDC_URI           = var.cosmosdb_cdc_uri
      COSMOSDB_CDC_KEY           = var.cosmosdb_cdc_key
      COSMOSDB_CDC_DATABASE_NAME = var.cosmosdb_cdc_database_name

      // SERVICES API
      SERVICES_API_URL = var.services_api_url
      SERVICES_API_KEY = var.services_api_key

      // FIMS
      FIMS_BASE_URL      = var.fims_base_url
      FIMS_CLIENT_ID     = var.fims_client_id
      FIMS_CLIENT_SECRET = var.fims_client_secret

      // JWT
      JWT_PUBLIC_KEY  = var.jwt_public_key
      JWT_PRIVATE_KEY = var.jwt_private_key

      // REDIS
      REDIS_URL             = var.redis_url
      REDIS_PORT            = var.redis_port
      REDIS_PASSWORD        = var.redis_password
      REDIS_CLUSTER_ENABLED = "false"
      REDIS_TLS_ENABLED     = "true"

      // Keepalive fields are all optionals
      FETCH_KEEPALIVE_ENABLED             = "true"
      FETCH_KEEPALIVE_SOCKET_ACTIVE_TTL   = "110000"
      FETCH_KEEPALIVE_MAX_SOCKETS         = "40"
      FETCH_KEEPALIVE_MAX_FREE_SOCKETS    = "10"
      FETCH_KEEPALIVE_FREE_SOCKET_TIMEOUT = "30000"
      FETCH_KEEPALIVE_TIMEOUT             = "60000"
    }
  }
}
