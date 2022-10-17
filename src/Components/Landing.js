import { Link, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {AppContext} from './Providers.js';
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useContext, useEffect } from "react";


function Landing() {
    const [state, setState] = useContext(AppContext);
    const contextPorviderData = useContext(AppContext);
    const { token } = contextPorviderData[0];

    useEffect(() => {
        const tokenls = window.localStorage.getItem("token");
        if (tokenls) {
            setState({ ...state, "token" : tokenls})
        }
    },[])

    return (
        <>
            <NavBar token={token} />
            <Footer />    
        </>

    );
}

export default Landing;