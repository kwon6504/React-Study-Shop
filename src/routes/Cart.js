/* eslint-disable */ //Lint 끄는 기능
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {

    //Redux 사용하면 컴포넌트들이 props 없이 state 공유가능(React 구인시 대부분 Redux 요구)
    let a = useSelector((state)=>state.user); //Redux store 가져와줌, store에 있던 state 남음
    let b = useSelector((state)=>state.myShoes);

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                {b.map(function (a, i) {
                  return (
                    <tr key={i}>
                        <td>{b[i].id}</td>
                        <td>{b[i].name}</td>
                        <td>{b[i].count}</td>
                        <td>안녕</td>
                    </tr>
                  )
                }
                )
                }
                    
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;