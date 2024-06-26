/* eslint-disable */ //Lint 끄는 기능
//Redux 사용이유
//컴포넌트간 state 공유 편해짐(props전송이 필요없어진다.)

import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice';

//Redux의 state 변경하는 법
//-state 수정해주는 함수만들고 -원할 때 그 함수 실행해달라고 store.js에 요청
// 1.state 수정해주는 함수만들기
// 2.만든 함수 export 해야함
// 3.만든 함수 import 해서 사용 그리고 dispatch( state변경함수() ) 이렇게 감싸서 실행하면 state 진짜로 변경됩니다. 
// state가 array/object인 경우 return없이도 직접 수정해도 state 변경됩니다. 그래서 문자하나만 필요해도 일부러 {}안에 담기도 함

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 }
  ],
  reducers : {
    increaseCount(state, action){
      // action.payload에서 상품의 ID를 가져옵니다.
      let goodsId = action.payload;
      // array에서 해당 ID를 가진 상품을 찾습니다.
      let goods = state.find(item => item.id === goodsId);
      goods.count += 1;
    }
  }
})

export let {increaseCount} = cart.actions;

export default configureStore({
  reducer: { // 작명 : state이름.reducer
    user: user.reducer,
    cart : cart.reducer
  }
}) 