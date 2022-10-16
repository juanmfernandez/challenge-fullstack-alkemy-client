import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {AppContext} from './Providers.js';
import { format } from "date-fns";
//import "./css/list.css";

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
       fetch(`${process.env.REACT_APP_API_HOST_LOCAL}/?page=${pagina}`)
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
            <div className="usuarios justify-content-center">  
                {token != null
                    ? <><Link to={`/log-out`}>Log out </Link><Link to={`/new-entry`}> Add flow</Link></>
                    : <Link to={`/login`}>Log in</Link>
                }   
                <div className="table-responsive">
                    {totalBudgets ? <><h4>Items: {totalBudgets} </h4></> : <><p> No se pudieron obtener datos. </p></>}
                    
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th className="text-center" scope="col">Fecha</th>
                                <th className="text-center" scope="col">Monto</th>
                                <th className="text-center" scope="col">Descripcion</th>
                                <th className="text-center" scope="col">Tipo</th>
                                <th className="text-center" scope="col">Editar</th>
                                <th className="text-center" scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>                        
                            {
                                budgets.map((budget, i) => {
                                    return(
                                        <tr>
                                            <td>{format(new Date(budget.date), 'yyyy-MM-dd hh:mm')}</td>                                            
                                            <td>{budget.amount}</td>
                                            <td>{budget.description}</td>
                                            <td>{budget.type}</td>
                                            <td><Link to={`/edit/${budget.id}`} onClick={ () => editBudgetData(budget) }>Editar</Link></td>
                                            <td><Link to={`/delete/${budget.id}`}>Eliminar</Link></td>
                                        </tr>
                                    )
                                })
                            }                        
                        </tbody>
                    </table>
                </div>             
                <div className="next-prev">
                    {prevPage > -1 && prevPage < totalPages &&
                        <button onClick={ restPage }> Prev </button>
                    }
                    <p> Página {pagina+1} de {Math.ceil(totalBudgets/10)} </p>
                    {nextPage && pagina < totalPages && nextPage < totalPages &&
                        <button onClick={  addPage }> Next </button>
                    }                    
                </div>                
            </div>
            <Outlet />
        </>
    )
}

export default List;