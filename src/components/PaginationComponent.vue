<template>
    <div>
        <a @click="logout" class="logout">Logout</a>
    </div>
    <div v-if="!loading" class="centered" >
        <div class="centered-child">

            <vue-easy-lightbox
                escDisabled
                moveDisabled
                :visible="visible"
                :imgs="photoUrls"
                :index="index"
                @hide="handleHide"
            ></vue-easy-lightbox>

            <div class="gallery">
                <div class="gallery-panel"
                    v-for="(photo, index) in media"
                    :key="photo.id"
                    @click="showLightbox(index)">
                    <img :src="photo.thumbnail" :alt="photo.title">
                </div>
            </div>


            <div class="centered">
                <div class="centered-child">
                    <v-pagination
                        v-model="page"
                        :pages="pageData.pages"
                        :range-size="pageData.rangeSize"
                        active-color="#DCEDFF"
                        @update:modelValue="updateHandler"
                    />
                </div>
            </div>
        </div>
    </div>

    <div v-else class="centered">
        <div class="centered-child">
            <div class="loading">
                <img :src="tailSpin" alt="loading" class="loading-img">
            </div>
        </div>
    </div>

</template>

<script>
import PhotosService from "../services/photos";
import AuthService from '../services/auth';
import VPagination from "@hennge/vue3-pagination";
import VueEasyLightbox from 'vue-easy-lightbox'

import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import tailSpin from "@/assets/svg/tail-spin.svg";

export default {
    setup() {
      return {
        tailSpin
      };
    },
    mounted(){            
        this.loadPhotosCurrentPage();
    },
    data: () => ({
        loading: false,
        page: 1,
        pageData: {
            pages: 0,
            rangeSize: 2,
            currentPage: 0,
            data: [],
            perPage: 10
        },
        visible: false,
        index: 0
    }),
    methods:{
        logout(){
            AuthService.logout()
                .then(()=>{
                    AuthService.removeCookie();
                    this.$router.push('/login');
                });
        },
        updateHandler(){
            this.loadPhotosCurrentPage();
        },
        loadPhotosCurrentPage(){
            this.loading = true; 
            PhotosService.get(this.page)
                .then(response => {
                    let data =  response.data.data;

                    this.pageData.pages = data.totalPages;
                    this.pageData.currentPage = data.currentPage;
                    this.pageData.data = data.data;
                    this.loading = false;
                }).
                catch(() => {
                    this.loading = false;
                });
        },
        showLightbox(index) {
            this.index = index;
            this.visible = true;
        },
        handleHide() {
            this.visible = false;
        }
    },
    computed:{
        currentImagesData(){
            if(!this.pageData) return null;
            return this.pageData.data;
        },
        media(){
            if(!this.currentImagesData) return [];
            return this.pageData.data.map(image => {
                return {
                    url:image.url, 
                    thumbnail: image.thumbnailUrl,
                    title: image.title,
                    id: image.id
                };
            });
        },
        photoUrls(){
            if(!this.currentImagesData) return [];
            return this.pageData.data.map(image => {
                return {
                    src:image.url,
                    title: image.title
                };
            });
        }
    },
    components:{
        VPagination,
        VueEasyLightbox
    }
}
</script>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(2, 150px 150px);
    grid-gap: 1rem;
    max-width: 90rem;
    margin: 2rem auto;
    margin-top: .5rem;
    padding: 0 2rem;
  }
  .gallery-panel img {
    height: 150px;
    /* object-fit: cover; */
    border-radius: 0.75rem;
  }
  .centered{
      text-align: center;
  }
  .centered-child{
    display: inline-block;
  }
  .loading{
    height: 150px;
  }

  .loading-img{
    margin: auto;
    padding-top: 40%;
    filter: invert(0%) sepia(91%) saturate(0%) hue-rotate(154deg) brightness(95%) contrast(100%);
    width: 500%;
  }
  .logout{
    position: absolute;
    top: 0px;
    right: 0px;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
</style>