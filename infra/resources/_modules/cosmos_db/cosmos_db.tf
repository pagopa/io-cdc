module "cdc_cosmos_account" {
  source  = "pagopa-dx/azure-cosmos-account/azurerm"
  version = "0.2.0"

  subnet_pep_id = var.subnet_pep_id

  alerts = {
    enabled         = true
    action_group_id = var.action_group_id
    thresholds = {
      provisioned_throughput_exceeded = 1000
    }
  }

  environment = var.environment

  secondary_geo_locations = [
    {
      location          = "spaincentral"
      failover_priority = 1
      zone_redundant    = false
    }
  ]

  tags = var.tags

  consistency_policy = {
    consistency_preset = "Default"
  }

  resource_group_name = var.resource_group
}

resource "azurerm_cosmosdb_sql_database" "cdc_cosmos_db" {
  name                = "cdc-cosmos-01"
  resource_group_name = var.resource_group
  account_name        = module.cdc_cosmos_account.name
}

resource "azurerm_cosmosdb_sql_container" "card_requests" {
  name                = "card-requests"
  resource_group_name = var.resource_group

  account_name        = module.cdc_cosmos_account.name
  database_name       = azurerm_cosmosdb_sql_database.cdc_cosmos_db.name
  partition_key_paths = ["/fiscalCode"]
  autoscale_settings {
    max_throughput = 12000
  }
}

resource "azurerm_cosmosdb_sql_container" "requests-audit" {
  name                = "requests-audit"
  resource_group_name = var.resource_group

  account_name        = module.cdc_cosmos_account.name
  database_name       = azurerm_cosmosdb_sql_database.cdc_cosmos_db.name
  partition_key_paths = ["/fiscalCode"]
  autoscale_settings {
    max_throughput = 12000
  }
}