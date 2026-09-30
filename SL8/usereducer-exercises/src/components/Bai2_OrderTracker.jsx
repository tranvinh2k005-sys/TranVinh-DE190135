import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

// Máy trạng thái: mỗi trạng thái cho phép những sự kiện nào, đi tới đâu
const TRANSITIONS = {
  pending:   { CONFIRM: 'confirmed', CANCEL: 'cancelled' },
  confirmed: { SHIP: 'shipping', CANCEL: 'cancelled' },
  shipping:  { DELIVER: 'delivered' },
  delivered: {},
  cancelled: {},
};

const STATUS_INFO = {
  pending:   { label: 'Chờ xác nhận', bg: 'secondary' },
  confirmed: { label: 'Đã xác nhận', bg: 'primary' },
  shipping:  { label: 'Đang giao', bg: 'warning' },
  delivered: { label: 'Đã giao', bg: 'success' },
  cancelled: { label: 'Đã hủy', bg: 'danger' },
};

const EVENT_LABELS = { CONFIRM: 'Xác nhận', SHIP: 'Giao hàng', DELIVER: 'Đã nhận hàng', CANCEL: 'Hủy đơn' };

const initialState = {
  status: 'pending',
  cancelReason: '',
  error: '',
  timeline: [{ status: 'pending', at: '08:00' }],
};

const orderReducer = (state, action) => {
  if (action.type === 'SET_REASON') {
    return { ...state, cancelReason: action.payload, error: '' };
  }
  if (action.type === 'RESET') return initialState;

  const nextStatus = TRANSITIONS[state.status][action.type];
  if (!nextStatus) {
    // Sự kiện không hợp lệ ở trạng thái hiện tại: giữ nguyên trạng thái, ghi lỗi
    return { ...state, error: `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"` };
  }
  if (action.type === 'CANCEL' && state.cancelReason.trim().length < 5) {
    return { ...state, error: 'Nhập lý do hủy (ít nhất 5 ký tự)' };
  }
  return {
    ...state,
    status: nextStatus,
    error: '',
    timeline: [...state.timeline, { status: nextStatus, at: action.at }],
  };
};

const now = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

const Bai2_OrderTracker = () => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { status, cancelReason, error, timeline } = state;
  const allowedEvents = Object.keys(TRANSITIONS[status]); // dẫn xuất từ trạng thái
  const isFinal = allowedEvents.length === 0;

  return (
    <Card style={{ maxWidth: 520 }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">Bài 2: Đơn hàng #DH1024</span>
          <Badge bg={STATUS_INFO[status].bg}>{STATUS_INFO[status].label}</Badge>
        </Card.Title>

        {error && <Alert variant="danger" className="py-2 my-2">{error}</Alert>}

        {allowedEvents.includes('CANCEL') && (
          <Form.Control
            className="mb-2 mt-2"
            placeholder="Lý do hủy (bắt buộc khi hủy)"
            value={cancelReason}
            onChange={(e) => dispatch({ type: 'SET_REASON', payload: e.target.value })}
          />
        )}

        <div className="d-flex flex-wrap gap-2 my-3">
          {Object.keys(EVENT_LABELS).map((event) => (
            <Button
              key={event}
              size="sm"
              variant={event === 'CANCEL' ? 'outline-danger' : 'outline-primary'}
              disabled={!allowedEvents.includes(event)}
              // Thời gian lấy ở hàm xử lý rồi đưa vào action, reducer không gọi Date
              onClick={() => dispatch({ type: event, at: now() })}
            >
              {EVENT_LABELS[event]}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => dispatch({ type: 'SHIP', at: now() })}
          >
            Thử gửi SHIP
          </Button>
        </div>

        <h6>Dòng thời gian (Timeline)</h6>
        <ListGroup variant="flush">
          {timeline.map(({ status: s, at }, i) => (
            <ListGroup.Item key={`${s}-${i}`} className="px-0 py-2 d-flex justify-content-between align-items-center">
              <div>
                <Badge bg={STATUS_INFO[s].bg} className="me-2">{STATUS_INFO[s].label}</Badge>
              </div>
              <small className="text-muted">{at}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isFinal && (
          <Button className="mt-3 w-100" variant="success" size="sm" onClick={() => dispatch({ type: 'RESET' })}>
            Tạo đơn mới
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Bai2_OrderTracker;
