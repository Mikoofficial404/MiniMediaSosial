import {API} from "../api/index.js";


export const createLike = async (payload) => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await API.post("/v1/likes", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (e) {
        console.error("Error creating like:", e);
        throw e;
    }
}

export const deleteLike = async (id) => {
    try{
        const token = localStorage.getItem("accessToken");
        const response = await API.delete(`/v1/likes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (e) {
        console.error("Error deleting like:", e);
        throw e;
    }
}