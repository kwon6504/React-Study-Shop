/* eslint-disable */ //Lint 끄는 기능

import { useParams } from "react-router-dom";

function Detail(props) {

  //유저가 URL파라미터에 입력한 것을 가져오는 useParams()
  let {id} = useParams();
  let findId = props.shoes.find(
    function(x){
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
          <div className="row">
            <div className="col-md-6">
              <img src={'https://codingapple1.github.io/shop/shoes'+(props.shoes[findId.id].id + 1)+'.jpg'} width="100%" />
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