import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../Providers'
import "../css/loginForm.css";
import { format } from "date-fns";

function Create(){
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd hh:mm'));
    const [type, setType] = useState('');
    const [idCategory, setCategory] = useState('');
    const [idUser, setIdUser] = useState('');
    const contextProviderData = useContext(AppContext);    
    const { token } = contextProviderData[0];  
    
    const navigate = useNavigate();
    const dataToCreateNew = {
        amount: parseFloat(amount),
        description: description,
        date: date,
        type: type,
        idCategory: parseInt(idCategory),
        idUser: idUser
    }

    const addBudget = async () => {
        await fetch(`http://localhost:3000/inflow`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`              
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
        addBudget()
        navigate('/');
    }
    function onAmountChange(event) {
        setAmount(event.target.value);
    }
    function onDescriptionChange(event) {
        setDescription(event.target.value);
    }
    function onDateChange(event) {
        setDate(event.target.value);
    }
    function onCategoryChange(event) {
        setCategory(event.target.value);
    }
    function onTypeChange(event) {
        setType(event.target.value);
    }
    function onIdUserChange(event) {
        setIdUser(event.target.value);
    }

    return(
        <>
            <div className="usuarios">
                <h4 className="LoginFormDescription">Add Items</h4>

                    <label htmlFor="amount" className="editFormInputLabel">Monto</label>
                    <input name="amount" id="amount" type="text" className="EditFormInput" value={amount} onChange={onAmountChange} />

                    <label htmlFor="description" className="editFormInputLabel">Descripción</label>
                    <input name="description" id="description" type="text" className="EditFormInput" value={description} onChange={onDescriptionChange} />

                    <label htmlFor="date" className="editFormInputLabel">Fecha</label>
                    <input name="date" id="date" type="datetime-local" className="EditFormInput" value={date} onChange={onDateChange} />
                    
                    <label htmlFor="idCategory" className="editFormInputLabel">Categoria</label>
                    <input name="idCategory" id="idCategory" value={idCategory} type="number" className="EditFormInput" onChange={onCategoryChange} />

                    <label htmlFor="type" className="editFormInputLabel" >type</label>
                    <select name="type" id="type" className="EditFormInput" defaultValue={type} onChange={onTypeChange}>
                        <option value="egreso">Egreso</option>
                        <option value="ingreso">Ingreso</option>
                    </select>

                    <label htmlFor="idUser" className="editFormInputLabel">User ID</label>
                    <input name="idUser" id="idUser" value={idUser} type="number" className="EditFormInput" onChange={onIdUserChange} />

                <button 
                    className="editFormButton" 
                    onClick={handleSubmitNew}
                >Crear</button>
            </div>
        </>
    )
}

export default Create;