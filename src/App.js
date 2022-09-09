import './App.css';
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import PublicRoutes from './config/route/PublicRoutes';
import logo from './spotify-logo.jpg';

const App = ({  }) => {
  return (
    <div className="App">
      <header>
        <img
          id="spotify-logo"
          src={logo}
          alt="Spotify logo"
        />
      </header>
      <Container>
        <Row>
          <PublicRoutes />
        </Row>
      </Container>
      <footer>
        Spotify
      </footer>
    </div>
  );
};

export default App;
