import axios from "axios"

export const googleAuth = (token) => async (dispatch) => {
    try {
        const data = await axios.get(`https://www.googleapis.com/auth/${token}`);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}