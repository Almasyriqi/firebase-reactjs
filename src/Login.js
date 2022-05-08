import React, {useState, useContext} from "react";
import { AuthContext } from "./index";
import * as firebase_auth from "firebase/auth"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase_auth.signInWithEmailAndPassword(firebase_auth.getAuth(), email, password)
        .then(res => {
            if (res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
            setErrors(e.message);
        })
    };

    const loginWithGoogle = e => {
        e.preventDefault();
        const provider = new firebase_auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        firebase_auth.signInWithPopup(firebase_auth.getAuth(), provider)
        .then(res => {
            if(res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
            setErrors(e.message);
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={e => handleForm(e)}>
                <input 
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="email"
                />
                <input 
                onChange={e => setPassword(e.target.value)}
                name="password"
                value={password}
                type="password"
                placeholder="password"
                />
                <hr />
                <button className="googleBtn" type="button" onClick={e => loginWithGoogle(e)}>
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                    alt="logo" 
                    />
                    Login With Google
                </button>
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    );
};

export default Login;