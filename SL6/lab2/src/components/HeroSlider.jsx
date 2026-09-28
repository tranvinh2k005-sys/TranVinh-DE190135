import Carousel from 'react-bootstrap/Carousel';
import pizza1 from '../assets/pizza/pizza1.jpg';
import pizza2 from '../assets/pizza/pizza2.jpg';
import pizza3 from '../assets/pizza/pizza3.jpg';
import pizza4 from '../assets/pizza/pizza4.jpg';
import pizza5 from '../assets/pizza/pizza5.jpg';

const slidesData = [
  {
    id: 1,
    image: pizza1,
    title: 'Neapolitan Pizza',
    description: 'If you are looking for a traditional Italian pizza,the Neapolitan is the best option!',
  },
  {
    id: 2,
    image: pizza2,
    title: 'Neapolitan Pizza',
    description: 'Crafted with fresh ingredients and baked to golden perfection.',
  },
  {
    id: 3,
    image: pizza3,
    title: 'Neapolitan Pizza',
    description: 'Hot melted cheese, crispy crust, and authentic flavors.',
  },
  {
    id: 4,
    image: pizza4,
    title: 'Neapolitan Pizza',
    description: 'Traditional Italian recipes passed down through generations.',
  },
  {
    id: 5,
    image: pizza5,
    title: 'Neapolitan Pizza',
    description: 'Fresh from our wood-fired oven straight to your plate.',
  },
];

function HeroSlider() {
  return (
    <Carousel fade className="hero-carousel" interval={4000}>
      {slidesData.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100 hero-carousel-img"
            src={slide.image}
            alt={slide.title}
          />
          <Carousel.Caption className="hero-caption">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroSlider;
