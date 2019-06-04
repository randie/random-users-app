//const { ApolloServer, gql } = require('apollo-server');
//const { RESTDataSource } = require('apollo-datasource-rest');

// NOTE: Can only be used with babel-node or node v12+
import { ApolloServer, gql } from 'apollo-server';
import { RESTDataSource } from 'apollo-datasource-rest';

const typeDefs = gql`
  type User {
    name: Name
    location: Location
    picture: Picture
    gender: String
    email: String
    phone: String
    nat: String
  }

  type Name {
    title: String
    first: String
    last: String
  }

  type Location {
    street: String
    city: String
    state: String
  }

  type Picture {
    large: String
    medium: String
    thumbnail: String
  }

  type Query {
    user: User
    users(count: Int): [User]
  }
`;

const resolvers = {
  Query: {
    user: (_, args, { dataSources }) => dataSources.randomUser.getUser(),
    users: (_, { count }, { dataSources }) => dataSources.randomUser.getUsers(count),
  },
};

class RandomUser extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://randomuser.me/api';
  }
  async getUser() {
    const response = await this.get('/');
    return response.results[0];
  }
  async getUsers(count = 10) {
    const response = await this.get(`/?results=${count}`);
    return response.results;
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    randomUser: new RandomUser(),
  }),
  playground: true,
  introspection: true,
});

server.listen().then(({ url }) => console.log(`Server is listening on ${url}`));
