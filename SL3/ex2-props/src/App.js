import './App.css'
import About from './About'

function App() {
  // khai báo 1 object user
  const user1 = {
    name: "TrầnLTB",
    email: "traltb@fe.edu.vn"
  }

  const user2 = {
    name: "Ngoc",
    email: "ngoc@gmail.com"
  }

  return (
    <>
      <About user={user1} />
      <About user={user2} />
    </>
  )
}

export default App