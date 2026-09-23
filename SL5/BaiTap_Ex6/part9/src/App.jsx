import { Layout, WelcomeCard, ProductList, CartTable, RegisterForm } from './components';

function App() {
  return (
    <Layout title="Cửa hàng">
      {/* 1. WelcomeCard (Bài 1) */}
      <section className="mb-5">
        <h4 className="border-bottom pb-2 mb-3 text-secondary">
          1. Thông tin chào mừng (WelcomeCard)
        </h4>
        <WelcomeCard />
      </section>

      {/* 2. ProductList (Bài 4 - 6) */}
      <section className="mb-5">
        <h4 className="border-bottom pb-2 mb-3 text-secondary">
          2. Danh sách sản phẩm (ProductList & ProductCard)
        </h4>
        <ProductList />
      </section>

      {/* 3. CartTable (Bài 7) */}
      <section className="mb-5">
        <h4 className="border-bottom pb-2 mb-3 text-secondary">
          3. Giỏ hàng & Thống kê (CartTable)
        </h4>
        <CartTable />
      </section>

      {/* 4. RegisterForm (Bài 8) */}
      <section className="mb-5">
        <h4 className="border-bottom pb-2 mb-3 text-secondary">
          4. Biểu mẫu đăng ký (RegisterForm, InputField & AppButton)
        </h4>
        <RegisterForm />
      </section>

      {/* 5. Ghi chú quy tắc ES6 Module (Bước 6) */}
      <section className="mb-4">
        <div className="card border-info shadow-sm">
          <div className="card-header bg-info text-white fw-bold">
            💡 Ghi chú ES6 Module: Phân biệt Export Default vs Named Export (Bước 6)
          </div>
          <div className="card-body">
            <h6 className="fw-bold">Quy tắc import/export trong ES6:</h6>
            <ul className="mb-0">
              <li className="mb-2">
                <strong>Export default:</strong> Mỗi file chỉ có tối đa một <code>export default</code>. Khi import <em>không dùng dấu ngoặc nhọn <code>{'{ }'}</code></em> và có thể đặt tên tùy ý khi import:
                <br />
                <code>import Layout from './layout/Layout';</code>
              </li>
              <li className="mb-2">
                <strong>Named export:</strong> Một file có thể có nhiều <code>named export</code>. Khi import <em>bắt buộc phải dùng dấu ngoặc nhọn <code>{'{ }'}</code></em> và đúng tên đã export (hoặc dùng <code>as</code> để đổi tên):
                <br />
                <code>import &#123; APP_NAME, menuItems &#125; from '../../data/menu';</code>
              </li>
              <li className="mb-2">
                <strong>Gom export bằng index.js (Barrel Export):</strong> Gom tất cả component lại qua <code>index.js</code> để nơi sử dụng chỉ cần một dòng import duy nhất:
                <br />
                <code>import &#123; Layout, WelcomeCard, ProductList, CartTable, RegisterForm &#125; from './components';</code>
              </li>
              <li>
                <strong>Prop <code>children</code>:</strong> Cho phép component <code>Layout</code> đóng vai trò khung bọc ngoài (wrapper), hiển thị linh hoạt bất kỳ nội dung nào được truyền vào giữa hai thẻ đóng mở.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;
