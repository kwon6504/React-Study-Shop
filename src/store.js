/* eslint-disable */ //Lint 끄는 기능
//Redux 사용이유
//컴포넌트간 state 공유 편해짐(props전송이 필요없어진다.)
import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({ //(state 하나를 slice라고 부름)
  name: 'user', //'state이름'
  initialState: 'kwon' //대충로그인한 유저이름'state값'
})

let stock = createSlice({ //(state 하나를 slice라고 부름)
  name: 'stock', //'state이름'
  initialState: [10, 11, 12] //대충로그인한 유저이름'state값'
})

let myShoes = createSlice({
  name: 'myShoes',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 }
  ]
})

export default configureStore({
  reducer: { // 작명 : state이름.reducer
    user: user.reducer,
    stock: stock.reducer,
    myShoes : myShoes.reducer
  }
}) 