/* eslint-disable */ //Lint 끄는 기능

import './App.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
// 1.import 작명 from './이미지경로'
// 2.이미지 경로가 필요한 곳에서 작명한걸 사용
import bg from './img/bg.png';
import { useState } from 'react';
// 리액트는 사이트 발행 전에 html, js, css 파일을 압축함 (bundling)
// (참고) public 폴더에 있던건 압축안됨
// <img src={process.env.PUBLIC_URL + '/logo192.png'}></img>
import data from './data.js';

function App() {

  //import, export 문법
  //1.변수를 export 하고 = export default 변수명, 변수가 2개라면 export default {변수명1, 변수명2}
  //2.import하면 끝 = import 작명 from './data.js', 2개를 가져오려면 import {변수명1, 변수명2} from './data.js'
  //(참고) Component도 export 가능, []=array, {}=object 라서 서로 섞어서 가능하다.
  let [shoes] = useState(data);

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
          {shoes.map(function (a, i) {
            return (
              <Goods shoes={shoes[i]}></Goods>
            )
          }
          )
          }
        </Row>
      </Container>
    </div>
  );
}

function Goods(props) {

  return (
    <Col md={4}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes.id + 1) + '.jpg'} width='80%'></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price} Won</p>
    </Col>
  );
}

export default App;