# DEPLOYMENT WITH DOCKER AND AWS
Deploy into the cloud - cloud being hosted servers accessed over the internet
- AWS from Amazon
- Azure from Microsoft
- GoogleCloud from Google
AWS top cloud tool ( 2022 )

## SERVERLESS VS CONTAINERS
- 2 approaches:
  - serverless: cloud configuring actual servers for deployment team in order to not preoccupy with those
  Just need to worry about when the code runs and what it does ( sort of event programming: where the code runs in response of some event / few cons: may encounter higher latencies, higher response times if not careful - could happen with lambda functions going to "sleep" --> then need to restart before responding to any requests / could be locked to a single cloud: example AWS and there lambda functions and can cost if h
  there is a need for migrations )
    - Lambda functions: 
    - docker: providing tools within their containers that can run anywhere

## VIRTUAL MACHINES
Related concept to containers.
( VMWare or VirtualBox or Parallels )
It allows to run another operating system alongside our existing operation system contained in isolation without any link to our machine ( except if we do a bridge to allow to access to the computer )
Note: containers and virtual machine can run together

- virtual machine: has in infrastructure ( server in cloud or personal laptop, ) a hypervisor  
( being able to pretend another operator system ) running in isolated VMs
( Amazon EC2 - handling infrastructure : multiple sandbox )


## CONTAINERS
Case: Running on different operating system containing application 
It is like a VM however it shares the OS from where it is running on while VM have to create a virtual environments on top of the infrastructure, on top of the computer + need of hypervisor + guest operating system
Whereas a container is running on the computer and making use of the host operating sys ( your OS ) + the guest OS ( OS targeted)
Docker replaces in VM : Hypervisor + Guest operating system
Containers do a lot less work | VM does a lot of work to setup )
Containers start in seconds | VM starts in minutes


Reasons to use VM:
- provides stronger isolation than containers: because of the extra layers ( Hypervisor + Guest operating system to ensure data are not leaked from customer ( between the VMs ) )

Common implementation:
Using VM with Containers ( like running Docker in EC2 Amazon services )

## INSTALL DOCKER
https://docker.com/get-started > Docker Desktop
- Download Docker for your OS with docker desktop ( recommended )
- Check if Docker is installed Using CLI
  - `docker` listing all the commands 

## RUNNING A FIRST DOCKER CONTAINER
https://docker.com/get-started > Docker Hub:  
Cloud based application registry and development team  
collaboration services meaning: Docker Hub is a docker  image repository ( Hosts images collection == snapshot of all files and applications needed for the container for the application to run  )
To  update an image we delete the image and create a new one 

--> use https://hub.docker.com [ FREE ] ( or EC2 Amazon Elastic )Container Registry
This link provides "Official images"

Practicing Docker : https://hub.docker.com/docker/getting-started
- CLI
  - `docker run docker/<docker-image>` : `docker run docker/getting-started` to create the container and run the docker image
  - `docker pull docker/getting-started`: to have the docker image locally
  - `docker run <publish-port> </port>docker/<docker-image>` : `docker run -p 80:80 docker/getting-started`
    - `-d`: run container in *detached* mode ( in the background )
    - `80:80` : on the host's port 80 matching ( : ) the container's port 80
    - `docker/getting-started`: image used
  Visiting  `http://localhost:<mapped-port>` --> will lead to the environment the hosted application
  **TIP: shorthand CLI by joining `-d` and `-p` --> `-dp 80:80`**

  ## DOCKER HUB ACCOUNT
  Docker repository
  - `docker login`: cmd to connect to your docker hub account

  ## DOCKER FILE
  Tool Plugin: Docker extension https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker helps in suggesting elements related to docker
  Creates a docker image 
  - create file :`DockerFile` to the root of your project
  - within the `DockerFile`
    - `FROM <docker-baseImage>`: selects a base-image
      - base image could be docker-image in docker hub with an environment pre-configured ( search for Node image depending of version of Node and OS desired ) --> https://hub.docker.com/_/node
        - see `node:<version>-alpine` common node image ( quite slim : 30 - 40 mg)
      - Result: `FROM node:lts-alpine` from latest node
 ![Screenshot](../assets/dockerfile-creation.pngdockerfile-creation.png)


