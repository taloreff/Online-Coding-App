import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';
import Lobby from './pages/Lobby';
import CodeBlockIndex from './pages/CodeBlockIndex';

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Lobby />} />
        <Route path="/codeBlock/:id" element={<CodeBlockIndex />} />
      </Routes>
    </Router>
  )
}

export default App
