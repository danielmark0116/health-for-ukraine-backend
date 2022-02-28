# CI / CD

With: **DigitalOcean** + **CircleCI**

## How it works?

- Repo is synced with CircleCI project
- Circle CI project is required to have:
  - `IP` env set\*
  - `USER` env set\*
  - `SLACK_ACCESS_TOKEN` env set\*\*
  - `SLACK_DEFAULT_CHANNEL` env set\*\*
  - `SSH key` (private one) added as `Additional SHH Key` in the Projects Settings > SSH Keys. Entry should be added with empty `Hostname`.

> > > [ENVs on CircleCI](https://circleci.com/docs/2.0/env-vars/?utm_source=google&utm_medium=sem&utm_campaign=sem-google-dg--emea-en-dsa-maxConv-auth-brand&utm_term=g_-_c__dsa_&utm_content=&gclid=Cj0KCQiA8ICOBhDmARIsAEGI6o2bRiymnP820XKR2fkJFJK53LXMN7z2XsRhtbTAIBoMEKY6K5G4FwoaAnVOEALw_wcB#setting-an-environment-variable-in-a-project)

> > > \* values represent ip address of the server and one of its users

> > > \*\* environemnt variables needed for slack integration, read more here: [Slack Orb CircleCI](https://github.com/CircleCI-Public/slack-orb/wiki/Setup)

- Entrypoint to the app is the `deploy.sh` file which is triggered by the CircleCI (config is located at `.circleci/config/yml`)
- Entrypoint sript (`deploy.sh`) is not added to the repo, it is present on the server
  - The script pulls the current main branch and runs `docker compose` in prodution mode
  - It is required to provide the server with appropriate `.env` file. Check readme for further onformation
