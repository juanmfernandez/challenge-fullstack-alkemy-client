import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from './Providers'

export const ProtectedRoutes = ({ children, redirecTo = "/login" }) => {
    const contextProviderData = useContext(AppContext);    
    let { token } = contextProviderData[0];      
    if(!token){
        return <Navigate to={redirecTo} />
    }
    return children ? children: <Outlet />
}