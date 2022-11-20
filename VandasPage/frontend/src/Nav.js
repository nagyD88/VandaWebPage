const Nav = () => {

return (
    <nav className="sideNav">
      <div className="navElement active">
        <Link to="/">Home</Link>
      </div>
      <div className="navElement">
        <Link to="teams">Teams</Link>
      </div>
      <div className="navElement">
        <Link to="demos">Demos</Link>
      </div>
      <div className="navElement">
        <Link to="jobhunters">Job Hunters</Link>
      </div>
      <div className="navElement">
        <Link to="interviewprep">InterviewPrep</Link>
      </div>
      <div className="navElement">
        <Link to="about">About</Link>
      </div>
    </nav>
  );
};