# Architecture & Design
- poll-service: write path, talks to Postgres.
- results-service: read/aggregate path, calls poll-service for metadata.
- frontend: serves UI and proxies to both services.
- postgres: single DB (tables: polls, options, votes).

