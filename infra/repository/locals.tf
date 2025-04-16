locals {
  prefix          = "io"
  env_short       = "p"
  location        = "italynorth"
  domain          = "cdc"
  instance_number = "01"

  adgroups = {
    admins_name = "io-p-adgroup-bonus-admins"
    devs_name   = "io-p-adgroup-bonus-developers"
  }

  runner = {
    cae_name                = "${local.prefix}-${local.env_short}-itn-github-runner-cae-01"
    cae_resource_group_name = "${local.prefix}-${local.env_short}-itn-github-runner-rg-01"
    secret = {
      kv_name                = "${local.prefix}-${local.env_short}-kv-common"
      kv_resource_group_name = "${local.prefix}-${local.env_short}-rg-common"
    }
  }

  apim_itn = {
    name                = "${local.prefix}-${local.env_short}-itn-apim-01"
    resource_group_name = "${local.prefix}-${local.env_short}-itn-common-rg-01"
  }

  vnet = {
    name                = "${local.prefix}-${local.env_short}-itn-common-vnet-01"
    resource_group_name = "${local.prefix}-${local.env_short}-itn-common-rg-01"
  }

  dns = {
    resource_group_name = "${local.prefix}-${local.env_short}-rg-external"
  }

  dns_zones = {
    resource_group_name = "${local.prefix}-${local.env_short}-rg-common"
  }

  tf_storage_account = {
    name                = "iopitntfst001"
    resource_group_name = "terraform-state-rg"
  }

  repository = {
    name               = "io-cdc"
    description        = "carta della cultura services"
    topics             = ["io", "cdc"]
    reviewers_teams    = ["io-bonus-n-payments-admins", "engineering-team-cloud-eng"]
    app_cd_policy_tags = ["io-cdc@*"]
  }

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Bonus & Pagamenti"
    Source         = "https://github.com/pagopa/io-cdc/blob/main/infra/identity/prod"
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
  }
}

