locals {
  prefix    = "io"
  env_short = "p"
  env       = "prod"
  repo_name = "io-cdc"

  tags = {
    CostCenter   = "TS310 - PAGAMENTI & SERVIZI"
    CreatedBy    = "Terraform"
    Environment  = "Prod"
    BusinessUnit = "CDC"
    Source       = "https://github.com/pagopa/io-cdc/blob/main/infra/github-runner/prod"
  }
}
