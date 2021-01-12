import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import Layout from './components/Layout';

function App( {history} ) {
  console.log(history);
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={Login} exact/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
