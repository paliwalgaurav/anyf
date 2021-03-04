import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import CountryContainer from "./containers/country";
import './styles.css';
import SignInComponent from "./components/sign-in";
import {getToken} from "./utility";

export const API_END = 'http://127.0.0.1:2000'


const App = () => {
    const [login] = useState(!!getToken());

    return (
        <div>
            <header>AnyFin | Global Exchange Rates</header>
            <BrowserRouter>
                <Switch>
                    <Route exact path={location.pathname}>
                        {
                            login
                                ? <Redirect to='/country-search'/>
                                : <Redirect to='/sign-in'/>
                        }
                    </Route>
                    {login && <Route exact path={'/country-search'} component={CountryContainer}/>}
                    {!login && <Route exact path={'/sign-in'} component={SignInComponent}/>}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

export default App;
