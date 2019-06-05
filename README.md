# random-users-app

> **Note:** This is a learn-by-doing project, experimenting with how to deploy a React app and a GraphQL API server to Zeit's now.sh.

This toy web app consists of 2 parts:

- a GraphQL API server that provides 2 queries: `user` and `users`. It uses randomuser.me to generate random users.
- a React client that makes 1 request to the GraphQL server for 10 random users and renders the returned list of users.

**Demo**

- server: https://random-users-server.randie.now.sh/
- client: https://random-users-client.randie.now.sh/
