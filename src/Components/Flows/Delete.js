import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../Providers';

function Edit(){
    const params = useParams();
    const navigate = useNavigate();
    const contextProviderData = useContext(AppContext);    
    const { token } = contextProviderData[0]; 


    const deleteBudget = async () => {
        await fetch(`http://localhost:3000/inflow/${params.id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                console.log(response.json())
            }).then(data=> 
                console.log(data),
            );       
     }

    function handleConfirmDelete(){
        deleteBudget()
        navigate('/');
    }

    return(
        <>
            <div className="usuarios">
                <h1>Eliminar {params.id}</h1>
                <p>¿Está seguro que desea eliminar este item?</p>
                <button 
                    className="editFormButton" 
                    onClick={handleConfirmDelete}
                >Confirmar</button>
            </div>
        </>
    )
}

export default Edit;