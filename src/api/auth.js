import axios from "axios";
// const backendUrl = "http://localhost:5000/api/v1/auth"
const backendUrl = `https://job-listing-4ksb.onrender.com/api/v1/auth`;

export const registerUser = async ({ email, password, mobile, name }) => {
    
    console.log(email, password, mobile, name);
    try { 
        console.log(email, password, mobile);
        const response = await axios.post(`${backendUrl}/register`, {
            email,
            password,
            mobile,
            name,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        alert('Something went wrong: ' + error.message);
    }
};

export const loginUser = async ({ email, password }) => {
    try { 
        const response = await axios.post(`${backendUrl}/login`, {
            email,
            password,
        });
        if(response.data?.token){
            localStorage.setItem('token', JSON.stringify(response.data?.token));
            localStorage.setItem('name', JSON.stringify(response.data?.name));
            localStorage.setItem('userId', JSON.stringify(response.data?.userId));
        }
        return response.data;
    } catch (error) {
        console.log(error);
        alert('Something went wrong: ' + error.message);
    }
};