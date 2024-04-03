FROM node:20-alpine AS base


# base builder image
FROM base as dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

# Set up npm caching
RUN npm config set cache /.npm --global
COPY package.json package-lock.json ./

RUN --mount=type=cache,id=npm-cache,target=/.npm npm install --omit=dev

# Build the app
FROM dependencies AS builder
RUN --mount=type=cache,id=npm-cache,target=/.npm npm install

COPY . .
RUN npm run build:be

# Create final runner
FROM base as runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app
COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=builder /app/backend/dist /app/backend/dist
COPY --from=builder /app/package.json /app/package.json

CMD npm run start:be
