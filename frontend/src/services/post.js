import {API} from "../api/index.js";


export const getPosts = async () => {
    const {data} = await API.get("/v1/posts", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return data.data;
}


export const createPost = async (payload) => {
    try{
    const token = localStorage.getItem("accessToken");
    const response = await API.post("/v1/posts", payload,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    return response.data;
    }catch(error){
        console.log(error);
    }

}