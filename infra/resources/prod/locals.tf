locals {
  prefix         = "io"
  env_short      = "p"
  location_short = "itn"
  domain         = "cdc"
  # the project on which the resources will be created
  # it's the prefix of any resource name
  # it includes the choosen location
  project = "${local.prefix}-${local.env_short}-${local.location_short}"

  # some referenced resources are in a different location
  # for historical reasons
  # this project points to them (westeurope)
  project_legacy = "${local.prefix}-${local.env_short}"

  location           = "italynorth"
  secondary_location = "germanywestcentral"

  tags = {
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO CDC"
    BusinessUnit   = "CDC"
    Source         = "https://github.com/pagopa/io-cdc/blob/main/infra/resources/prod"
  }
}
