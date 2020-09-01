import React, { Component } from 'react';
import { HashRouter, Route, Switch ,Redirect} from 'react-router-dom';

// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { connect } from "react-redux";
import { signInAction } from "./Actions";
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const mapStateToProps = state => {
  return { email: state.signReducer.email,
  status:state.signReducer.status}
}
const mapDispatchToProps=(dispatch)=> {
  return {
    signIn: email => dispatch(signInAction(email))
  };
}


function PrivateRoute ({component:Component ,authed,...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> 
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              {/* <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
             
              <PrivateRoute authed={this.props.status} name="Home" path='/' component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
