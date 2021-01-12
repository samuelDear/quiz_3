import { BrowserRouter, Route, Switch } from 'react-router-dom';

/* Login */
import Login from './login/Login';

/* Home */
import Home from './home/Home';

/* Others */
import Layout from './components/Layout';

function App( {history} ) {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/home" component={Home} exact/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
