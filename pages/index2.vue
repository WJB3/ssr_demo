<template>
  <div class="container">
    <div class="wrapper">
        <img :src="imageUrl" class="img" />
         <br />
        <a-alert   type="info" :message="keywordvalue" style="width:90%;" :disabled="true"/>
      <br />
      <a-alert  type="info" :message="pricevalue"   style="width:90%;" :disabled="true"/>
      <br />
       <a-alert  type="info" :message="guigevalue"  style="width:90%;" :disabled="true"/>
      <br />
      <a-input-search
        placeholder="输入店铺名认证"
        enter-button="确定"
        size="large"
        @search="onSearch"
        v-model="shopvalue"
      />
         
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
      keywordvalue:"",
      pricevalue:"",
      guigevalue:"",
      imageUrl:imageUrl,
      shopvalue:"",
      mailname:""
    }
  },
  mounted:function(){
    let {result={}}=this.$route.params;
    console.log(result);
    this.keywordvalue=result.keyword;
    this.pricevalue=result.price;
    this.guigevalue=result.specifications;
    this.imageUrl="http://192.168.1.109:5588/"+result.pic_path;
    this.mailname=result.mail_name;

  },
  components: {
    
  },
  methods:{
    next:function(){
       
        this.$router.push("/index3");
      
    },
    onSearch:function(){
      if(this.mailname===this.shopvalue){
        this.$router.push({
                name:"index3",
                params:{
                  result:this.$route.params.result
                }
        });

      }else{
        this.$message.error("店铺名认证错误！");
      }
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
