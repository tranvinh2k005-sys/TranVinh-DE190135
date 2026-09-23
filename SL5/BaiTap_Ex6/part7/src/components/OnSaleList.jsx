import { Card, ListGroup, Badge } from 'react-bootstrap';
import { products as defaultProducts } from '../data/products';
import { formatVND } from '../utils/format';

const OnSaleList = ({ products = defaultProducts }) => {
  // Lọc sản phẩm đang giảm giá và còn hàng
  const onSale = products.filter(
    ({ inStock, discount }) => inStock && discount > 0
  );

  return (
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
  );
};

export default OnSaleList;
