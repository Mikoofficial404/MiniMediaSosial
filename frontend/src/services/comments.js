import {API} from "../api/index.js";


export const createComments = async (payload) => {
    try{
        const token = localStorage.getItem("accessToken");
        const response = await API.post("/v1/comments", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const deleteComment = async (id) => {
    try{
        const token = localStorage.getItem("accessToken");
        await API.delete(`/v1/comments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

    }catch (e) {
        console.log(e);
        throw e;
    }
}