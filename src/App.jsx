import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <div className='flex flex-col h-screen p-6 gap-8'>
      <div className="flex flex-col items-center gap-2">
        <div className='heading'>TOTP Generator</div>
        <div>Generate TOTPs for 2 Factor Authentication</div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App