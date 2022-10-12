import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function List(){
    const [budgets, setBudgets] = useState([]);
    const [totalBudgets, setTotalBudgets] = useState([]);
    const [nextPage, setNextPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pagina, setPagina] = useState(0);

    const getBudgets = () => {
    //fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pagina*20}&limit=20`)
       fetch(`http://localhost:3000/?page=${pagina}`)
           .then(response => response.json())
           .then(data =>{ 
                setBudgets( data.budgets );
                setTotalBudgets( data.count );
                setTotalPages( data.totalPages );
                setNextPage( data.nextPage );
                setPrevPage( data.prevPage );
                console.log("Api call")
           })
           .catch(e => console.log("Error: " + e))        
    }

    useEffect(() => {
        getBudgets();
        console.log("Api call use effect")
    },[pagina])

    useEffect(() => {
        return () => console.log("Api unmount")
    },[])

    const addPage = () => {
        totalPages > 1 ? setPagina(pagina + 1) : setPagina(pagina)
    }
    const restPage = () => {
        setPagina(pagina - 1)
    }

    return(
        <>
            <div className="usuarios">
                {totalBudgets ? <><h2>Items: {totalBudgets} </h2></> : <><p> No se pudieron obtener datos. </p></>}            
                <div className="next-prev">
                    {prevPage > -1 && prevPage < totalPages &&
                        <button onClick={ restPage }> Prev </button>
                    }
                    <p> Página {pagina+1} de {Math.ceil(totalBudgets/10)} </p>
                    {nextPage && pagina < totalPages && nextPage < totalPages &&
                        <button onClick={  addPage }> Next </button>
                    }                    
                </div>
                <div className="container-responsive">
                    {
                        budgets.map((budget, i) => {
                            return(
                                <>
                                    <div className="budget">
                                        <div className="card">                                                    
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item"> 
                                                #{budget.id} 
                                                | {budget.description} 
                                                | {budget.amount} 
                                                | {budget.date} 
                                                | {budget.type}
                                                | <Link to={`/edit/${budget.id}`}>Editar</Link> 
                                                | <Link to={`/delete/${budget.id}`}>Eliminar</Link>
                                                </li> 
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }                 
                </div>
            </div>     
        </>
    )
}

export default List;