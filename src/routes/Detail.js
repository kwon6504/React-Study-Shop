/* eslint-disable */ //Lint 끄는 기능

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap"
//styled-components를 사용하면 css에 가지 않고 js파일에서 전부 해결가능
//장점 1.Css파일 안열어도 된다. 2.스타일이 다른 js파일로 오염되지 않는다. 3.페이지 로딩시간 단축
//단점 1.Js파일 매우복잡해짐. 2.중복스타일은 컴포넌트간 import 할텐데 Css와 다를 바가 없어진다. 3.협업시 CSS 담당의 숙련도 이슈
//(참고) 오염방지하려면 컴포넌트.module.css하면된다. 그러면 컴포넌트.js에 종속된다. ex)App.module.css
import styled from "styled-components";

// ${props => props.bg} 문법은 외부 라이브러리 사용법이라 이행보다는 그냥 복붙
// let YellowBtn = styled.button`
//   background : ${props => props.bg};
//   color : ${props => props.bg} == 'blue' ? 'white' : 'black';
//   padding : 10px;
// `

//(참고) 기존 스타일 복사가능
// let NewBtn = styled/button(YellowBtn)'여기 개인적인 스타일 가능'

//컴포넌트의 Lifecycle를 알고 있다면 아래 3가지 중간중간에 간섭 코드실행가능
//페이지에 장착되기도하고(mount), 가끔 업데이트도 되고(update), 필요없으면 제거되고(unmount)

function Detail(props) {

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [num, setNum] = useState('');
  let [tab, setTab] = useState(0);
  let [fade1, setFade1] = useState('');

  //Lifecycle
  //Side Effect : 함수의 핵심기능과 상관없는 부가기능, useEffect는 Side Effect 안에 담는 그릇이다.
  //useEffect는 안에있는 코드가 mount, update시에 실행된다.
  //useEffect 쓰는 이유 = html 렌더링 후에 동작한다.
  //useEffect 안에 적는 코드들은 -어려운 연산 -서버에서 데이터 가져오는 작업 -타이머 장착하는거
  //useEffect 실행조건 넣을 수 있는 곳은 [], []안에 있는 state가 변할때마다 실행, []이 비어있다면 컴포넌트 mount 1번만 실행된다.
  //useEffect 안에 return()=>{}를 넣을 수 있다. useEffect 동작 전에 실행시키고 싶을때 사용.
  useEffect(() => {
    let timer = setTimeout(() => { setAlert(false) }, 2000);
    setTimeout(()=>{setFade1('end')}, 100);
    if (isNaN(num) == true) {
      window.alert('그러지마세요'); //안됬던 이유는 alert가 이미 변수로 있었기 때문이다.
      setNum('');
    }
    return () => {
      // 타이머가 중복되지 않게 기존 타이머를 제거하는 명령어
      // (참고)clean up function은 mount시 실행안됨, unmount시 실행됨
      clearTimeout(timer);
    }
  }, [num])

  //useEffect 정리
  //1.재렌더링마다 코드 실행하고 싶으면 useEffect(()=>{})
  //2.mount시 1회 코드실행하고 싶으면 useEffect(()=>{},[])
  //3.unmount시 1회 코드실행하고 싶으면 useEffect(()=>{return()=>{}}) 
  //4.useEffect 실행 전에 뭔가 실행하려면 언제나 return()=>{}
  //5.특정 state 변경시에만 실행하려면 [state명]

  //실행할 코드가 1000=1초후에 실행한다.
  // setTimeout(()=>{실행할코드}, 1000);

  //유저가 URL파라미터에 입력한 것을 가져오는 useParams()
  let { id } = useParams();
  let findId = props.shoes.find(
    function (x) {
      return x.id == id;
    })

  // id를 정수로 변환하여 유효성 검사 , parseInt()문자열을 정수로 변환해주는 함수.
  // id = parseInt(id);
  // 정수가 아닌 경우 경로가 잘못되었다는 메시지 출력, isNaN()는 NaN (Not a Number)인지를 판별하는 함수.
  //  if (isNaN(id)) {
  //   return <div>경로가 잘못되었습니다.</div>;
  // }

  //undefined는 값이 할당되지 않은 변수, 객체의 존재하지 않는 속성, 함수의 반환값이 명시되지 않은 경우
  //console.log로 찍어보면 자바스크립트에서는 null이 아닌 undefined가 뜬다.
  if (findId == undefined) {
    return <div>경로가 잘못되었습니다.</div>;
  }

  return (
    <div className={'start ' + fade1}>
      <div className="container">
        {
          alert == true ? <Alert></Alert> : null
        }
        {/* <YellowBtn bg='blue'>버튼</YellowBtn>
          <YellowBtn bg='orange'>버튼</YellowBtn> */}
        {count}
        <button onClick={() => { setCount(count + 1) }}>버튼</button>
        <div className="row">
          <div className="col-md-6">
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes[findId.id].id + 1) + '.jpg'} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{props.shoes[findId.id].title}</h4>
            <p>{props.shoes[findId.id].content}</p>
            <p>{props.shoes[findId.id].price} Won</p>
            <button className="btn btn-danger">주문하기</button>
            <br></br>
            {/* 이벤트 객체 e의 타겟 값인 e.target.value를 setNum 함수에 전달하여 num 상태를 업데이트합니다. */}
            <input type="text" value={num} onChange={(e) => setNum(e.target.value)} />
          </div>
        </div>

        <Nav variant="tabs" defaultActiveKey="link0">
          {/* defaultActiveKey="link0"는 처음 사이트 방문시 눌러져있는 버튼 */}
          <Nav.Item>
            <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent tab={tab} />

      </div>
    </div>
  );
}

//(팁1)props가 귀찮다면 (props)=>({tab, props2})로 바꾸면 아래 props.tab가 아닌 tab만으로 표현가능
//(팁2)function TabContent(props){return [ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][props.tab]}
function TabContent({ tab }) {

  let [fade, setFade] = useState('');

  useEffect(()=>{
    //리액트의 automatic batching 기능
    //state 변경마다 하는 것이 아니고 마지막 state에서 재렌더링 하는것
    setTimeout(()=>{setFade('end');},100)

    return ()=>{
      setFade('');
    }
  }, [tab])

  return (<div className={'start ' + fade}>
    {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
  </div>)
}
//전환 애니메이션 만들은
//1.애니메이션 동작 전 className 만들기
//2.애니메이션 동작 후 className 만들기
//3.className에 transition 속성 추가
//4.원할 때 2번 className 부착

// function TabContent(props){
//   if(props.tab === 0){
//     return <div>내용0</div>
//   } 
//   if(props.tab === 1){
//     return <div>내용1</div>
//   } 
//   if(props.tab === 2){
//     return <div>내용2</div>
//   }
// }

function Alert() {

  return (
    <>
      <div className="alert alert-warning">
        2초이내 구매시 할인
      </div>
    </>
  );
}

export default Detail;