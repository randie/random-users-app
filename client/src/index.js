import React from 'react';
import ReactDOM from 'react-dom';
import { request } from 'graphql-request';
import CircularProgress from '@material-ui/core/CircularProgress';

import './index.css';

const graphqlEndpoint = 'https://random-users-app.randie.now.sh';

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

function App() {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await request(graphqlEndpoint, usersQuery);
    setUsers(response);
  };

  return !users ? <Loading /> : <div>Users</div>;
}

ReactDOM.render(<App />, document.getElementById('root'));
