import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { cartItems } from '../data/cart';
import { formatVND } from '../utils/format';

// ==========================================
// PHẦN 1: BỘ CHỌN SỐ LƯỢNG (QuantityPicker)
// ==========================================
export const QuantityPicker = ({ min = 1, max = 10 }) => {
  const [quantity, setQuantity] = useState(min);

  const decrease = () => setQuantity((q) => Math.max(q - 1, min));
  const increase = () => setQuantity((q) => Math.min(q + 1, max));

  // Sai: 3 lần đều đọc cùng một giá trị quantity cũ → chỉ tăng 1
  const addThreeWrong = () => {
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
  };

  // Đúng: functional update, mỗi lần nhận giá trị mới nhất
  const addThree = () => {
    increase();
    increase();
    increase();
  };

  return (
    <div className="d-flex align-items-center gap-3 flex-wrap">
      <ButtonGroup>
        <Button
          variant="outline-secondary"
          onClick={decrease}
          disabled={quantity <= min}
        >
          −
        </Button>
        <Button variant="light" disabled style={{ minWidth: 56 }}>
          {quantity}
        </Button>
        <Button
          variant="outline-secondary"
          onClick={increase}
          disabled={quantity >= max}
        >
          +
        </Button>
      </ButtonGroup>
      <Button size="sm" variant="outline-danger" onClick={addThreeWrong}>
        +3 (sai)
      </Button>
      <Button size="sm" variant="outline-success" onClick={addThree}>
        +3 (đúng)
      </Button>
      <Button size="sm" variant="link" onClick={() => setQuantity(min)}>
        Đặt lại
      </Button>
      {quantity === max && (
        <small className="text-danger">Tối đa {max} sản phẩm</small>
      )}
    </div>
  );
};

// ==========================================
// PHẦN 2: GIỎ HÀNG MINI (MiniCart)
// ==========================================
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

export const MiniCart = () => {
  // State là một MẢNG object: mỗi phần tử là một dòng giỏ hàng
  const [items, setItems] = useState(cartItems);

  // delta = +1 (tăng) hoặc -1 (giảm); kẹp số lượng trong khoảng 1..10
  const changeQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                Math.max(MIN_QUANTITY, item.quantity + delta)
              ),
            }
          : item
      )
    );
  };

  // Dữ liệu dẫn xuất: tính lại mỗi lần render, không lưu vào state
  const totalQuantity = items.reduce((sum, { quantity }) => sum + quantity, 0);
  const totalPrice = items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  return (
    <Table bordered hover className="align-middle">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Đơn giá</th>
          <th className="text-center">Số lượng</th>
          <th className="text-end">Thành tiền</th>
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
                  aria-label={`Giảm ${name}`}
                  disabled={quantity <= MIN_QUANTITY}
                  onClick={() => changeQuantity(id, -1)}
                >
                  −
                </Button>
                <Button variant="light" disabled style={{ minWidth: 44 }}>
                  {quantity}
                </Button>
                <Button
                  variant="outline-secondary"
                  aria-label={`Tăng ${name}`}
                  disabled={quantity >= MAX_QUANTITY}
                  onClick={() => changeQuantity(id, 1)}
                >
                  +
                </Button>
              </ButtonGroup>
            </td>
            <td className="text-end">{formatVND(price * quantity)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="fw-bold">
          <td colSpan={2}>Tổng cộng</td>
          <td className="text-center">{totalQuantity}</td>
          <td className="text-end">{formatVND(totalPrice)}</td>
        </tr>
      </tfoot>
    </Table>
  );
};

// ==========================================
// COMPONENT TỔNG HỢP BÀI 1
// ==========================================
const Bai1 = () => {
  return (
    <div>
      <h5 className="mb-3">Phần 1. Bộ chọn số lượng</h5>
      <div className="d-flex flex-column gap-3 mb-4">
        <QuantityPicker />
        <QuantityPicker min={2} max={5} />
      </div>

      <h5 className="mb-3">Phần 2. Giỏ hàng mini</h5>
      <MiniCart />
    </div>
  );
};

export default Bai1;
