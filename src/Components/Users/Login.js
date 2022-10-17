import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from '../Providers'
//import AlertDismissible from '../AlertDismissible'
import Alert from 'react-bootstrap/Alert';
import "../css/loginForm.css";
import "../css/list.css";

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const location = useLocation();
    const [state, setState] = useContext(AppContext);
    const contextPorviderData = useContext(AppContext);
    const { token } = contextPorviderData[0];

    const dataToLogin = {
        email: email,
        password: password,
    }

    const login = () => {
        fetch(`${process.env.REACT_APP_API_HOST_LOCAL}/user/login`,{            
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dataToLogin)
        })
        .then((response) => response.json())
        .then((json) =>{ 
            if (json.errors) {
                setError('Wrong password or e-mail.');
            }
            if (json.error) {
                setError(json.error) 
            }
            setContextToken(json.token)
            window.localStorage.setItem("token", json.token)
            if (location.state?.from) {
                navigate(location.state.from)
            }
            navigate('list')
        });
     
     }
    
    useEffect(() => {
        setShow(true)
    },[error.length > 0])

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    },[])

    function handleSubmitLogin() {
        setShow(false);
        setError(false)
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

    return(
        <>
            <div className="d-grid gap-2 col-6 mx-auto">
                <h4 className="LoginFormDescription">Login</h4>
              
                {show && error.length > 0 &&
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>{error}</Alert.Heading>
                    </Alert>
                } 

                <div className="mb-3">
                    <label htmlFor="email" className="loginFormInputLabel">E-mail</label>
                    <input name="email" id="email" type="email" className="LoginFormInput" value={email} onChange={loginEmailChange} />                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="loginFormInputLabel">Password</label>
                    <input name="password" id="password" type="password" className="LoginFormInput" value={password} onChange={loginPasswordChange} />
                </div>

                <button className="btn btn-primary" onClick={handleSubmitLogin}>Login</button>

            </div>
        </>
    )
}

export default Login;