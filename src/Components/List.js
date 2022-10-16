import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {AppContext} from './Providers.js';
import "./css/list.css";

function List(){
    const [budgets, setBudgets] = useState([]);
    const [totalBudgets, setTotalBudgets] = useState([]);
    const [nextPage, setNextPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [state, setState] = useContext(AppContext);
    const contextPorviderData = useContext(AppContext);
    const { token } = contextPorviderData[0];
    
    const getBudgets = () => {
       fetch(`http://localhost:3000/?page=${pagina}`)
           .then(response => response.json())
           .then(data =>{ 
                setBudgets( data.budgets );
                setTotalBudgets( data.count );
                setTotalPages( data.totalPages );
                setNextPage( data.nextPage );
                setPrevPage( data.prevPage );
           })
           .catch(e => console.log("Error: " + e))        
    }

    useEffect(() => {
        getBudgets();
    },[pagina])
    
    useEffect(() => {
        const tokenls = window.localStorage.getItem("token");
        if (tokenls) {
            setState({ ...state, "token" : tokenls})
        }
    },[])

    useEffect(() => {
        const tokenls = window.localStorage.getItem("token");
        if (tokenls) {
            setState({ ...state, "token" : tokenls})
        }
    },[])

    const addPage = () => {
        totalPages > 1 ? setPagina(pagina + 1) : setPagina(pagina)
    }
    const restPage = () => {
        setPagina(pagina - 1)
    }

    const editBudgetData = (budget) => {
        setState({ ...state, "description" : budget.description, "amount" : budget.amount, "date" : budget.date, "idCategory" : budget.Category.id});
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
                {token != null
                    ? <><Link to={`/log-out`}>Log out </Link><Link to={`/new-entry`}> Add flow</Link></>
                    : <Link to={`/login`}>Log in</Link>
                }                
                <div className="container-responsive">                
                    <ul className="card-list">
                    {
                        budgets.map((budget, i) => {
                            return(
                                <div key={i}>
                                    <div className="budget">
                                        <div className="card">                                                    
                                            <div className="list-group list-group-flush">
                                                <li className="list-group-item"> 
                                                #{budget.id} 
                                                | {budget.description} 
                                                | {budget.amount} 
                                                | {budget.date} 
                                                | {budget.type}
                                                | <Link to={`/edit/${budget.id}`} onClick={ () => editBudgetData(budget) }>Editar</Link> 
                                                | <Link to={`/delete/${budget.id}`}>Eliminar</Link>
                                                </li> 
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                            )
                        })
                    }
                    </ul>   
                                  
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default List;