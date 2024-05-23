import axios from "axios";
const backendUrl = `https://job-listing-4ksb.onrender.com/api/v1/job`;

export const createJobPost = async (jobPostPayload) => {
  try {
    const reqUrl = `${backendUrl}/create`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, jobPostPayload);
    console.log(response);
    alert("job created successfully");
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
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, updatedFormData);
    return response?.data;
  } catch (err) {
    console.log(err);
    alert("Something went wrong: " + err.message);
  }
};

export const getAllJobs = async (filter) => {
  try {
    const userId = JSON.parse(localStorage.getItem("userId")) || "";
    const reqUrl = `${backendUrl}/all/${userId}?searchQuery=${
        encodeURIComponent(filter.title || "")
    }&skills=${encodeURIComponent(filter.skills || "")}`;
    const response = await axios.get(reqUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    if (err.response) {
        console.error("Server responded with an error:", err.response.data);
        console.error("Status code:", err.response.status);
        alert(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        alert("Error: No response from server. Please try again later.");
      } else {
        console.error("Error in request setup:", err.message);
        alert(`Error: ${err.message}`);
      }
  }
};
