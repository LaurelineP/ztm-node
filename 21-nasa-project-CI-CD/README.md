# CI / CD
**Continuous Integration**: iterate the commit to push and tests the implementation  
Part of Agile Methodology
**Continuous Delivery**: Process built on CI: have a prod ready state of your app  
(it's not a deployed version ). To implement continuous deployment, tests must be added  
to the code base. With Continuous Delivery is not the process when we would deploy necessarily.  
Ensuring ourselves the app is bug free
**Continuous Deployment**: Process built on CI: process to deploy/release the app in prod  
 deployment state is when you need to push in prod. Continuous Deployment is not specifically  
 for all companies

Resources: https://github.com/odziem/nasa-project

Tools & Services
- Circle CI: https://circleci.com/
- travis CI: https://www.travis-ci.com/
- Github actions: https://www.travis-ci.com/
- Jenkins: https://www.jenkins.io/

## PIPELINES
Pipelines are steps of validation


## GITHUB ACTIONS FOR CI/CD
### What are Github Actions ?
Services built onto github allowing to get CI Pipelines.
It is responding to multiple triggers / actions 
- on committing
- on push
Then go through a whole workflow defined in a YAML file format

### How to set up github actions                  
- `Github > Repository > Actions tab` (it could be possible for your repository  
to have recommendations based on language used)  
  - either called starter workflows and press `set up this workflow` button
  - either create a YAML file : `<file>.yml` called starter workflows and build  
  the needed CI workflow

## CONTINUOUS INTEGRATION: BUILD PIPELINES.
- In the project: create a new folder named `.github`
- In `.github/`: create a folder: create a `workflows` folder
- In `.workflows/`  create a file `node.yml`
- Then start editing it


## GITHUB ACTIONS MARKET PLACE
"Github/marketplace" we could search for a
common use case/action based on our needs with some hooks. setup node"
Those hooks are built buy dev; such as 
- checkout hook: defining the action to checkout into branches before
running `steps` for instance
Feel free to search when needed.


### Syntax
https://github.github.io/actions-cheat-sheet/actions-cheat-sheet.pdf


### Links
teacher's repo: https://github.com/odziem/nasa-project
mongodb github actions: https://github.com/marketplace/actions/mongodb-in-github-actions