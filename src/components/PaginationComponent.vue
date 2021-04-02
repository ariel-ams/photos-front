<template>
    <div>
        <a @click="logout">Cerrar sesión</a>
    </div>
    <div>
        I'm an example component.
    </div>
</template>

<script>
import PhotosService from "../services/photos";
import AuthService from '../services/auth';
export default {
    // created(){
    //     if(!AuthService.authenticated()){
    //         this.$router.push('/login');
    //     }
    // },
    mounted(){        
        PhotosService.get(this.page)
            .then(response => {
                console.log(response);
            })
    },
    data: () => ({
        page: 1,
    }),
    methods:{
        logout(){
            AuthService.logout()
                .then(()=>{
                    AuthService.removeCookie();
                    this.$router.push('/login');
                });
        }
    }    
}
</script>