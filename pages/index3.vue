<template>
  <div class="container">
    <div class="wrapper">
        <img :src="imageUrl" class="img" />
         <br />
         <a-button type="primary" @click="next">下一步</a-button>
      <br />
     
      <br />
      

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import imageUrl from '~/assets/flash.png';
 

export default {
  data(){
    return {
      inputvalue:"",
      imageUrl:imageUrl
    }
  },
  mounted:function(){
    this.imageUrl="http://192.168.1.109:5588/maininfo/任务要求细节.jpg"
  },
  components: {
    
  },
   
  methods:{
    next:function(){
        this.$router.push({
                name:"index4",
                params:{
                  result:this.$route.params.result
                }
        });
      
    }
  }
}
</script>

<style > 
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding:0 1rem;
}
.img{
    width:80%;
}
.wrapper{
  display: flex;
  width:100%;
  flex-direction: column;
  align-items: center;
}  
</style>
