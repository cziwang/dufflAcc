import logo from './logo.svg';
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import { listAccounts } from './graphql/queries';
import {useState, useEffect} from 'react';
import { Paper, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

Amplify.configure(awsconfig)

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const accountData = await API.graphql(graphqlOperation(listAccounts));
      const accountList = accountData.data.listAccounts.items;
      console.log('account list', accountList)
      setAccounts(accountList)
    } catch (error) {
      console.log('error on fetching accounts ', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
          <h2>My App Content</h2>
      </header>
      <div className="accountList">
        { accounts.map(account => {
          return (
            <Paper variant="outlined" elevation={2}>
              <div className="accountCard">
                <IconButton aria-label="play">
                  <PlayArrowIcon />
                </IconButton>
                <div>
                  <div className="accountUsername">{account.userName}</div>
                  <div className="accountDeliveryAddress">{account.deliveryAddress}</div>
                </div>
              </div>
            </Paper>
          )
        })}
      </div>
    </div>
  );
}

export default withAuthenticator(App);
