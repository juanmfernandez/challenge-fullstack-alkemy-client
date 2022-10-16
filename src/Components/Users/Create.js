import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../Providers'

function CreateUser(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const contextProviderData = useContext(AppContext);    
    const { token } = contextProviderData[0];  
    
    const navigate = useNavigate();
    const dataToCreateNew = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    }

    const addUser = async () => {
        await fetch(`http://localhost:3000/user`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'             
            },
            body: JSON.stringify(dataToCreateNew)
        })
            .then(response => {
                console.log(response.json())
            }).then(data=> 
                console.log(data),
            );       
     }

    function handleSubmitNew(){
        addUser()
        navigate('/');
    }
    function onFirstNameChange(event) {
        setFirstName(event.target.value);
    }
    function onLastNameChange(event) {
        setLastName(event.target.value);
    }
    function onEmailChange(event) {
        setEmail(event.target.value);
    }
    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    return(
        <>
            <div className="usuarios">
                <h1>Add User</h1>
                <h4 className="LoginFormDescription"> </h4>

                    <label htmlFor="firstName" className="editFormInputLabel">First Name</label>
                    <input name="firstName" id="firstName" type="text" className="EditFormInput" value={firstName} onChange={onFirstNameChange} />

                    <label htmlFor="lastName" className="editFormInputLabel">Last Name</label>
                    <input name="lastName" id="lastName" type="text" className="EditFormInput" value={lastName} onChange={onLastNameChange} />

                    <label htmlFor="email" className="editFormInputLabel">E-mail</label>
                    <input name="email" id="email" type="email" className="EditFormInput" value={email} onChange={onEmailChange} />

                    <label htmlFor="password" className="editFormInputLabel">Password</label>
                    <input name="password" id="password" type="password" className="EditFormInput" value={password} onChange={onPasswordChange} />

                <button 
                    className="editFormButton" 
                    onClick={handleSubmitNew}
                >Create new user</button>
            </div>
        </>
    )
}

export default CreateUser;