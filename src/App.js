/* eslint-disable */ //Lint 끄는 기능

import './App.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
// 1.import 작명 from './이미지경로'
// 2.이미지 경로가 필요한 곳에서 작명한걸 사용
import bg from './img/bg.png';
// 리액트는 사이트 발행 전에 html, js, css 파일을 압축함 (bundling)
// (참고) public 폴더에 있던건 압축안됨
// <img src={process.env.PUBLIC_URL + '/logo192.png'}></img>

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' style={{ backgroundImage: 'url(' + bg + ')' }}></div>

      <Container>
        <Row>
          <Col>
            <img src='https://codingapple1.github.io/shop/shoes1.jpg' width='80%'></img>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col>
            <img src='https://codingapple1.github.io/shop/shoes2.jpg' width='80%'></img>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col>
            <img src='https://codingapple1.github.io/shop/shoes3.jpg' width='80%'></img>
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;