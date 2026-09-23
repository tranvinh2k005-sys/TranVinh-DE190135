import Card from 'react-bootstrap/Card';

const fullName = 'Nguyễn Văn An';
const birthYear = 2005;
const currentYear = new Date().getFullYear();
const major = 'Software Engineering';
const hour = new Date().getHours();

let session = 'sáng';
if (hour >= 12) {
  session = 'chiều';
}
if (hour >= 18) {
  session = 'tối';
}

const greeting = `Chào buổi ${session}, ${fullName}!`;
const age = currentYear - birthYear;
const borderClass = age >= 18 ? 'border-success' : 'border-warning';

function WelcomeCard() {
  return (
    <Card className={`shadow-sm ${borderClass}`} style={{ maxWidth: 400 }}>
      <Card.Header className="fw-bold">Thẻ sinh viên (Bài 1)</Card.Header>
      <Card.Body>
        <Card.Title>{greeting}</Card.Title>
        <Card.Text>
          Tuổi: {`${age} tuổi`}<br />
          Chuyên ngành: {major}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WelcomeCard;
