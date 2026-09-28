import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    comment: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        service: '',
        comment: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="booking-section">
      <Container>
        <h2 className="booking-title">Book Your Table</h2>

        {submitted && (
          <Alert
            variant="success"
            className="custom-alert mb-4 mx-auto text-center"
            style={{ maxWidth: '800px' }}
          >
            Thank you, {formData.name || 'valued customer'}! Your booking request
            has been received. We will contact you shortly.
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="booking-form">
          <Row className="mb-3">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Your Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Form.Control
                type="email"
                placeholder="Your Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a Service</option>
                <option value="dine-in">Dine In</option>
                <option value="take-away">Take Away</option>
                <option value="delivery">Home Delivery</option>
                <option value="event">Private Event</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Please write your comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="text-start">
            <Button type="submit" className="btn-send-message">
              Send Message
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
}

export default BookingSection;