## IMPROVING DOCKERFILE WITH LAYERS
- npm install will download packages for the docker container however it will also know your machine configuration and install those ( == will not be a container to install for all OS and not apply to alpine node version ) 
  - Objective: install on the container a fresh node_modules .
### How to ? 
- Creating a file .dockerIgnore and specify any elements that should be ignored
 - `*/node_modules`: ignoring all node_modules folder
 - `.git`: removing all git info
 - `.server/public:` removing server/public artefact
- Docker Layers
All about splitting / breaking the docker process into smaller components so they can be  
 *cached* more easily.
Docker will create a new layer each time a `COPY` or `RUN` commands   
lines are being processed if something did change
(npm install will install the server first over the client)
Add:
- copy all package related file : add an * after the word `package`


## UPDATING API URL
Once on Docker, the app will be served at the same URL;  
hence there are no need to specify the URL but the version of our API
```js
//at 22-nasa-project-deployement-docker-and-aws  /client/src/hooks/requests.js

/* Updating API URL for docker specifying to request 
 at the same location the v1 of the API */
// const API_URL = "http://localhost:8000/v1"; // PREVIOUS IMPLEMENTATION

const API_URL = "v1";

```


## BUILDING NASA PROJECT DOCKER IMAGE
resource: https://docs.docker.com/engine/reference/commandline/build/

2 Steps to use the docker configuration file:
1. build docker image:
  - `docker build [OPTIONS] PATH | URL | -`
    - ex: `docker build .`
    - with flags
     - tag ex: to tag the build + add a name to the image we are creating : `docker build . -t <account-name/project>` : `docker build . -t <user>/<docker-image-published>`
     (to run from terminal ) 
    
2. run that image to create a docker container

## RUNNING NASA PROJECT in a container
resource: https://docs.docker.com/engine/reference/commandline/run/
( second step )

- to run docker: `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`  
  - ex: `docker run -it -p 8000:8000 <user>/<docker-image-published>`
    - `-it`: let us access a terminal through our container

Having issue with the docker run not working with env file a in higher hierarchy ?
- `docker run --env-file <ENV-FILE-PATH> -it -p 8000:8000 <user>/<docker-image-published>`
and make a script out of it within package.json in order to keep that simple

  - WARNING: 
  `RUN  export $(cat ../.env) && npm run install-server --only=production` // exposes your .env file within your container

  - Alternative provided:
  https://docs.docker.com/develop/develop-images/build_enhancements/#new-docker-build-secret-information

## AWS and EC2
EC2 is an AWS service that runs instances to host a container ( docker image for example )

# Accessing the deployed version
When EC2 instance has its docker image: Go to EC2 instances: click on the instance you have and get IPV4 Public IP to which you add the port 

# CheatSheet
## Rebuild docker image ( `mac with m1 ship`): `docker buildx build . --push --platform=linux/amd64 --tag <user>/<project>:latest`
From within the repository where the dockerfile leaves

## Connect to EC2 instance
- go to EC2 dashboard with instances listed
- make sure the instance is running ( otherwise launch it )
- click on connect button ( if freshly launched instance --> click on the refresh
button in order for the connect button to be enable )
- follow the instructions and connect using the ssh **from the location where you   
registered the private / public key-pairs 


- once in the EC2 console: 
  - make sure to have updated your instance with `yum` and have `docker installed`
    - `[ sudo ] yum update -y`
    - `[ sudo ] yum install docker`
  - make sure you have the latest version of your docker image
    - `docker pull <user>/<project>:latest`
  - finally you can run the docker image within the instance
    - `docker run --restart=always -p 8000:8000 <user>/<project>`

## Check the deployed app
- Go to AWS EC2 > your instance
- copy the IPV4 ip address
- paste to the url and add the port `:8000` 
The web app should be available ✨🙌