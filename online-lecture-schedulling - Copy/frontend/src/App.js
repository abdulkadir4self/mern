import './App.css';
import { Route,Routes } from 'react-router';

import Register from './Pages/Register';
import Login from './Pages/Login';
import AddCourse from './Pages/AddCourse';
import AddLecture from './Pages/AddLecture';
import ViewLecture from './Pages/ViewLecture';
import ViewInstructor from './Pages/ViewInstructor';
import InstructorLogin from './Pages/InstructorLogin';
import InstructorRegister from './Pages/InstructorRegister';
import Navbar from './components/Navbar';
import InstructorPanel from './Pages/InstructorPanel';


function App() {
  return (
    <div className="App">
      <Navbar/>
    <Routes>
      
      <Route path='/viewinst/:id/:date' element={ <ViewInstructor/> }  /> 
      <Route path='view' element={ <ViewLecture/> }  />
      <Route path='add' element={ <AddCourse/> }  />
      <Route path='lecture' element={ <AddLecture/> }  />
      <Route path='login' element={ <Login/> }  />
      <Route path='register' element={ <Register/> }  />
      <Route path='instructorRegister' element={ <InstructorRegister/> }  />
      <Route path='instructorLogin' element={ <InstructorLogin/> }  />
      <Route path='/intructorPanel/:id' element={ <InstructorPanel/> }  />




    </Routes>
    </div>
  );
}

export default App;
