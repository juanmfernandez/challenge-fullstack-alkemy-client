import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from './Providers'

export const ProtectedRoutes = ({ children, redirecTo = "/login" }) => {
    const location = useLocation()
    const contextProviderData = useContext(AppContext);    
    let { token } = contextProviderData[0];      
    if(!token){
        return <Navigate to={redirecTo} replace state={{ from: location }}/>
    }
    return children ? children: <Outlet />
}