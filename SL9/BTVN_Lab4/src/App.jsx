import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Bai1 from './components/Bai1';
import Bai2 from './components/Bai2';
import Bai3 from './components/Bai3';
import Bai4 from './components/Bai4';
import Bai5 from './components/Bai5';
import Bai6 from './components/Bai6';
import Bai7 from './components/Bai7';
import Bai8 from './components/Bai8';
import Bai9 from './components/Bai9';

function App() {
  const [key, setKey] = useState('bai9');

  return (
    <Container className="py-4" style={{ maxWidth: 1100 }}>
      <h2 className="mb-4 text-center fw-bold">Bài tập React Hooks - Slot 9 (Lab 4)</h2>
      <Tabs
        id="exercises-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4 justify-content-center"
      >
        <Tab eventKey="bai1" title="1. Bài 1: useState">
          <Bai1 />
        </Tab>
        <Tab eventKey="bai2" title="2. Bài 2: ProfilePreview">
          <Bai2 />
        </Tab>
        <Tab eventKey="bai3" title="3. Bài 3: ProductFilter">
          <Bai3 />
        </Tab>
        <Tab eventKey="bai4" title="4. Bài 4: RegisterForm">
          <Bai4 />
        </Tab>
        <Tab eventKey="bai5" title="5. Bài 5: ValidatedRegisterForm">
          <Bai5 />
        </Tab>
        <Tab eventKey="bai6" title="6. Bài 6: TodoList">
          <Bai6 />
        </Tab>
        <Tab eventKey="bai7" title="7. Bài 7: useReducer Cart">
          <Bai7 />
        </Tab>
        <Tab eventKey="bai8" title="8. Bài 8: useReducer Login">
          <Bai8 />
        </Tab>
        <Tab eventKey="bai9" title="9. Bài 9: useContext Theme & Auth">
          <Bai9 />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
