import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from './Providers'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLogged = useContext(AppContext);
    const dataToEditPayload = isLogged[0];

    const [state, setState] = useContext(AppContext);

    console.log("isLogged: ", isLogged);

    const navigate = useNavigate();

    const dataToLogin = {
        email: email,
        password: password,
    }


    const login = () => {
        fetch(`http://localhost:3000/user/login`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dataToLogin)
        })
        .then((response) => response.json())
        .then((json) => 
            setContextToken(json.token)
        )
        //.then((json) => console.log(json))
        //
        ;       
     }

    function handleSubmitLogin() {
        login()
    }
    function loginEmailChange(event) {
        setEmail(event.target.value);
    }
    function loginPasswordChange(event) {
        setPassword(event.target.value);
    }


    function setContextToken(token) {
        setState({ ...state, "token" : token})
    };

    function setContextisLogged() {
        setState({ ...state, "isLogged" : true})
    };


    return(
        <>
            <div className="usuarios">
                <h1>Login</h1>
                <h4 className="LoginFormDescription">Login</h4>

                    <label htmlFor="email" className="loginFormInputLabel">E-mail</label>
                    <input name="email" id="email" type="email" className="LoginFormInput" value={email} onChange={loginEmailChange} />

                    <label htmlFor="password" className="loginFormInputLabel">Password</label>
                    <input name="password" id="password" type="password" className="LoginFormInput" value={password} onChange={loginPasswordChange} />

                <button 
                    className="loginFormButton" 
                    onClick={handleSubmitLogin}
                >Login</button>
            </div>
        </>
    )
}

export default Login;