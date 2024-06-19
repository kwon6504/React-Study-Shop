/* eslint-disable */ //Lint 끄는 기능

import { useParams } from "react-router-dom";
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

function Detail(props) {

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
    <>
      <div className="container">
          {/* <YellowBtn bg='blue'>버튼</YellowBtn>
          <YellowBtn bg='orange'>버튼</YellowBtn> */}
        <div className="row">
          <div className="col-md-6">
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes[findId.id].id + 1) + '.jpg'} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{props.shoes[findId.id].title}</h4>
            <p>{props.shoes[findId.id].content}</p>
            <p>{props.shoes[findId.id].price} Won</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;