
# Quickstart

Built on Docker Client v4.19.0 in MacOS.

1. `cp .env.example .env.local`. Default values should be enough to quickly compose without issue.
2. Run `bash develop up` will get dev environment started.

With default `.env`, nodeJS server is at `http://localhost:8888` and mongo express at `http://localhost:27017`. 

API Documentation: `http://localhost:8888/api-docs`

API and authorization should be working.

API endpoints: `http://localhost:8888/api/v1`

Refers to API Documentation for request/response sample and format.

To create Admin User, run `bash develop node run create:admin` (ensure the docker is running).

Note: if default `password` not working, enter your password manually instead.

## Accessing MongoDB

Use your favourite database client and access it via `mongodb://<MONGO_USER>:<MONGO_PASS>@localhost:27017`

Credential is based on `.env`.