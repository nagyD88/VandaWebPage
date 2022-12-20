import './App.css';
import Home from './Home';
import Layout from './Layout';
import Users from './Users';
import User from './User';
import Questionary from './Questionary';
import Questionarys from './Questionarys';
import Education from './Education'; 
import Registration from './Registration';
import PreRegistration from './PreRegistration';
import Login from './Login';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './dataContext/dataContext';


function App() {
  return (      
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="User">
            <Route index element={<Users/>} />
            <Route path=":id" element={<User/>} />
          </Route>
          <Route path="questionnaire">
            <Route index element={<Questionarys/>} />
            <Route path=":id" element={<Questionary/>}/>
          </Route>
          <Route path="Education">
            <Route index element={<Education/>} />
          </Route>
          <Route path="register" element={<PreRegistration />} />
          <Route path="Login" element={<Login />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      </DataProvider>
  );
}

export default App;
