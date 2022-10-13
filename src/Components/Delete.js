import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit(){
    const params = useParams();
    const navigate = useNavigate();

    const deleteBudget = async () => {
        await fetch(`http://localhost:3000/inflow/${params.id}`,{
            method: 'DELETE'
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
                <h1>Editar {params.id}</h1>
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