import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes.js';
import Header from './Header';
import "./styles.css";
import * as firebase from "firebase/app";
import firebaseConfig from './firebase.config.js';
import reportWebVitals from './reportWebVitals';

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      Is logged in? {JSON.stringify(isLoggedIn)}
      <div className="App">
        <Router>
          <Header />

          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

reportWebVitals();
