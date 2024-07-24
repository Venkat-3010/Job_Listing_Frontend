import axios from "axios";
const backendUrl = `http://localhost:5000/api/v1/job`;
// const backendUrl = `https://job-listing-4ksb.onrender.com/api/v1/job`;

export const createJobPost = async (jobPostPayload) => {
  try {
    const reqUrl = `${backendUrl}/create`;
    const response = await axios.post(reqUrl, jobPostPayload, {
      headers: {
        Authorization: localStorage.getItem("token",)
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const jobPostDetailsById = async (jobId, userId) => {
  try {
    const reqUrl = `${backendUrl}/job-details/${jobId}/${userId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Something went wrong: " + err.message);
  }
};

export const updateJobPostById = async (jobPostId, updatedFormData) => {
  try {
    const reqUrl = `${backendUrl}/update/${jobPostId}`;
    const response = await axios.put(reqUrl, updatedFormData, {
      headers: {
        Authorization: localStorage.getItem("token",)
      },
    });
    return response?.data;
  } catch (err) {
    console.log(err);
    alert("Something went wrong: " + err.message);
  }
};

export const getAlljobs = async () => {
  try {
    const reqUrl = `${backendUrl}/all_jobs`;
    const response = await axios.get(reqUrl);
    return response.data;
  }catch (err) {
    console.log(err);
    alert("Something went wrong: " + err.message);
  }
}

export const getAlljobsfilter = async (filter) => {
  try {
    const userId = JSON.parse(localStorage.getItem("userId")) || "";
    const reqUrl = `${backendUrl}/all/${userId}?searchQuery=${
        encodeURIComponent(filter.title || "")
    }&skills=${encodeURIComponent(filter.skills || "")}`;
    const response = await axios.get(reqUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("Something went wrong: " + err.message);
  }
};
