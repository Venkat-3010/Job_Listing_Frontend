import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { CiSearch } from "react-icons/ci";
import { MdOutlinePeople } from "react-icons/md";
import styles from "./Home.module.css";
import { getAllJobs } from "../../api/job";

const Home = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState();
  const [token] = useState(!!localStorage.getItem("token"));

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchAllJobs = async () => {
    const result = await getAllJobs({ title: title, skills: skills });
    setJobs(result?.data);
  };

  const handleSkill = (e) => {
    const newArr = skills.filter((skill) => skill === e.target.value);
    if (!newArr.length) {
      setSkills([...skills, e.target.value]);
    }
  };

  const removeSkill = (selectedSkill) => {
    const newArr = skills.filter((skill) => skill !== selectedSkill);
    setSkills([...newArr]);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h3>JobFinder</h3>
        <div className={styles.btnGroup}>
          {token ? (
            <button className={styles.login} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className={styles.login}>Login</button>
              <button className={styles.register}>Register</button>
            </>
          )}
        </div>
      </div>
      <div className={styles.contaier}>
        <div className={styles.containerTop}>
          <CiSearch />
          <input
            type="text"
            className={styles.inputTop}
            placeholder="Type any job title"
            onChange={(e) => setTitle(e.target.value)}
            name="search"
            value={title}
          />
        </div>
        <div className={styles.containerBottom}>
          <select
            onChange={handleSkill}
            className={styles.inputSelect}
            name="remote"
          >
            <option disabled selected value="">
              Skills
            </option>

            {DEFAULT_SKILLS?.map((skill) => (
              <option value={skill} key={skill}>
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
                  X
                </span>
              </span>
            );
          })}
          ;
          <div>
            <button onClick={fetchAllJobs} className={styles.filter}>
              Apply Filter
            </button>
            <button
              className={styles.job}
              onClick={() => navigate("/job-post")}
            >
              +Add Job
            </button>
            <button
              onClick={() => {
                setSkills([]);
                setTitle("");
                fetchAllJobs();
              }}
              className={styles.clear}
            >
              clear
            </button>
          </div>
        </div>
      </div>
      {jobs.map((data) => {
        return (
          <div key={data._id} className={styles.list}>
            <div className={styles.listLeft}>
              <div>
                <img src={data?.logoUrl} className={styles.logo} alt="" />
              </div>
              <div className={styles.infoLeft}>
                <p className={styles.position}>{data.title}</p>
                <p className={styles.extraInfo}>
                  <MdOutlinePeople
                    style={{
                      fontSize: "20px",
                      color: "gray",
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
                {data.skills.map((skill) => {
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
                    className={styles.view}
                    onClick={() => {
                      navigate("/job-post", {
                        state: { jobDetails: data, edit: true },
                      });
                    }}
                  >
                    Edit Jobs
                  </button>
                )}
                <button
                  onClick={() => {
                    navigate(`/job-dtails/${data._id}`);
                  }}
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
