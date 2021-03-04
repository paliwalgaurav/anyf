import {useState} from 'react';
import axios from "axios";
import {getToken} from "../utility";
import {Redirect} from "react-router-dom";
import {API_END} from "../app";

const SignInComponent = () => {
    const [user] = useState(undefined);

    /**
     * get the authentication token for new user
     * - sets the token in cookies
     * - redirects accordingly
     *
     * @param user
     * @returns {Promise<void>}
     */
    const signIn = async (user) => {
        const response = await axios.post(`${API_END}/auth`, {user});
        document.cookie = `token=${response.data}`;
        if (getToken()) {
            await <Redirect from={location.pathname} to='/country-search' push={true}/>;
            location.reload();  // patch didn't make Redirect work
        } else {
            await <Redirect from={location.pathname} to='/sign-in' push={true}/>;
            location.reload();  // patch didn't make Redirect work
        }
        return;
    };

    return (
        <div className={'grid sign-in-container'}>
            <input
                value={user}
                autoFocus={true}
                placeholder={'Your Name'}
            />
            <button onClick={() => signIn(user)}>Enter</button>
        </div>
    );
}

export default SignInComponent;
