/* eslint-disable */ //Lint 끄는 기능
//Redux 사용이유
//컴포넌트간 state 공유 편해짐(props전송이 필요없어진다.)

import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice';
import { useState } from 'react';

//Redux의 state 변경하는 법
//-state 수정해주는 함수만들고 -원할 때 그 함수 실행해달라고 store.js에 요청
// 1.state 수정해주는 함수만들기
// 2.만든 함수 export 해야함
// 3.만든 함수 import 해서 사용 그리고 dispatch( state변경함수() ) 이렇게 감싸서 실행하면 state 진짜로 변경됩니다. 
// state가 array/object인 경우 return없이도 직접 수정해도 state 변경됩니다. 그래서 문자하나만 필요해도 일부러 {}안에 담기도 함

let cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addCount(state, action) {
      // action.payload에서 상품의 ID를 가져옵니다.
      let goodsId = action.payload;
      // array에서 해당 ID를 가진 상품을 찾습니다.
      let goods = state.find(item => item.id === goodsId);
      goods.count += 1;
      // 코딩애플 방식
      // let 번호 = state.findIndex((a)=>{ return a.id === action.payload })
      // state[번호].count++
    },

    minusCount(state, action) {
      let goodsId = action.payload;
      let goods = state.find(item => item.id === goodsId);
      if(goods.count > 1){
      goods.count -= 1;
      }
    },

    addGoods(state, action) {
      let goodsId = action.payload;
      // 중복 체크: state 배열에 이미 같은 id를 가진 상품이 있는지 확인
      let check = state.find(item => item.id === goodsId.id)
      if (!check) {
        // 중복되지 않는 경우에만 상품 추가
        state.push(goodsId);
      } else {
        //이미 존재한다면 수량 추가
        check.count += 1;
      }
    },

    deleteGoods(state, action) {
      state.splice(action.payload, 1);
    }
  }
})

export let { addCount, minusCount, addGoods, deleteGoods } = cart.actions;

export default configureStore({
  reducer: { // 작명 : state이름.reducer
    user: user.reducer,
    cart: cart.reducer
  }
}) 