import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
export const callCountry = async (method, url, payload) => {    
    
    if (method == "" || url == "") {
        return null
    }
    

    let axiosConfig = {
        method: method,
        url: process.env.COUNTRYLIST_URL + url,
    }

    try {
        const response = await axios(axiosConfig)

        return response

    } catch (error) {
        return null
    }
}




