import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit(){
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [idCategory, setCategory] = useState('');
    const [idUser, setIdUser] = useState('');
    
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
                <h1>Add</h1>
                <h4 className="LoginFormDescription">Agregar Items</h4>

                    <label htmlFor="amount" className="editFormInputLabel">Monto</label>
                    <input name="amount" id="amount" type="text" className="EditFormInput" value={amount} onChange={onAmountChange} />

                    <label htmlFor="description" className="editFormInputLabel">Descripción</label>
                    <input name="description" id="description" type="text" className="EditFormInput" value={description} onChange={onDescriptionChange} />

                    <label htmlFor="date" className="editFormInputLabel">Fecha</label>
                    <input name="date" id="date" type="date" className="EditFormInput" value={date} onChange={onDateChange} />

                    <label htmlFor="idCategory" className="editFormInputLabel">Categoria</label>
                    <input name="idCategory" id="idCategory" value={idCategory} type="number" className="EditFormInput" onChange={onCategoryChange} />

                    <label htmlFor="type" className="editFormInputLabel">type</label>
                    <input name="type" id="type" value={type} type="text" className="EditFormInput" onChange={onTypeChange} />

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

export default Edit;