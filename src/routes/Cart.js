import { Table } from 'react-bootstrap';

function Cart() {

    //Redux 사용하면 컴포넌트들이 props 없이 state 공유가능(React 구인시 대부분 Redux 요구)
    
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
                    <tr>
                        <td>1</td>
                        <td>안녕</td>
                        <td>안녕</td>
                        <td>안녕</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;