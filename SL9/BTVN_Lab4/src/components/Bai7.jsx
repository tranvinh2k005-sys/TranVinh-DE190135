import { useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { formatVND } from '../utils/format';
import { products } from '../data/products';
import {
  cartReducer,
  initialCart,
  CART_ACTIONS,
  MAX_QUANTITY,
  getCartTotals,
} from '../reducers/cartReducer';
import { ProductCard } from './Bai3';

export const CartSummary = ({ cart, dispatch }) => {
  const { items } = cart;
  const { totalQuantity, totalPrice } = getCartTotals(cart);

  if (items.length === 0) return <Alert variant="info">Giỏ hàng đang trống</Alert>;

  return (
    <>
      <Table bordered hover size="sm" className="align-middle">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th className="text-center">Số lượng</th>
            <th>Thành tiền</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, name, price, quantity }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{formatVND(price)}</td>
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-secondary"
                    onClick={() => dispatch({ type: CART_ACTIONS.DECREASE, payload: id })}
                  >
                    −
                  </Button>
                  <Button variant="light" disabled style={{ minWidth: 36 }}>
                    {quantity}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    disabled={quantity >= MAX_QUANTITY}
                    onClick={() => dispatch({ type: CART_ACTIONS.INCREASE, payload: id })}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td>{formatVND(price * quantity)}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => dispatch({ type: CART_ACTIONS.REMOVE, payload: id })}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="fw-bold">
            <td colSpan={2}>Tổng cộng</td>
            <td className="text-center">{totalQuantity}</td>
            <td colSpan={2}>{formatVND(totalPrice)}</td>
          </tr>
        </tfoot>
      </Table>
      <Button variant="outline-danger" onClick={() => dispatch({ type: CART_ACTIONS.CLEAR })}>
        Xóa toàn bộ giỏ
      </Button>
    </>
  );
};

export const CartDemoPage = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const { totalQuantity } = getCartTotals(cart);

  const handleAddToCart = (product) => dispatch({ type: CART_ACTIONS.ADD, payload: product });

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-4 text-primary fw-bold">
        Bài 7: Giỏ hàng với useReducer
      </h4>
      <Row className="g-4">
        <Col lg={7}>
          <h5 className="mb-3 fw-semibold">Sản phẩm</h5>
          <Row xs={1} sm={2} className="g-3">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={5}>
          <h5 className="mb-3 fw-semibold d-flex align-items-center gap-2">
            <span>Giỏ hàng</span>
            <Badge bg="primary">{totalQuantity}</Badge>
          </h5>
          <CartSummary cart={cart} dispatch={dispatch} />
        </Col>
      </Row>
    </div>
  );
};

export default CartDemoPage;
