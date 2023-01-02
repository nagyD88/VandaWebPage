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
import Unauthorized from './Unauthorized';
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from '../context/dataContext';
import { AuthProvider } from '../context/AuthProvider';
import RequireAuth from './RequireAuth';
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="Login" element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
            {/* we want to protect these routes */}
            <Route
              element={<RequireAuth allowedRoles={[ROLES.User]} />}
            >
              <Route index element={<Home />} />
              <Route path="User">
                <Route index element={<Users />} />
                <Route path=":id" element={<User />} />
              </Route>
              <Route path="questionnaire">
                <Route index element={<Questionarys />} />
                <Route path=":id" element={<Questionary />} />
              </Route>
              <Route path="Education">
                <Route index element={<Education />} />
              </Route>
              <Route path="register" element={<PreRegistration />} />
            </Route>
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
