import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

// Component được viết theo dạng Arrow Function có thân { ... return (...) }
// Không thể dùng implicit return (viết trực tiếp () => (...)) ở đây vì cần thực hiện câu lệnh destructuring trước câu lệnh return.
const StudentCard = ({ student }) => {
  // Destructuring các thuộc tính của object student
  // Thực hiện destructuring lồng nhau cho contact và đổi tên email thành studentEmail bằng cú pháp email: studentEmail
  const {
    id,
    name,
    major,
    gpa,
    avatar,
    contact: { email: studentEmail, phone },
  } = student;

  return (
    <Card style={{ width: '18rem' }}>
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
