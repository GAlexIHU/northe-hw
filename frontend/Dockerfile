FROM node:20-alpine AS base


# base builder image
FROM base as builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

# Set up npm caching
RUN npm config set cache /.npm --global
COPY package.json package-lock.json ./

RUN --mount=type=cache,id=npm-cache,target=/.npm npm install

COPY . .
RUN npm run build:fe

# Create final runner
FROM base as runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app
COPY --from=builder /app/frontend/.next/standalone /app
# Copy manual assets. TODO: should be hosted separately on CDN
COPY --from=builder /app/frontend/public /app/frontend/public
COPY --from=builder /app/frontend/.next/static /app/frontend/.next/static

# Using optimized standalone build of Next
CMD node frontend/server.js
