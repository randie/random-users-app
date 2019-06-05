# random-users-app

> **Note:** This is a learn-by-doing project, experimenting with how to deploy a React app and a GraphQL API server to Zeit's now.sh.

This toy web app consists of 2 parts:

- a GraphQL API server that provides 2 queries: `user` and `users`. It uses [randomuser.me](https://randomuser.me/) to generate random users.
- a React client that makes 1 request to the GraphQL server for 10 random users and renders the returned list of users.

**Demo**

- server: https://random-users-app-4v76q80kc.now.sh/graphql
- client: https://random-users-app-4v76q80kc.now.sh
