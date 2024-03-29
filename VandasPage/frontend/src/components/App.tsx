import React from 'react';
import Home from './Home';
import Layout from './Layout';
import Users from './Users';
import User from './User';
import Questionary from './Questionary';
import Questionarys from './Questionarys';
import EducationUser from "./EducationUser";
import PreRegistration from './PreRegistration';
import Login from './Login';
import Missing from './Missing';
import Unauthorized from './Unauthorized';
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from '../context/dataContext';
import { AuthProvider } from '../context/AuthProvider';
import RequireAuth from './protectedRoot/RequireAuth';
import Registration from './Registration';
import LevelChanger from './LevelChanger';
import Level from './Level';
import EducationAdmin from './EducationAdmin';
import RequireAuthLevel from './protectedRoot/RequireAuthLevel';
import RequireAuthReg from './protectedRoot/RequireAuthReg';
import SendEmail from './SendEmail';

function App() {

  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          {/* public routes */}
          <Route path="Login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Missing />} />
          <Route element={<RequireAuthReg />}>
            <Route path="registration" element={<Registration />} />
          </Route>
          {/* we want to protect these routes */}
          <Route path="/" element={<Layout />}>
            <Route
              element={<RequireAuth allowedRoles={["admin", "user"]} />}
            >
              {/* justfor admin */}
              <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route path="User">
                  <Route index element={<Users />} />
                  <Route path=":id" element={<User />} />
                </Route>
                <Route
                  path="preregister"
                  element={<PreRegistration />}
                />
                <Route path="sendEmail" element={<SendEmail />} />
              </Route>
              <Route index element={<Home />} />
              <Route path="questionnaire">
                <Route index element={<Questionarys />} />
                <Route path=":id" element={<Questionary />} />
              </Route>
              <Route path="Education">
                <Route index element={<EducationUser />} />
                <Route element={<RequireAuthLevel />}>
                  <Route path=":id" element={<Level />} />
                </Route>
              </Route>
              <Route path="EducationAdmin">
                <Route index element={<EducationAdmin />} />
                <Route path=":id" element={<LevelChanger />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
