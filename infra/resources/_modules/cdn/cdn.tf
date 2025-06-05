module "cdc_fe_cdn" {
  source  = "pagopa-dx/azure-cdn/azurerm"
  version = "0.0.6"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = var.app_name
    instance_number = var.instance_number
  }

  resource_group_name = var.resource_group_name

  origins = {
    storage = {
      host_name = var.host_name
      priority  = 1
    }
  }

  custom_domains = [{
    host_name = "cdc.io.pagopa.it",
    dns = {
      zone_name                = "io.pagopa.it",
      zone_resource_group_name = "io-p-rg-external"
    }
  }]

  tags = var.tags
}

resource "azurerm_cdn_frontdoor_rule_set" "rewrite_route_rule_set" {
  name                     = "RewriteRoute"
  cdn_frontdoor_profile_id = module.cdc_fe_cdn.id
}

resource "azurerm_cdn_frontdoor_rule" "rewrite_index" {
  name                      = "RewriteIndex"
  cdn_frontdoor_rule_set_id = azurerm_cdn_frontdoor_rule_set.rewrite_route_rule_set.id
  order                     = 1
  behavior_on_match         = "Continue"

  actions {
    url_rewrite_action {
      source_pattern          = "/"
      destination             = "/index.html"
      preserve_unmatched_path = false
    }
  }

  conditions {
    request_uri_condition {
      operator = "Any"
    }
  }
}

data "azurerm_cdn_frontdoor_endpoint" "cdc_fe_endpoint" {
  name = "io-p-itn-cdc-fe-fde-01-a3aga5ddbabndudc.a01.azurefd.net"
  resource_group_name = "io-p-itn-cdc-rg-01"
  profile_name = module.cdc_fe_cdn.name
}

data "azurerm_cdn_frontdoor_origin_group" "cdc_fe_origin_group" {
  name = "io-p-itn-cdc-fe-fdog-01"
  resource_group_name = "io-p-itn-cdc-rg-01"
  profile_name = module.cdc_fe_cdn.name
}

resource "azurerm_cdn_frontdoor_route" "example" {
  name                          = "io-p-itn-cdc-fe-cdnr-01"
  cdn_frontdoor_endpoint_id     = data.azurerm_cdn_frontdoor_endpoint.cdc_fe_endpoint.id
  cdn_frontdoor_origin_group_id = data.azurerm_cdn_frontdoor_origin_group.cdc_fe_origin_group.id
  cdn_frontdoor_origin_ids      = [azurerm_cdn_frontdoor_origin.example.id]
  cdn_frontdoor_rule_set_ids    = [azurerm_cdn_frontdoor_rule_set.rewrite_route_rule_set.id]
  enabled                       = true

  forwarding_protocol    = "HttpsOnly"
  https_redirect_enabled = true
  patterns_to_match      = ["/*"]
  supported_protocols    = ["Http", "Https"]

  cdn_frontdoor_custom_domain_ids = [azurerm_cdn_frontdoor_custom_domain.contoso.id, azurerm_cdn_frontdoor_custom_domain.fabrikam.id]
  link_to_default_domain          = false

  cache {
    query_string_caching_behavior = "IgnoreSpecifiedQueryStrings"
    query_strings                 = ["account", "settings"]
    compression_enabled           = true
    content_types_to_compress     = ["text/html", "text/javascript", "text/xml"]
  }
}