import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AccountDetails from './component/accounts/AccountDetails';
import TransactionDetails from './component/transactions/TransactionDetails'


function App() {
return (
  <div className="App">
      <BrowserRouter>
      <Switch>
              <Route exact path="/" component={AccountDetails} /> 
              <Route exact path="/transaction" component={TransactionDetails} /> 
            </Switch> 
      </BrowserRouter>
</div>
);
}

export default App;
