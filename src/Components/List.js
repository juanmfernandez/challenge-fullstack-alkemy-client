import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {AppContext} from './Providers.js';
import { format } from "date-fns";
import Alert from 'react-bootstrap/Alert';


function List(){
    const [budgets, setBudgets] = useState([]);
    const [totalBudgets, setTotalBudgets] = useState([]);
    const [totalOut, setTotalOut] = useState([]);
    const [totalIn, setTotalIn] = useState([]);
    const [nextPage, setNextPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [state, setState] = useContext(AppContext);

    const getBudgets = () => {
       fetch(`${process.env.REACT_APP_API_HOST_LOCAL}/?page=${pagina}`)
           .then(response => response.json())
           .then(data =>{ 
                setBudgets( data.budgets );
                setTotalBudgets( data.count );
                setTotalOut( data.totalOut );
                setTotalIn( data.totalIn );
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
            {totalBudgets 
                ? 
                    <>            
                        <Alert variant="info">
                            Items totales: {totalBudgets} 
                        </Alert>
                        <Alert variant="success">
                            Ingresos totales: {totalIn} 
                        </Alert>
                        <Alert variant="warning">
                            Egresos totales: {totalOut} 
                        </Alert>
                    </> 
                : 
                    <>            
                        <Alert variant="danger">Ha ocurrido un error</Alert>
                    </>
            }

                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th className="" scope="col">Fecha</th>
                                <th className="" scope="col">Monto</th>
                                <th className="text-center" scope="col">Descripcion</th>
                                <th className="" scope="col">Tipo</th>
                                <th className="" scope="col">Editar</th>
                                <th className="" scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>                        
                            {
                                budgets.map((budget, i) => {
                                    return(
                                        <tr key={i}>
                                            <td>{format(new Date(budget.date), 'yyyy-MM-dd hh:mm')}</td>                                            
                                            <td>{budget.amount}</td>
                                            <td>{budget.description}</td>
                                            <td>{budget.type}</td>
                                            <td>
                                                <Link to={`/edit/${budget.id}`} onClick={ () => editBudgetData(budget) }>
                                                    <button type="button" className="btn btn-warning">Editar</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/delete/${budget.id}`}>
                                                    <button type="button" className="btn btn-danger">Eliminar</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }                        
                        </tbody>
                    </table>
                </div>         
 
                <div className="next-prev">
                    {prevPage > -1 && prevPage < totalPages &&
                        <button type="button" onClick={  restPage } className="btn btn-outline-info">Prev</button>
                    }
                    <p> Página {pagina+1} de {Math.ceil(totalBudgets/10)} </p>
                    {nextPage && pagina < totalPages && nextPage < totalPages &&
                        <button type="button" onClick={  addPage } className="btn btn-outline-info">Next</button>
                    }                    
                </div>                
            </div>
            
        </>
    )
}

export default List;