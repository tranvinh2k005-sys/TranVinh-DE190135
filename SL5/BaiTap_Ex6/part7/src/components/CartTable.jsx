import { Table, ListGroup, Badge, Card, Alert } from 'react-bootstrap';
import { cartItems as defaultCartItems } from '../data/cart';
import { products as defaultProducts } from '../data/products';
import { formatVND } from '../utils/format';

const CartTable = ({ items = defaultCartItems, productList = defaultProducts }) => {
  // 2. Sắp xếp theo thành tiền giảm dần (price * quantity)
  // Giải thích vì sao phải có [...cartItems] trước .sort:
  // - Hàm Array.prototype.sort() trong JavaScript là hàm có tính đột biến (mutating method),
  //   nó sẽ sắp xếp và làm thay đổi trực tiếp mảng ban đầu.
  // - Nếu gọi cartItems.sort(...) trực tiếp, thứ tự của mảng gốc cartItems sẽ bị thay đổi vĩnh viễn.
  // - Sử dụng cú pháp spread [...cartItems] sẽ tạo ra một bản sao nông (shallow copy) của mảng,
  //   sau đó .sort() thực hiện trên mảng sao chép này. Nhờ đó, mảng gốc cartItems vẫn giữ nguyên
  //   thứ tự ban đầu, tuân thủ nguyên tắc bất biến (immutability) trong React.
  const sortedItems = [...items].sort(
    (a, b) => b.price * b.quantity - a.price * a.quantity
  );

  // 5. Tổng tiền: reduce tính tổng thành tiền
  const totalPrice = items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  // Tổng số lượng: reduce tính tổng quantity
  const totalQuantity = items.reduce((sum, { quantity }) => sum + quantity, 0);

  // 6. Đơn giá cao nhất: Math.max kết hợp map và spread operator
  const maxPrice = Math.max(...items.map((item) => item.price));

  // 8. Danh sách giảm giá: Lọc các sản phẩm còn hàng (inStock === true) và có giảm giá (discount > 0)
  const onSale = productList.filter(
    ({ inStock, discount }) => inStock && discount > 0
  );

  return (
    <div>
      {/* Bảng giỏ hàng */}
      <div className="table-responsive mb-4">
        <Table striped bordered hover className="align-middle shadow-sm">
          <thead className="table-dark">
            <tr className="text-center">
              <th style={{ width: '80px' }}>STT</th>
              <th className="text-start">Tên sản phẩm</th>
              <th className="text-end">Đơn giá</th>
              <th className="text-center" style={{ width: '120px' }}>Số lượng</th>
              <th className="text-end">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {/* 3 & 4: map sortedItems với destructuring và STT từ index + 1 */}
            {sortedItems.map(({ id, name, price, quantity }, index) => {
              const itemTotal = price * quantity;
              return (
                <tr key={id}>
                  <td className="text-center fw-bold">{index + 1}</td>
                  <td className="fw-semibold">{name}</td>
                  <td className="text-end">{formatVND(price)}</td>
                  <td className="text-center">{quantity}</td>
                  <td className="text-end fw-bold text-primary">
                    {formatVND(itemTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* 7. Đặt ba số liệu thống kê vào tfoot, dùng colSpan cho ô nhãn */}
          <tfoot className="table-light">
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                Tổng số lượng:
              </td>
              <td className="text-center fw-bold text-success fs-6">
                {totalQuantity}
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Đơn giá cao nhất:
              </td>
              <td className="text-end fw-bold text-info">
                {formatVND(maxPrice)}
              </td>
            </tr>
            <tr className="table-warning">
              <td colSpan={4} className="text-end fw-bold fs-6">
                Tổng tiền:
              </td>
              <td className="text-end fw-bold text-danger fs-6">
                {formatVND(totalPrice)}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>

      {/* 8. Danh sách "Sản phẩm đang giảm giá và còn hàng" */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
          <span>Sản phẩm đang giảm giá và còn hàng</span>
          <Badge bg="light" text="dark" pill>
            {onSale.length} sản phẩm
          </Badge>
        </Card.Header>
        <ListGroup variant="flush">
          {onSale.map(({ id, name, price, discount }) => (
            <ListGroup.Item
              key={id}
              className="d-flex justify-content-between align-items-center py-3"
            >
              <div>
                <span className="fw-semibold text-dark">{name}</span>
                <span className="text-muted ms-2">({formatVND(price)})</span>
              </div>
              <Badge bg="danger" className="px-2 py-1 fs-7">
                -{discount}%
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Giải thích và kiểm tra tính bất biến của mảng gốc cartItems */}
      <Alert variant="info" className="shadow-sm">
        <Alert.Heading className="fs-6 fw-bold">
          💡 Giải thích: Vì sao phải có <code>[...cartItems]</code> trước khi gọi <code>.sort()</code>?
        </Alert.Heading>
        <p className="mb-2">
          Phương thức <code>Array.prototype.sort()</code> trong JavaScript là <strong>hàm làm biến đổi trực tiếp (mutating method)</strong> mảng đang gọi nó.
          Nếu dùng <code>cartItems.sort(...)</code>, thứ tự các phần tử trong mảng gốc <code>cartItems</code> sẽ bị thay đổi, vi phạm tính bất biến (immutability) trong lập trình hàm và React.
        </p>
        <p className="mb-0">
          Cú pháp Spread <code>[...cartItems]</code> giúp tạo ra một <strong>mảng mới (shallow copy)</strong>.
          Khi thực hiện <code>.sort()</code> trên bản sao này, mảng gốc <code>cartItems</code> vẫn giữ nguyên thứ tự ban đầu:
          {' '}<span className="fw-semibold">{items.map((i) => i.name).join(' → ')}</span>.
        </p>
      </Alert>
    </div>
  );
};

export default CartTable;
