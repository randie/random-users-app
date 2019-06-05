import React from 'react';
import ReactDOM from 'react-dom';
import { request } from 'graphql-request';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './index.css';

const graphqlEndpoint = 'https://random-users-app-4v76q80kc.now.sh/graphql';

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

function User({ user }) {
  return (
    <Card
      style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', paddingLeft: '1rem' }}
    >
      <CardMedia
        image={user.picture.thumbnail}
        style={{ height: 50, width: 50, borderRadius: '50%' }}
      />
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
