<template>
  <div class="container">
    <div class="wrapper">
      <a-input placeholder="填写付款的旺旺号" v-model="wangwangname" />
      <br />
      <a-input placeholder="订单号" v-model="orderid" />
      <br />
      <a-input placeholder="返款银行卡号" v-model="bankcard_id" />
      <br />
      <a-input placeholder="姓名" v-model="username" />
      <br />
      <a-input placeholder="手机号" v-model="mobile" />
        <br />
        <a-input-number  placeholder="实付金额" v-model="pay_money"    />
        <br />
      <a-alert  :message="remark" type="info" style="width:90%;" :disabled="true"/>
      <br />
      <a-button type="primary" @click="handleSubmit">提交</a-button>

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
 import axios from "axios";

export default {
  data(){
    return {
      wangwangname:"",
      orderid:"",
      bankcard_id:"",
      username:"",
      mobile:"",
      remark:"",
      pay_money:"",
      result:{}
    }
  },
  components: {
    
  },
  // async asyncData({ $axios }) {
  //   return $axios
      

  //     .then(res => {
  //       console.log("res", res.data);
  //       return {
  //         remark: res.data
  //       };
  //     });
  // },
  methods:{
    
    handleSubmit:function(){
      if(!this.orderid||!this.bankcard_id||!this.username||!this.wangwangname||!this.mobile||!this.pay_money){
        this.$message.error("参数必须完整！！");
        return ;
      }
      axios.post("/gapi/api/upinformation",{
        cardid:this.result.card_id,
        mailname:this.result.mail_name,
        orderid:this.orderid,
        bankcard_id:this.bankcard_id,
        username:this.username,
        wangwangname:this.wangwangname,
        mobile:this.mobile,
        paymoney:this.pay_money,
      }).then((res)=>{
       if (res.data.err_code === 200) {
             
             this.$message.success(res.data.message);
             this.$router.push("/")
          }else{
            this.$message.error(res.data.message);
            this.$router.push("/")
          }
      })
    }
  },
  mounted:function(){
    this.result=this.$route.params.result;
    console.log(this.result);
    axios.get("/gapi/maininfo/sibushuoming.txt").then((res)=>{
      this.remark=res.data
    })
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding:0 1rem;
}
.wrapper{
  display: flex;
  width:100%;
  flex-direction: column;
  align-items: center;
}  
</style>
