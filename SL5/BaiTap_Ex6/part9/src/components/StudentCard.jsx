import { Card, ListGroup, Button } from 'react-bootstrap';

const defaultStudent = {
  id: 'CR7007',
  name: 'Cristiano Ronaldo',
  major: 'Sports Science & Athletics',
  gpa: 9.7,
  avatar: '/image/ronaldo.jpg',
  contact: { email: 'cr7@alnasr.sa', phone: '0907 777 777' },
};

const StudentCard = ({ student = defaultStudent }) => {
  const {
    id,
    name,
    major,
    gpa,
    avatar,
    contact: { email: studentEmail, phone } = {},
  } = student;

  return (
    <Card style={{ width: '18rem' }} className="shadow-sm">
      <Card.Img
        variant="top"
        src={avatar}
        alt={name}
        style={{ height: '260px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {id} - {major}
        </Card.Subtitle>
        <ListGroup variant="flush" className="my-3">
          <ListGroup.Item>
            <strong>GPA:</strong> {gpa}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email:</strong> {studentEmail}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Số điện thoại:</strong> {phone}
          </ListGroup.Item>
        </ListGroup>
        <Button variant="primary">Xem hồ sơ</Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
