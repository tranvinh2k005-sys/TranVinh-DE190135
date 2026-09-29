import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './5_QuizApp.css';

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Hook nào dùng để lưu trạng thái cục bộ?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    answer: 1,
  },
  {
    id: 'q2',
    text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?',
    options: ['1', '2', '3', '0'],
    answer: 0,
  },
  {
    id: 'q3',
    text: 'Cách đúng để thêm phần tử vào mảng state?',
    options: [
      'list.push(x)',
      'setList(list.push(x))',
      'setList([...list, x])',
      'list[list.length] = x',
    ],
    answer: 2,
  },
  {
    id: 'q4',
    text: 'Checkbox có điều khiển dùng prop nào?',
    options: ['value', 'checked', 'selected', 'defaultValue'],
    answer: 1,
  },
];

// 1. Hàm xáo trộn mảng Fisher–Yates trên bản sao mảng
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 2. Component Quiz nhận onRestart từ cha
function Quiz({ onRestart }) {
  // Lazy initializer: chỉ chạy hàm shuffle() đúng một lần khi mount
  const [questions] = useState(() => shuffle(QUESTIONS));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // 4. Dữ liệu dẫn xuất (Derived State)
  const current = questions[index];
  const selected = answers[current.id]; // Lưu ý: kiểm tra selected !== undefined (vì 0 là falsy)
  const answeredCount = Object.keys(answers).length;
  const isLast = index === questions.length - 1;
  const isAllAnswered = answeredCount === questions.length;
  const score = questions.filter((q) => answers[q.id] === q.answer).length;

  // 5. Chọn đáp án: computed property
  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: optionIndex,
    }));
  };

  // 7. Khi finished là true, trả về màn hình kết quả
  if (finished) {
    return (
      <div className="result-container">
        <div className="result-score-banner">
          <div
            className={`result-score-title ${
              score === questions.length
                ? 'result-score-perfect'
                : score >= 2
                ? 'result-score-good'
                : 'result-score-low'
            }`}
          >
            Bạn đúng {score}/{questions.length} câu
          </div>
          <p className="text-secondary mb-0">
            {score === questions.length
              ? '🎉 Xuất sắc! Bạn đã nắm vững toàn bộ kiến thức useState.'
              : 'Hãy xem lại các câu trả lời bên dưới và thử sức lại nhé!'}
          </p>
        </div>

        {/* Danh sách từng câu hỏi và đáp án chi tiết */}
        <div className="review-answers-list">
          {questions.map((q, i) => {
            const userChoice = answers[q.id];
            const isCorrect = userChoice === q.answer;

            return (
              <div
                key={q.id}
                className={`review-answer-item ${
                  isCorrect ? 'correct' : 'incorrect'
                }`}
              >
                <div className="review-q-text">
                  Câu {i + 1}: {q.text}
                </div>
                <div className="review-details">
                  <div className="review-ans-row">
                    <span>Bạn chọn:</span>
                    <span
                      className={isCorrect ? 'badge-correct' : 'badge-incorrect'}
                    >
                      {userChoice !== undefined
                        ? q.options[userChoice]
                        : '(Chưa chọn)'}{' '}
                      {isCorrect ? '✓ (Chính xác)' : '✗ (Sai)'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="review-ans-row">
                      <span>Đáp án đúng:</span>
                      <span className="badge-correct-ans">
                        {q.options[q.answer]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nút làm lại: kích hoạt đổi key ở cha để reset toàn bộ */}
        <Button variant="primary" size="lg" onClick={onRestart}>
          🔄 Làm lại bài thi
        </Button>
      </div>
    );
  }

  // Màn hình làm bài trắc nghiệm
  return (
    <div>
      {/* Thanh tiến độ */}
      <div className="progress-section">
        <div className="progress-text">
          <span>
            Câu hỏi <strong>{index + 1}</strong> / {questions.length}
          </span>
          <span>
            Đã làm: <strong>{answeredCount}</strong> / {questions.length} câu
          </span>
        </div>
        <ProgressBar
          now={(answeredCount / questions.length) * 100}
          variant="info"
          style={{ height: '8px' }}
        />
      </div>

      {/* Tiêu đề câu hỏi */}
      <h4 className="question-title">
        Câu {index + 1}: {current.text}
      </h4>

      {/* Danh sách 4 lựa chọn */}
      <div className="options-list">
        {current.options.map((opt, optIdx) => {
          const isSelected = selected === optIdx;

          return (
            <button
              key={optIdx}
              type="button"
              className={`option-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(optIdx)}
            >
              <span className="option-index">
                {String.fromCharCode(65 + optIdx)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Điều hướng chuyển câu và nộp bài */}
      <div className="quiz-footer-actions">
        <Button
          variant="outline-secondary"
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
        >
          ← Trước
        </Button>

        {isLast ? (
          <Button
            variant="success"
            onClick={() => setFinished(true)}
            disabled={!isAllAnswered}
          >
            Nộp bài ✓
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => setIndex((i) => i + 1)}
            disabled={selected === undefined}
          >
            Tiếp →
          </Button>
        )}
      </div>
    </div>
  );
}

// 8. Component cha QuizApp quản lý attempt và reset bằng prop key
export default function QuizApp() {
  const [attempt, setAttempt] = useState(1);

  return (
    <div className="quiz-wrapper">
      <Card className="quiz-card">
        <Card.Header className="quiz-header">
          <h3>Bài 5: Trắc nghiệm kiến thức React</h3>
          <span className="attempt-badge">Lượt làm bài thứ {attempt}</span>
        </Card.Header>

        <Card.Body>
          {/* Đổi key={attempt} sẽ hủy component Quiz cũ và tạo mới hoàn toàn */}
          <Quiz
            key={attempt}
            onRestart={() => setAttempt((prev) => prev + 1)}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
