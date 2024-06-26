/* eslint-disable */ //Lint 끄는 기능

import './App.css';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
// 1.import 작명 from './이미지경로'
// 2.이미지 경로가 필요한 곳에서 작명한걸 사용
import bg from './img/bg.png';
import { lazy, Suspense, useEffect, useState } from 'react';
// 리액트는 사이트 발행 전에 html, js, css 파일을 압축함 (bundling)
// (참고) public 폴더에 있던건 압축안됨
// <img src={process.env.PUBLIC_URL + '/logo192.png'}></img>

//js 파일을 잘게 쪼개는 lazy import : Detail 컴포넌트가 필요해지면 import 해주세요
//단점으로 로딩이 길어진다. <Suspense>로 감싸면 로딩중 ui넣기 가능이므로 필수로 넣어야 한다. 
//<Suspense>는 일부말고 전체로 감싸도 상관없다
const Detail = lazy(() => import('./routes/Detail.js'))
const Cart = lazy(() => import('./routes/Cart.js'))
import data from './data.js';
// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'; //ajax 이용한 GET요청은 axios.get('url'), 요청결과는 axios.get('url').then()
import { useQuery } from 'react-query';

// export let Context1 = createContext(); state 보관함 Context API 함수

//리액트 페이지 나누는ㄴ 법
//1.컴포넌트 만들어서 상세페이지내용 채움
//2.누가 /detail 접속하면 그 컴포넌트 보여줌
//react-router-dom 라이브러리 쓰면 쉽게 만들 수 있음
//npm install react-router-dom@6 라고 치면 설치!!
//index.js 가서 <BrowserRouter></BrowserRouter>를 <App />밖으로 감싸면 import한다.

function App() {

  useEffect(() => {
    if (localStorage.getItem('watched') == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  //import, export 문법
  //1.변수를 export 하고 = export default 변수명, 변수가 2개라면 export default {변수명1, 변수명2}
  //2.import하면 끝 = import 작명 from './data.js', 2개를 가져오려면 import {변수명1, 변수명2} from './data.js'
  //(참고) Component도 export 가능, []=array, {}=object 라서 서로 섞어서 가능하다.
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let urls = ['https://codingapple1.github.io/shop/data2.json', 'https://codingapple1.github.io/shop/data3.json']
  let fetchData = () => {
    if (count < urls.length) {
      setLoading(true); //로딩시작
      // ajax 쓰려면 옵션 3개 중 택1 1.XMLHttpRequest 2.fetch() 3.axios
      axios.get(urls[count])
        .then((result) => {
          console.log(result.data);
          let copy = [...shoes, ...result.data]; // ...shoes = {},{},{} ...result.data = {},{},{}
          setShoes(copy);
          setCount(count + 1);
          setLoading(false); //로딩종료
        })
        .catch(() => {
          console.log('실패');
        });
    } else {
      console.log('불러올 데이터가 없습니다.')
      alert('불러올 상품이 없습니다.');
    }

    //서버에 요청하는 방법
    // axios.post('/safdfas',{name:'kwon'});
    //동시에 ajax요청 여러개 하면
    // Promise.all([axios.get('/url1'), axios.get('/url2')])
    // .then(()=>{}) 전부 가져오는데 성공하면 그때 then을 실행한다.
    //원래는 서버와 문자만 주고받을 수 있습니다.
    //"{"name":"kim"}" 따옴표쳐놓으면 array,object도 주고받기 가능 문자열로 이행해서 받아온다. 
    //일명 JSON (axios가 json데이터를 받아오면 array,object로 자동으로 바꿔줌)

  };
  //1.페이지 이동을 도와주는 useNavigate()
  let navigate = useNavigate();

  //react-query 이용해서 ajax 요청하면
  //장점1.성공/실패/로딩중 쉽게 파악가능 (result.data, result.isLoading, result.error)
  //장점2.틈만나면 자동으로 재요청(refetch)해줌
  //장점3.실패시 retry 알아서 해줌
  //장점4.state 공유 안해도 됩니다.
  //장점5.ajax 결과 캐싱기능
  let result = useQuery('작명', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청');
      return a.data
    }),
      { staleTime: 2000 } //뭘해도 2초마다는 하지않고 그후에 뭘 할경우 refetch한다
  });

  // 서버나 DB가 없다면 익스폴러로에 저장하는법 localStorage
  // localStorage들어가는 법 F12 -> Application(console라인 끝쪽) -> Local Storage
  // 1.key : value 형태로 저장가능
  // Local Storage : 재접속해도 남아있음
  // Session Storage : 브라우저 끄면 날라감
  // let obj = {name : 'kim'};
  // localStorage.setItem('date', JSON.stringify(obj));
  // let 꺼낸거 = localStorage.getItem('date');
  // console.log(JSON.parse(꺼낸거).name);

  return (
    <div className="App">

      <Navbar bg="light" data-bs-theme="light">
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
            <Nav.Link onClick={() => { navigate('/cart') }}>cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {result.isLoading ? '로딩중' : result.data.name}
            {result.error && '에러'}
            {/* {result.data && result.data.name} */}
          </Nav>
        </Container>
      </Navbar>

      <div className='fixed-right'>나오니</div>

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
                    <Goods key={i} shoes={shoes[i]}></Goods>
                  )
                }
                )
                }
              </Row>
            </Container>
            {loading && <p>로딩중...</p>}
            {count < urls.length && <button onClick={fetchData}>더보기</button>}
          </>
        }></Route>

        {/* 페이지를 여러개 만들고 싶으면 :URL파라미터를 써도 좋다. /:파라미터 
            (참고)URL 파라미터 만들 때  -여러개 가능 ex)'/detail/:id/:a/:b'*/}

        <Route path='/detail/:id' element={
          <Suspense fallback={<div>로딩중임</div>}>
            <Detail shoes={shoes}></Detail>
          </Suspense>
        }>
        </Route>

        <Route path='/cart' element={<Cart />}></Route>

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
  //1.페이지 이동을 도와주는 useNavigate()
  let navigate = useNavigate();

  return (
    <Col md={4}>
      <Nav.Link onClick={() => { navigate('/detail/' + (props.shoes.id)) }}>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes.id + 1) + '.jpg'} width='80%'></img>
      </Nav.Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price} Won</p>
    </Col>
  );
}

export default App;