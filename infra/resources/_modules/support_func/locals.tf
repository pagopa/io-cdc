locals {
  cdc_support = {
    app_settings = {
      FUNCTIONS_WORKER_PROCESS_COUNT = 4
      NODE_ENV                       = "production"
      NODE_OPTIONS                   = "--import @pagopa/azure-tracing"

      // COSMOS
      COSMOSDB_CDC_URI           = var.cosmosdb_cdc_uri
      COSMOSDB_CDC_DATABASE_NAME = var.cosmosdb_cdc_database_name

      // CDC
      CDC_USAGE_START_DATE = "2026-01-14T09:30:00.000Z" // 10:30:00 CET of January 14th, 2026
      CDC_USAGE_END_DATE   = "2027-01-14T22:59:59.999Z" // 23:59:59 CET of January 14th, 2027

      // CDC API
      CDC_API_BASE_URL      = var.cdc_api_base_url
      CDC_API_BASE_URL_TEST = var.cdc_api_base_url_test

      // CDC CARDS EXPIRATION DATE
      CDC_CARDS_EXPIRATION_DATE = "2027-01-14T22:59:59.999Z"

      // JWT
      JWT_PRIVATE_KEY      = var.jwt_private_key
      JWT_PRIVATE_KEY_TEST = var.jwt_private_key_test

      // ENCRYPTION
      ENCRYPTION_PUBLIC_KEY      = var.encryption_public_key
      ENCRYPTION_PUBLIC_KEY_TEST = var.encryption_public_key_test

      // JWT AND ENCRYPTION CONFIG
      JWT_ISSUER           = var.jwt_issuer
      JWT_AUDIENCE         = var.jwt_audience
      JWT_EXPIRATION       = var.jwt_expiration
      ALGORITHM_KEYS       = var.algorithm_keys
      ALGORITHM_SIGNATURE  = var.algorithm_signature
      ALGORITHM_ENCRYPTION = var.algorithm_encryption
      ENCODING_ENCRYPTION  = var.encoding_encryption

      // TESTING
      TEST_USERS = var.test_users

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
