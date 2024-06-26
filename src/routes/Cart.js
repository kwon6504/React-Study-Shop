/* eslint-disable */ //Lint 끄는 기능
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { addCount, minusCount, deleteGoods } from './../store.js';
import { memo, useState } from 'react';


//자식 컴포넌트 재렌더링 막기
//꼭 필요할 때만 재렌더링하려면 memo
//memo의 원리 : props가 변할 때만 재렌더링 한다.
let Child = memo( function(){
    console.log('재렌더링됨');
    return <div>자식임</div>
})
//useMemo : 컴포넌트 렌더링시 1회만 실행해준다, function 함수(){}가 10억번을 돌려야한다고 치면
//let result = useMemo(()=>{ return 함수() }) 이렇게 만들면 렉을 줄일수 있다. (팁) useEffect와 비슷하다.

function Cart() {
    //Redux 사용하면 컴포넌트들이 props 없이 state 공유가능(React 구인시 대부분 Redux 요구)
    let a = useSelector((state) => state.user); //Redux store 가져와줌, store에 있던 state 남음
    let dispatch = useDispatch(); //store.js로 요청보내주는 함수
    let cart = useSelector((state) => state.cart);
    let [count,setCount] = useState(0);

    return (
        <div>
            {/* <Child count={count}></Child>
            <button onClick={()=>{ setCount(count+1) }}>+</button> */}
            <h4>나이 {a.age}인 {a.name}의 장바구니</h4>
            <button onClick={()=>{
                dispatch(changeName());
                dispatch(increase(1));
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((a, i) =>
                            <tr key={i}>
                                <td>{cart[i].id}</td>
                                <td>{cart[i].name}</td>
                                <td>{cart[i].count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(addCount(cart[i].id))
                                    }}>+</button>
                                    <button onClick={()=>{
                                        dispatch(minusCount(cart[i].id))
                                    }}>-</button>
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(deleteGoods(cart[i].id))
                                    }}>삭제</button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default Cart;