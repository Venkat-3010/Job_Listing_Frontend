import axios from "axios";
const backendUrl = `https://job-listing-4ksb.onrender.com/api/v1/auth`;

export const createJobPost = async (jobPostPayload) => {
    try{
        const reqUrl = `${backendUrl}/create`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, jobPostPayload);
    }catch(err){
        return err.response.data;
    }
};

export const jobPostDetailsById = async (jobId, userId) => {
    try{
        const reqUrl = `${backendUrl}/job-details/${jobId}/${userId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    }catch(err){
        console.log(err);
        alert('Something went wrong: ' + err.message);
    }
};

export const updateJobPostById = async (jobPostId, updatedFormData) => {
    try{
        const reqUrl = `${backendUrl}/update/${jobPostId}`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, updatedFormData);
        return response.data;
    }catch(err){
        console.log(err);
        alert('Something went wrong: ' + err.message);
    }
}

export const getAllJobs = async (filter) => {
    try{
        const userId = JSON.parse(localStorage.getItem('userId')) || '';
        const reqUrl = `${backendUrl}/all/${userId}?searchQuery=${filter?.title || ""}&skills=${filter?.skills || ""}`;
        const response = await axios.get(reqUrl);
        return response.data;
    }catch(err){
        console.log(err);
        alert('Something went wrong: ' + err.message);
    }
};