locals {
  repository = {
    name                     = "io-cdc"
    description              = "carta della cultura services"
    topics                   = ["io", "cdc"]
    reviewers_teams          = ["io-bonus-n-payments-admins", "engineering-team-cloud-eng"]
    app_cd_policy_tags       = ["io-cdc@*", "*"]
    app_cd_policy_branches   = ["*"]
    infra_cd_policy_branches = ["main"]
    jira_boards_ids          = ["CES", "IOBP"]
  }
}
