<template>
  <div class="container">
    <div class="wrapper">
      <a-alert :message="shuomingValue" type="info" style="width:90%;"/>
      <br />
      <a-input placeholder="输入任务密码" v-model="inputvalue" />
      <br />
      <a-button type="primary" block @click="toIndex2">点击开始任务</a-button>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import axios from "axios";
export default {
  data() {
    return {
      inputvalue: "",
      shuomingValue: ""
    };
  },
  components: {},
  mounted:function(){
    axios.get("/gapi/maininfo/jiandan.txt").then((res)=>{
      this.shuomingValue=res.data
    })
  },
  methods: {
    toIndex2: function() {
      axios
        .post("/gapi/api/getinformation", {
          cardid: this.inputvalue
        })
        .then(res => {
          console.log(res.data)
          if (res.data.err_code === 200) {
            console.log(res.data.result);
            if (!this.inputvalue) {
              this.$message.error("任务密码必填！");
            } else {
              this.$router.push({
                name:"index2",
                params:{
                  result:res.data.result
                }
              });
            }
          }else{
            this.$message.error(res.data.message);
          }
        });
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}
.wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
