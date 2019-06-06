# random-users-app

> **Note:** This was a learn-by-doing project to experiment with deploying a React app and a GraphQL API server to Zeit's now.sh.

## Synopsis

This toy web app consists of a server and a client, both of which are deployed to the same domain on now.sh.

- The GraphQL API server provides 2 queries: `user` and `users`. It uses [randomuser.me](https://randomuser.me/) to generate random users.
- The React client makes 1 request to the GraphQL API server for 10 random users and renders the returned list of users.

## Live Demo

- server: https://random-users-app-6w60m0rex.now.sh/graphql
- client: https://random-users-app-6w60m0rex.now.sh/
