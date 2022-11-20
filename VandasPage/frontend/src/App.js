import './App.css';
import 
function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams">
            <Route index element={<Teams />} />
            <Route path=":id" element={<Team />} />
          </Route>
          <Route path="demos">
            <Route index element={<Demos />} />
          </Route>
          <Route path="jobhunters">
            <Route index element={<JobHunters />} />
          </Route>
          <Route path="interviewprep" element={<InterviewPrep />} />
          <Route path="about" element={<About />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
