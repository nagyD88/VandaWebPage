import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Layout from './Layout';
import Users from './Users';
import User from './User';
import Questionary from './Questionary';
import Questionarys from './Questionarys';
import Education from './Education';
import PreRegistration from './PreRegistration';
import Login from './Login';
import Missing from './Missing';
import Unauthorized from './Unauthorized';
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from '../context/dataContext';
import { AuthProvider } from '../context/AuthProvider';
import RequireAuth from './RequireAuth';
import Registration from './Registration';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          {/* public routes */}
          <Route path="Login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Missing />} />
          {/* we want to protect these routes */}
          <Route path="/" element={<Layout />}>
            <Route
              element={<RequireAuth allowedRoles={[true, false]}/>}>
              {/* justfor admin */}
              <Route element={<RequireAuth allowedRoles={[true]} />}>
                <Route path="User">
                  <Route index element={<Users />} />
                  <Route path=":id" element={<User />} />
                </Route>
                <Route path="register" element={<PreRegistration />} />
              </Route>
              <Route index element={<Home />} />
              <Route path="questionnaire">
                <Route index element={<Questionarys />} />
                <Route path=":id" element={<Questionary />} />
              </Route>
              <Route path="Education">
                <Route index element={<Education />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
