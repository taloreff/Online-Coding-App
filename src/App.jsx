import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppHeader from './assets/css/cmps/AppHeader';
import Lobby from './assets/css/pages/Lobby';
import CodeBlockIndex from './assets/css/pages/CodeBlockIndex';

function App() {
  return (
    <Router>
      <AppHeader />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Lobby />} />
          <Route path="/codeBlock/:id" element={<CodeBlockIndex />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
