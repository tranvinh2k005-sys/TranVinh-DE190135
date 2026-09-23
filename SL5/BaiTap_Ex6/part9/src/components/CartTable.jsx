import { Table, ListGroup, Badge, Card } from 'react-bootstrap';
import { cartItems as defaultCartItems } from '../data/cart';
import { products as defaultProducts } from '../data/products';

const formatVND = (n) =>
  (n ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const CartTable = ({ items = defaultCartItems, productList = defaultProducts }) => {
  // Sắp xếp theo thành tiền giảm dần (price * quantity)
  const sortedItems = [...items].sort(
    (a, b) => b.price * b.quantity - a.price * a.quantity
  );

  // Tổng tiền: reduce tính tổng thành tiền
  const totalPrice = items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  // Tổng số lượng: reduce tính tổng quantity
  const totalQuantity = items.reduce((sum, { quantity }) => sum + quantity, 0);

  // Đơn giá cao nhất: Math.max kết hợp map và spread operator
  const maxPrice = Math.max(...items.map((item) => item.price));

  // Danh sách giảm giá: Lọc các sản phẩm còn hàng (inStock === true) và có giảm giá (discount > 0)
  const onSale = productList.filter(
    ({ inStock, discount }) => inStock && discount > 0
  );

  return (
    <div className="cart-table-wrapper my-4">
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

      {/* Danh sách "Sản phẩm đang giảm giá và còn hàng" */}
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
    </div>
  );
};

export default CartTable;
