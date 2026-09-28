import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PizzaCard from './PizzaCard';
import menu1 from '../assets/pizza/menu1.jpg';
import menu2 from '../assets/pizza/menu2.jpg';
import menu3 from '../assets/pizza/menu3.jpg';
import menu4 from '../assets/pizza/menu4.jpg';

const menuItems = [
  {
    id: 1,
    title: 'Margherita Pizza',
    image: menu1,
    originalPrice: '$40.00',
    salePrice: '$24.00',
    badge: 'SALE',
  },
  {
    id: 2,
    title: 'Mushroom Pizza',
    image: menu2,
    originalPrice: null,
    salePrice: '$25.00',
    badge: null,
  },
  {
    id: 3,
    title: 'Hawaiian Pizza',
    image: menu3,
    originalPrice: null,
    salePrice: '$30.00',
    badge: 'NEW',
  },
  {
    id: 4,
    title: 'Pesto Pizza',
    image: menu4,
    originalPrice: '$50.00',
    salePrice: '$30.00',
    badge: 'SALE',
  },
];

function MenuSection({ onBuyItem, filterQuery = '' }) {
  const filteredItems = menuItems.filter((item) =>
    item.title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section id="menu" className="py-5">
      <Container>
        <h2 className="section-title fs-2 mb-4">Our Menu</h2>
        {filteredItems.length === 0 ? (
          <p className="text-light">No pizzas match your search.</p>
        ) : (
          <Row>
            {filteredItems.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={3} className="mb-4">
                <PizzaCard
                  title={item.title}
                  image={item.image}
                  originalPrice={item.originalPrice}
                  salePrice={item.salePrice}
                  badge={item.badge}
                  onBuy={onBuyItem}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}

export default MenuSection;
