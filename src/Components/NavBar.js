import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBarold(prop){
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Challenge Fullstack Cliente - Presupuesto</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Ingresos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Egresos</a>
                    </li>
                    <li class="nav-item">
                        {prop.token != null
                            ? <><Link to={`/new-entry`} className="nav-link"> Añadir gastos o ingreso</Link></>
                            : null
                        }  
                    </li>
                </ul>
                <span class="navbar-text">
                    {prop.token != null
                        ? <><Link to={`/log-out`} className="nav-link">Log out </Link></>
                        : <Link to={`/login`} className="nav-link">Log in</Link>
                    }  
                </span>
                </div>
            </div>
        </nav>
       </>
    )
}

function NavBar(prop) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to={`/`} className="nav-link">
            <Navbar.Brand>Challenge Fullstack Presupuesto</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to={`/`} className="nav-link"> Home</Link>
            <Link to={`/`} className="nav-link"> Home</Link>
            {prop.token != null
                ? <><Link to={`/new-entry`} className="nav-link"> Añadir gastos o ingreso</Link></>
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
  );
}

export default NavBar;