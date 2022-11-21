import './App.css';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import Proba from './Proba';
import { DataProvider } from './dataContext/dataContext';

function App() {
  return (      
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Proba/>} />
          <Route path="teams">
            <Route index element={<Proba />} />
            <Route path=":id" element={<Proba />} />
          </Route>
          <Route path="demos">
            <Route index element={<Proba />} />
          </Route>
          <Route path="jobhunters">
            <Route index element={<Proba />} />
          </Route>
          <Route path="interviewprep" element={<Proba />} />
          <Route path="about" element={<Proba />} />
          <Route path="Register" element={<Proba />} />
          <Route path="Login" element={<Proba />} />
          <Route path="*" element={<Proba />} />
        </Route>
      </Routes>
      </DataProvider>
      
   
    
  );
}

export default App;
