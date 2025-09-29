locals {
  cdc_backend = {
    app_settings = {
      FUNCTIONS_WORKER_PROCESS_COUNT = 4
      NODE_ENV                       = "production"
      NODE_OPTIONS                   = "--import @pagopa/azure-tracing"

      // AUDIT
      AUDIT_LOG_CONNECTION_STRING = var.audit_log_connection_string
      AUDIT_LOG_CONTAINER         = var.audit_log_container

      // CDC
      CDC_BASE_URL              = var.cdc_base_url
      CDC_REGISTRATION_END_DATE = "2025-09-19"

      // COSMOS
      COSMOSDB_CDC_URI           = var.cosmosdb_cdc_uri
      COSMOSDB_CDC_KEY           = var.cosmosdb_cdc_key
      COSMOSDB_CDC_DATABASE_NAME = var.cosmosdb_cdc_database_name

      // STORAGE
      STORAGE_ACCOUNT__queueServiceUri = var.storage_account_queue_uri
      CARD_REQUEST_QUEUE_NAME          = var.card_request_queue_name

      // SERVICES API
      SERVICES_API_URL = var.services_api_url
      SERVICES_API_KEY = var.services_api_key

      // CDC API
      CDC_API_BASE_URL      = var.cdc_api_base_url
      CDC_API_BASE_URL_TEST = var.cdc_api_base_url_test

      // FIMS
      FIMS_REDIRECT_URL  = var.fims_redirect_url
      FIMS_CLIENT_ID     = var.fims_client_id
      FIMS_CLIENT_SECRET = var.fims_client_secret
      FIMS_ISSUER_URL    = var.fims_issuer_url
      FIMS_SCOPE         = var.fims_scope

      // JWT
      JWT_PUBLIC_KEY  = var.jwt_public_key
      JWT_PRIVATE_KEY = var.jwt_private_key

      // ENCRYPTION
      ENCRYPTION_PUBLIC_KEY  = var.encryption_public_key
      ENCRYPTION_PRIVATE_KEY = var.encryption_private_key

      // JWT AND ENCRYPTION CONFIG
      JWT_ISSUER           = var.jwt_issuer
      JWT_AUDIENCE         = var.jwt_audience
      JWT_EXPIRATION       = var.jwt_expiration
      ALGORITHM_KEYS       = var.algorithm_keys
      ALGORITHM_SIGNATURE  = var.algorithm_signature
      ALGORITHM_ENCRYPTION = var.algorithm_encryption
      ENCODING_ENCRYPTION  = var.encoding_encryption

      // IDP KEYS
      PAGOPA_IDP_KEYS_BASE_URL = var.pagopa_idp_keys_base_url

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
