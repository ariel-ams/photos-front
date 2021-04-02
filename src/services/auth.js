import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    signin: function(user){
        return axios.post('http://localhost:3000/api/register/', {
            email: user.email, 
            password: user.password, 
            password2: user.password2
        });
    },
    login: function(user){
        return axios.post('http://localhost:3000/api/login/', {
            email: user.email, 
            password: user.password
        });
    },
    logout: function(){
       return axios.get('http://localhost:3000/api/logout', {withCredentials: true});
    },
    setUserLogged(token) {
        Cookies.set('auth', token);
    },
    getUserLogged() {
        return Cookies.get('auth');
    },
    removeCookie(){
        Cookies.remove('auth');
    },
    authenticated(){
        return Cookies.get('auth');
    }
}