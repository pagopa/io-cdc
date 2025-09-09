module "func_autoscaler" {
  source  = "pagopa-dx/azure-app-service-plan-autoscaler/azurerm"
  version = "2.0.0"

  resource_group_name = module.cdc_support_func.function_app.resource_group_name
  location            = var.location

  app_service_plan_id = module.cdc_support_func.function_app.plan.id

  target_service = {
    function_apps = [
      {
        id = module.cdc_support_func.function_app.function_app.id
      }
    ]
  }

  scale_metrics = {
    cpu = {
      time_aggregation_increase = "Maximum"
      time_aggregation_decrease = "Average"
      increase_by               = 3
      cooldown_increase         = 2
      decrease_by               = 1
      cooldown_decrease         = 1
      upper_threshold           = 40
      lower_threshold           = 15
    },
    requests = {
      time_aggregation_increase = "Maximum"
      time_aggregation_decrease = "Average"
      increase_by               = 3
      cooldown_increase         = 1
      decrease_by               = 1
      cooldown_decrease         = 1
      upper_threshold           = 3000
      lower_threshold           = 300
    }
  }

  scheduler = {
    normal_load = {
      default = 3,
      minimum = 3,
    },
    maximum = 30,
  }

  tags = var.tags
}
