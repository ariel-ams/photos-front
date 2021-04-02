import axios from 'axios';

export default {
    get: function(page){
        
        return axios.get(`http://localhost:3000/api/photos?page=${page}`, 
        {   
            withCredentials: true
        });
    }
}