# FROM <docker-baseImage>: selects docker image
FROM node:lts-alpine

# WORKDIR <path-desired>: creates folder where files will live === current folder
WORKDIR /app

# COPY <host-folder=files-path> <guest-folder-path-ref-to-workdir-above>:
# 	Copies file from host folder to the current guest folder ( /app )
# COPY . .

# COPY just the strict necessary instead; with package.json
# COPY package.json ./


# COPY just the strict necessary + copy package-lock.json with package.json 
COPY package*.json ./


# COPY just the strict necessary from client instead 
COPY client/package*.json client/

# MOVED ABOVE 
# RUN <command>: runs command in the guest folder
# 	Here running project installation with `--only=production` flag to install
# 	only production packages ( = package.json > dependencies 
# 	and not package.json > devDependencies)
# Note: splitted into multiple components by applying layers concept
RUN npm run install-client --only=production

# ===> this will avoid dockerfile to run at any changes whey running COPY or RUN

# # ^@ RUN <command>: runs command in the guest folder
# # 	Here running project installation with `--only=production` flag to install
# # 	only production packages ( = package.json > dependencies 
# # 	and not package.json > devDependencies)
# # Note: splitted into multiple components by applying layers concept
# RUN npm install-client --only=production


# COPY just the strict necessary from server instead 
COPY server/package*.json server/


# RUN npm run install-server --only=production
# https://stackoverflow.com/questions/61693804/dockerfile-is-there-any-way-to-read-variables-from-env-file
# RUN  export $(cat ../.env) && npm run install-server --only=production // exposes your .env file within your container
RUN npm run install-server --only=production

COPY client/ client/

RUN npm run build --prefix client

COPY server/ server/

# Use node security implementation to restrict user for security reasons
USER node

# CMD <string[]> : set default executable command and parameter for
# 	the container execution
CMD ["npm", "start", "--prefix", "server"]


# Port configuration for internet
EXPOSE 8000