import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit(){
    const params = useParams();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [idCategory, setCategory] = useState('');

    const navigate = useNavigate();
    const dataToEdit = {
        amount: parseFloat(amount),
        description: description,
        date: date,
        idCategory: parseInt(idCategory)
    }

    const editBudget = async () => {
        await fetch(`http://localhost:3000/inflow/${params.id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dataToEdit)
        })
            .then(response => {
                console.log(response.json())
            }).then(data=> 
                console.log(data),
            );       
     }

    function handleSubmitChanges(){
        editBudget()
        console.log("Edit values: ", amount, description, date, idCategory );
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

    return(
        <>
            <div className="usuarios">
                <h1>Editar</h1>
                <h4 className="LoginFormDescription">Edit</h4>

                    <label htmlFor="amount" className="editFormInputLabel">Monto</label>
                    <input name="amount" id="amount" type="text" className="EditFormInput" value={amount} onChange={onAmountChange} />

                    <label htmlFor="description" className="editFormInputLabel">Descripción</label>
                    <input name="description" id="description" type="text" className="EditFormInput" value={description} onChange={onDescriptionChange} />

                    <label htmlFor="date" className="editFormInputLabel">Fecha</label>
                    <input name="date" id="date" type="date" className="EditFormInput" value={date} onChange={onDateChange} />

                    <label htmlFor="idCategory" className="editFormInputLabel">Categoria</label>
                    <input name="idCategory" id="idCategory" value={idCategory} type="number" className="EditFormInput" onChange={onCategoryChange} />

                <button 
                    className="editFormButton" 
                    onClick={handleSubmitChanges}
                >Guardar cambios</button>
            </div>
        </>
    )
}

export default Edit;