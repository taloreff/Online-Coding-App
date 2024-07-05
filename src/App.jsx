import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';
import Lobby from './pages/Lobby';
import CodeBlockIndex from './pages/CodeBlockIndex';
// codeblockdetails
function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        {/* <Route path='/' element={<RouteGuard route={'/'}>
          <Lobby />
        </RouteGuard>} /> */}
        <Route path='/' element={<Lobby />} />
        <Route path="/codeBlock/:id" element={<CodeBlockIndex />} />
      </Routes>
    </Router>
  )
}


// const history = []
// function RouteGuard({ route, children }) {
//   // console.log('RouteGuard', children, route);

//   history.push(
//     {
//       user: 'user',
//       route: route,
//     }
//   )

//   // getting data from be
//   // if(!data){

//   // }

//   console.log('history', history);


//   //  const !user=   userervice.getloggedinuser()
//   //    if (!user) { 

//   //   } 
//   //   if () {
//   //     return children
//   //   }
//   return children
// }

export default App
