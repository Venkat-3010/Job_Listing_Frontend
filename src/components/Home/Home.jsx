import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePeople } from "react-icons/md";
import styles from "./Home.module.css";
import { getAllJobs } from "../../api/job";

const Home = () => {
  const navigate = useNavigate();
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState();
  const [token, setToken] = useState(!!localStorage.getItem("token"));

  const handleLogout = async () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setToken(false);
    navigate("/login");
  };

  const fetchAllJobs = async () => {
    const result = await getAllJobs({ title: title, skills: skills });
    setJobs(result?.data || []);
  };

  const handleSkill = (e) => {
    const value = e.target.value;
    setSkills((prevSkills) => {
      if (!prevSkills.includes(value)) {
        return [...prevSkills, value];
      }
      return prevSkills;
    });
  };

  const removeSkill = (selectedSkill) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill !== selectedSkill));
  };

  const handleLogin = () => {
    navigate("/login");
  }

  const handleRegister = () => {
    navigate("/register");
  }

  useEffect(() => {
    if(token){
      setIsLoggedIn(true);
    }
  }, [token]);

  // useEffect(() => {
  //    fetchAllJobs();
  // }, []);

  return (
    <>
      <div className={styles.header}>
        <h3 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Jobfinder</h3>
        <div className={styles.btnGroup}>
          {token ? (
            <button className={styles.login} onClick={handleLogout} >
              Logout
            </button>
          ) : (
            <>
              <button className={styles.login} onClick={handleLogin}>Login</button>
              <button className={styles.register} onClick={handleRegister}>Register</button>
            </>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerTop}>
          <CiSearch />
          <input
            className={styles.inputTop}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            name="search"
            placeholder="Type any job title"
          />
        </div>
        <div className={styles.containerBottom}>
          <select
            onChange={handleSkill}
            className={styles.inputSelect}
            name="remote"
          >
            <option disabled value="">
              Skills
            </option>

            {DEFAULT_SKILLS?.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          {skills?.map((skill) => {
            return (
              <span className={styles.chip} key={skill}>
                {skill}
                <span
                  onClick={() => removeSkill(skill)}
                  className={styles.cross}
                >
                  ╳
                </span>
              </span>
            );
          })}
          <div>
            <button onClick={loggedIn ? fetchAllJobs : () => navigate('/login')} className={styles.filter}>
              Apply Filter
            </button>
            <button
              onClick={() => navigate("/job-post")}
              className={styles.job}
            >
              + Add Job
            </button>
            <button
              onClick={() => {
                setSkills([]);
                setTitle("");
                fetchAllJobs();
              }}
              className={styles.clear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {jobs.map((data) => {
        return (
          <div key={data._id} className={styles.list}>
            <div className={styles.listLeft}>
              <div>
                <img className={styles.logo} src={data?.logoUrl} />
              </div>
              <div className={styles.infoLeft}>
                <p className={styles.position}>{data.title}</p>
                <p className={styles.extraInfo}>
                  <MdOutlinePeople
                    style={{
                      fontSize: "20px",
                      color: "grey",
                      marginTop: "2px",
                    }}
                  />

                  <span className={styles.greyText}>11-50</span>
                  <span className={styles.greyText}>₹ {data.salary}</span>
                  <span className={styles.greyText}>{data.location}</span>
                </p>
                <p className={styles.extraInfo}>
                  <span className={styles.redText}>{data.remote}</span>
                  <span className={styles.redText}>{data.jobType}</span>
                </p>
              </div>
            </div>
            <div>
              <div className={styles.skills}>
                {data?.skills?.map((skill) => {
                  return (
                    <span className={styles.skill} key={skill}>
                      {skill}
                    </span>
                  );
                })}
              </div>
              <div className={styles.btnGroup2}>
                {token && (
                  <button
                    onClick={() => {
                      navigate("/job-post", {
                        state: {
                          jobDetails: data,
                          edit: true,
                        },
                      });
                    }}
                    className={styles.view}
                  >
                    Edit Jobs
                  </button>
                )}
                <button
                  onClick={() => navigate(`/job-details/${data._id}`)}
                  className={styles.view}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
