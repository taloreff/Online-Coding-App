import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppHeader from './cmps/header/AppHeader';
import Lobby from './pages/Lobby';
import CodeblockDetails from './pages/CodeblockDetails';
function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Lobby />} />
        <Route path="/codeBlock/:id" element={<CodeblockDetails />} />
      </Routes>
    </Router>
  )
}

export default App
