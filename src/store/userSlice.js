import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({ //(state 하나를 slice라고 부름)
    name: 'user', //'state이름'
    initialState: {name : 'kwon', age : 20 } , //대충로그인한 유저이름'state값'
    reducers : {
      changeName(state){ 
        state.name = 'park';
      },
  
      increase(state, action){ //state 변경함수에 파라미터 뚫는 법 a.payload를 넣음으로써 입력한 숫자값만큼 오른다
        state.age += action.payload; //state 변경함수를 action이라고 합니다.
      }
    }
  })

  export let {changeName, increase} = user.actions;//actions => state 변경함수들, 오른쪽 자료를 변수로 빼는 문법일 뿐

  export default user;