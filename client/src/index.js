import React from 'react';
import ReactDOM from 'react-dom';
import { request } from 'graphql-request';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './index.css';

const graphqlEndpoint =
  process.env.NODE_ENV === 'production' ? '/graphql' : 'http://localhost:4000/graphql';

const usersQuery = `
{
  users {
   picture { thumbnail }
   name { first last }
   email
   phone
  }
}
`;

function Loading() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
}

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
  paddingLeft: '1rem',
  maxWidth: '550px',
  margin: '0.5rem auto',
};

const cardMediaStyle = {
  height: 50,
  width: 50,
  borderRadius: '50%',
};

function User({ user }) {
  return (
    <Card style={cardStyle}>
      <CardMedia image={user.picture.thumbnail} style={cardMediaStyle} />
      <CardContent>
        <Typography component="h5" variant="h5">
          {user.name.first} {user.name.last}
        </Typography>
        <Typography variant="subtitle1">
          {user.email} &bull; {user.phone}
        </Typography>
      </CardContent>
    </Card>
  );
}

function App() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await request(graphqlEndpoint, usersQuery);
    setUsers(response.users);
  };

  return users.length === 0 ? (
    <Loading />
  ) : (
    users.map(user => <User user={user} key={user.email} />)
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
