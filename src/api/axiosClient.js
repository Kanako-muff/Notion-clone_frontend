import axios from "axios";

const BASE_URL = "http://localhost:6600/api/v1";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({  //create() ⬅︎function for instantiation
    baseURL: BASE_URL,
});


//Preparation for calling API(interceptors)
axiosClient.interceptors.request.use(async(config) => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,  //Add JWT to the req header and pass it to the server.
                        //  [0]     [1] 
        },
    };
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (err) => {
        throw err.response;
    }
);

export default axiosClient;