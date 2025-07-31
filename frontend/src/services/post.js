import {API} from "../api/index.js";


export const getPosts = async () => {
    try {
        const {data} = await API.get("/v1/posts", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return data.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
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

export const deletePost = async (id) => {
    try{
        const token = localStorage.getItem("accessToken");
        const response = await API.delete(`/v1/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (e) {
        console.log(e);
        throw e;
    }
}