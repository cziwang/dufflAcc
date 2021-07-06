import logo from './logo.svg';
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import { listAccounts } from './graphql/queries';
import { updateAccount } from './graphql/mutations';
import {useState, useEffect} from 'react';
import { Paper, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FavoriteIcon from '@material-ui/icons/Favorite';

Amplify.configure(awsconfig);

function App() {
    const [accounts, setaccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const accountData = await API.graphql(graphqlOperation(listAccounts));
            const accountList = accountData.data.listAccounts.items;
            console.log('account list', accountList);
            setaccounts(accountList);
        } catch (error) {
            console.log('error on fetching accounts', error);
        }
    };

    const addLike = async idx => {
        try {
            const account = accounts[idx];
            account.like = account.like + 1;
            delete account.createdAt;
            delete account.updatedAt;

            const accountData = await API.graphql(graphqlOperation(updateAccount, { input: account }));
            const accountList = [...accounts];
            accountList[idx] = accountData.data.updateAccount;
            setaccounts(accountList);
        } catch (error) {
            console.log('error on adding Like to account', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <AmplifySignOut />
                <h2>My App Content</h2>
            </header>
            <div className="accountList">
              {accounts.map((account, idx) => {
                return (
                  <Paper variant="outlined" elevation={2} key={`account${idx}`}>
                    <div className="accountCard">
                      <IconButton aria-label="play">
                        <PlayArrowIcon />
                      </IconButton>
                      <div>
                        <div className="accountTitle">{account.userName}</div>
                        <div className="accountOwner">{account.deliveryAddress}</div>
                      </div>
                      <div>
                        <IconButton aria-label="like" onClick={() => addLike(idx)}>
                            <FavoriteIcon />
                        </IconButton>
                        {account.like}
                      </div>
                      <div className="accountDescription">{account.email}</div>
                    </div>
                  </Paper>
                );
              })}
            </div>
        </div>
    );
}

export default withAuthenticator(App);