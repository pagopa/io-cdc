data "azurerm_log_analytics_workspace" "log" {
  name                = format("%s-common-log-01", local.project)
  resource_group_name = "${local.project}-common-rg-01"
}
