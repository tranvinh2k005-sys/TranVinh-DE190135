import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Bai1 from './components/Bai1';
import Bai2 from './components/Bai2';
import Bai3 from './components/Bai3';
import Bai4 from './components/Bai4';

function App() {
  const [key, setKey] = useState('bai4');

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
      </Tabs>
    </Container>
  );
}

export default App;
