import axios from "axios";

const axiosBaseInstance = axios.create({
    baseURL: `/api`,
    headers: {
        'Content-Type': 'application/json'
        // Authorization: "BEARER afjoewjaofewaf"
    }
});
axiosBaseInstance.interceptors.response.use(function (response) {
    // Global handle response to only pass on data
    return response.data;
}, function (error) {
    // Global Service Error Handler
    console.log("Global Service Error", error);
    return Promise.reject(error);
});
export default axiosBaseInstance
