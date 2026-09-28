import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PizzaCard({ title, image, originalPrice, salePrice, badge, onBuy }) {
  return (
    <Card className="pizza-card h-100 shadow-sm">
      {badge && <div className="pizza-badge">{badge}</div>}
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        className="pizza-card-img"
      />
      <Card.Body className="pizza-card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="pizza-title">{title}</h5>
          <div className="mb-3">
            {originalPrice ? (
              <>
                <span className="price-original">{originalPrice}</span>
                <span className="price-sale">{salePrice}</span>
              </>
            ) : (
              <span className="price-regular">{salePrice}</span>
            )}
          </div>
        </div>
        <Button
          variant="dark"
          className="btn-buy w-100"
          onClick={() => onBuy && onBuy(title)}
        >
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PizzaCard;
