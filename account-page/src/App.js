import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
