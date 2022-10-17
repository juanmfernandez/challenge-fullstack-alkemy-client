import { Link, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(prop) {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Link to={`/`} className="nav-link">
                <Navbar.Brand>Challenge Fullstack Presupuesto</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Link to={`/ingresos`} className="nav-link"> Ingresos </Link>
                <Link to={`/gastos`} className="nav-link"> Gastos </Link>
                {prop.token != null
                    ? <><Link to={`/new-entry`} className="nav-link"> Añadir gastos o ingresos</Link></>
                    : null
                } 
            </Nav>
            <Nav>
                    {prop.token != null
                        ? <><Link to={`/log-out`} className="nav-link">Log out </Link></>
                        : <Link to={`/login`} className="nav-link">Log in</Link>
                    }  
            </Nav>

            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Outlet />
    </div>


  );
}

export default NavBar;