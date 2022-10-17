import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../Providers'

function LogOut(){
    const navigate = useNavigate();
    const [state, setState] = useContext(AppContext);
    useEffect(() => {
        window.localStorage.removeItem("token")
        setState({ ...state, "token" : null})
        navigate('/')
    })
}

export default LogOut;