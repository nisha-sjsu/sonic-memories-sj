import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../styles/Navbar.css';
import routes from '../utils/routes';

function NavigationBar({ mycolor }) {
  return (
    <Navbar className="custom-navbar" bg="light" expand="lg" data-bs-theme="light">
      <Container>
        <Navbar.Brand style={{ color: mycolor }} href={routes.map}>
          <b>Sonic Memories in San Jose</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link style={{ color: mycolor }} href={routes.viz}>
              <b>3D Vizualisation</b>
            </Nav.Link>
            <Nav.Link style={{ color: mycolor }} href={routes.about}>
              <b>About</b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
