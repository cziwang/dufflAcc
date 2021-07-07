import logo from './logo.svg';
import './App.css';
import { AmplifyAuthenticator, withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <AmplifyAuthenticator>
        <h3>Account Page</h3>
        <AmplifySignOut></AmplifySignOut>
      </AmplifyAuthenticator>
    </div>
  );
}

export default withAuthenticator(App);
