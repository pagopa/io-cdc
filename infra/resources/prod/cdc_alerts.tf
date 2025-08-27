######################
# APP FAILURE ALERTS #
######################

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "cdc_fims_auth_failure" {
  enabled             = true
  name                = "[CDC | AppIO] FIMS auth failed"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_application_gateway.io_app_gateway.id]
  description             = "There have been some failures on /api/cdc/v1/fauth, citizens are being impacted."
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "PT15M" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "PT15M" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      AzureDiagnostics
        | where originalHost_s in (datatable (name: string) ["api-app.io.pagopa.it"])
        | where requestUri_s matches regex "/api/cdc/v1/fauth"
        | where httpStatus_d >= 400
      QUERY
    operator                = "GreaterThan"
    threshold               = 1
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "cdc_fims_callback_failure" {
  enabled             = true
  name                = "[CDC | AppIO] FIMS callback failed"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_application_gateway.io_app_gateway.id]
  description             = "There have been some failures on /api/cdc/v1/fcb, citizens are being impacted."
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "PT15M" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "PT15M" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      AzureDiagnostics
        | where originalHost_s in (datatable (name: string) ["api-app.io.pagopa.it"])
        | where requestUri_s matches regex "/api/cdc/v1/fcb"
        | where httpStatus_d >= 400
      QUERY
    operator                = "GreaterThan"
    threshold               = 1
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "cdc_authorize_failure" {
  enabled             = true
  name                = "[CDC | AppIO] Authorize failed"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_application_gateway.io_app_gateway.id]
  description             = "There have been some failures on /api/cdc/v1/authorize, citizens are being impacted."
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "PT15M" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "PT15M" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      AzureDiagnostics
        | where originalHost_s in (datatable (name: string) ["api-app.io.pagopa.it"])
        | where requestUri_s matches regex "/api/cdc/v1/authorize"
        | where httpStatus_d >= 400
      QUERY
    operator                = "GreaterThan"
    threshold               = 1
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "cdc_years_failure" {
  enabled             = true
  name                = "[CDC | AppIO] Years failed"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_application_gateway.io_app_gateway.id]
  description             = "There have been some failures on /api/cdc/v1/years, citizens are being impacted."
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "PT15M" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "PT15M" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      AzureDiagnostics
        | where originalHost_s in (datatable (name: string) ["api-app.io.pagopa.it"])
        | where requestUri_s matches regex "/api/cdc/v1/years"
        | where httpStatus_d >= 400
      QUERY
    operator                = "GreaterThan"
    threshold               = 1
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "cdc_get_card_requests_failure" {
  enabled             = true
  name                = "[CDC | AppIO] GET card request failed"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_application_gateway.io_app_gateway.id]
  description             = "There have been some failures on GET /api/cdc/v1/card-requests, citizens are being impacted."
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "PT15M" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "PT15M" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      AzureDiagnostics
        | where originalHost_s in (datatable (name: string) ["api-app.io.pagopa.it"])
        | where requestUri_s matches regex "/api/cdc/v1/card-requests"
        | where httpMethod_s == 'GET'
        | where httpStatus_d >= 400
      QUERY
    operator                = "GreaterThan"
    threshold               = 1
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "cdc_post_card_requests_failure" {
  enabled             = true
  name                = "[CDC | AppIO] POST card request failed"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_application_gateway.io_app_gateway.id]
  description             = "There have been some failures on POST /api/cdc/v1/card-requests, citizens are being impacted."
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "PT15M" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "PT15M" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      AzureDiagnostics
        | where originalHost_s in (datatable (name: string) ["api-app.io.pagopa.it"])
        | where requestUri_s matches regex "/api/cdc/v1/card-requests"
        | where httpMethod_s == 'POST'
        | where httpStatus_d >= 400
      QUERY
    operator                = "GreaterThan"
    threshold               = 1
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}

###############################
# POISON QUEUE STORAGE ALERTS #
###############################

resource "azurerm_monitor_diagnostic_setting" "queue_diagnostic_setting" {
  name                       = "io-p-cdc-st-queue-ds-01"
  target_resource_id         = "${data.azurerm_storage_account.storage_cdc_be.id}/queueServices/default"
  log_analytics_workspace_id = data.azurerm_application_insights.common.workspace_id

  enabled_log {
    category = "StorageWrite"
  }

  metric {
    category = "Capacity"
    enabled  = false
  }
  metric {
    category = "Transaction"
    enabled  = false
  }
}

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "card_request_poison_alert_rule" {
  enabled             = true
  name                = "[CDC | iopitncdcbest01] Failures on card-request-poison"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_storage_account.storage_cdc_be.id]
  description             = "Permanent failures processing CardRequest. REQUIRED MANUAL ACTION"
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "PT15M" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "PT15M" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      StorageQueueLogs
        | where OperationName has "PutMessage"
        | where Uri has "card-request-poison"
      QUERY
    operator                = "GreaterThan"
    threshold               = 0
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}

###############################
# FUNCTIONS EXECUTIONS ALERTS #
###############################

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "cdc_process_pending_request_failure" {
  enabled             = true
  name                = "[CDC | Queue Jobs] ProcessPendingRequest failed"
  resource_group_name = data.azurerm_resource_group.itn_cdc.name
  location            = local.location

  scopes                  = [data.azurerm_application_insights.common.id]
  description             = "Queue fired ProcessPendingRequest job has failed."
  severity                = 1
  auto_mitigation_enabled = false

  window_duration      = "P1D" # Select the interval that's used to group the data points by using the aggregation type function. Choose an Aggregation granularity (period) that's greater than the Frequency of evaluation to reduce the likelihood of missing the first evaluation period of an added time series.
  evaluation_frequency = "P1D" # Select how often the alert rule is to be run. Select a frequency that's smaller than the aggregation granularity to generate a sliding window for the evaluation.

  criteria {
    query                   = <<-QUERY
      requests
        | where cloud_RoleName == 'io-p-itn-cdc-backend-func-01'
        | where success == false
        | where operation_Name =~ 'ProcessPendingRequest'
      QUERY
    operator                = "GreaterThan"
    threshold               = 0
    time_aggregation_method = "Count"
  }

  action {
    action_groups = [
      azurerm_monitor_action_group.io_p_itn_cdc_error_action_group.id,
    ]
  }

  tags = local.tags
}
