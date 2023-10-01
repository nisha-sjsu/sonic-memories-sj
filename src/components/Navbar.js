import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../styles/Navbar.css';
import routes from "../utils/routes";

function NavigationBar() {
    return (
        <Navbar className="custom-navbar" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href={routes.map}><b>Sonic Memories in San Jose</b></Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href={routes.viz}><b>3D Visualisation</b></Nav.Link>
                    <Nav.Link href={routes.about}><b>About</b></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;