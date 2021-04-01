import axios from 'axios';

export default {
    signin: function(user){
        return axios.post('http://localhost:3000/api/register/', {
            email: user.email, 
            password: user.password, 
            password2: user.password2
        });
    }
}