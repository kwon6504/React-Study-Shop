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
import Detail from './routes/Detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

//리액트 페이지 나누는ㄴ 법
//1.컴포넌트 만들어서 상세페이지내용 채움
//2.누가 /detail 접속하면 그 컴포넌트 보여줌
//react-router-dom 라이브러리 쓰면 쉽게 만들 수 있음
//npm install react-router-dom@6 라고 치면 설치!!
//index.js 가서 <BrowserRouter></BrowserRouter>를 <App />밖으로 감싸면 import한다.

function App() {

  //import, export 문법
  //1.변수를 export 하고 = export default 변수명, 변수가 2개라면 export default {변수명1, 변수명2}
  //2.import하면 끝 = import 작명 from './data.js', 2개를 가져오려면 import {변수명1, 변수명2} from './data.js'
  //(참고) Component도 export 가능, []=array, {}=object 라서 서로 섞어서 가능하다.
  let [shoes] = useState(data);
  //1.페이지 이동을 도와주는 useNavigate()
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <Nav.Link href='/'>Home</Nav.Link> */}
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            {/* 같은 Home라도 href로 설정하면 새로고침 후 페이지 이동하지만 useNavigate를 사용하면 새로고침 없이 페이지가 이동한다. */}
            {/* navigate(-1)로 설정하면 방금 전 페이지로 이동(뒤로가기)가 된다. */}
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* Route는 상세 페이지 갯수 */}
        {/* Q.폴더구조? -비슷한 피일끼리 폴더로 묶는게 끝 */}
        <Route path='/' element={
          <>
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
          </>
        }></Route>
        <Route path='/detail' element={
          <Detail></Detail>
        }></Route>
        <Route path='/about' element={<About></About>}>
          {/* Nested Routes 라고 한다. 태그안에 태그 장정으로 
          1. route 작성이 약간 간단해진다.  2.nested routes 접속신엔 element 2개나 보임
          Q. Nested Routes 언제쓰는가?  -여러 유사한 페이지가 필요할 때*/}
          <Route path='member' element={<div>멤버</div>}></Route>
          <Route path='location' element={<div>위치정보</div>}></Route>
        </Route>

        {/* 404페이지 출력하는 법 '*'을 넣으면 지정되지 않은 모든 경로를 뜻한다. */}
        <Route path='*' element={<div>없는페이지입니다.</div>}></Route>

        <Route path='/event' element={<Event></Event>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
      </Routes>

    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
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