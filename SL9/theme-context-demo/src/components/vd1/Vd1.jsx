import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

export default function Vd1() {
  // App/Vd1 KHÔNG cần biết gì về theme, các component con tự lấy qua Context
  return (
    <div className="vd1-container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
