import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../Providers'
import { format } from "date-fns";

function Edit(){
    const params = useParams();
    const navigate = useNavigate();
    const [state, setState] = useContext(AppContext);
    const contextProviderData = useContext(AppContext);    
    const { token, amount, description, date, idCategory } = contextProviderData[0];    

    console.log("contextProviderData: ", contextProviderData);

    
    const dataToEdit = {
        amount: parseFloat(amount),
        description: description,
        date: date,
        idCategory: parseInt(idCategory)
    }

    const editBudget = async () => {
        await fetch(`${process.env.REACT_APP_API_HOST_LOCAL}/inflow/${params.id}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
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
        navigate('/');
    }

    function editBudgetDataAmount(event) {
        setState({ ...state, "amount" : event.target.value})
    };
    function editBudgetDataDescription(event) {
        setState({ ...state, "description" : event.target.value})
    };
    function editBudgetDataDate(event) {
        setState({ ...state, "date" : event.target.value})
    };

    function editBudgetDataCat(event) {
        setState({ ...state, "idCategory" : event.target.value})
    };

    return(
        <>
            <div className="usuarios">

                <h4 className="LoginFormDescription">Edit item</h4>

                    <label htmlFor="amount" className="editFormInputLabel">Monto</label>
                    <input name="amount" id="amount" type="text" className="EditFormInput" value={amount} onChange={editBudgetDataAmount} />

                    <label htmlFor="description" className="editFormInputLabel">Descripción</label>
                    <input name="description" id="description" type="text" className="EditFormInput" value={description} onChange={editBudgetDataDescription} />

                    <label htmlFor="date" className="editFormInputLabel">Fecha</label>
                    <input name="date" id="date" type="datetime-local" className="EditFormInput" value={format(new Date(date), 'yyyy-MM-dd hh:mm')} onChange={editBudgetDataDate} />
                    
                    <label htmlFor="idCategory" className="editFormInputLabel">Categoria</label>
                    <input name="idCategory" id="idCategory" value={idCategory} type="number" className="EditFormInput" onChange={editBudgetDataCat} />

                <button 
                    className="editFormButton" 
                    onClick={handleSubmitChanges}
                >Guardar cambios</button>
            </div>
        </>
    )
}

export default Edit;