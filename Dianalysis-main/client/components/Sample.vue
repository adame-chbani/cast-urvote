<template>
  <section>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    <h2 class="title_container">Liste des candidats</h2>

    <ul id="example-2" :key="componentKey">
      <li>lol</li>
      <li v-for="(candidat, index) in candidats" :key="index">
        {{ candidat }}
      </li>
    </ul>   
    
  </section>
</template>

<script>
const Navbar = window.httpVueLoader("./components/Navbar.vue");
module.exports = {
  props: {
    candidats: { type: Array, default: [] },
    connected: { type: Boolean },
    check : false
  },
  components: {
    Navbar,
  },
  data() {
    return {
      componentKey: 0
    };
  },
  mounted(){
      //this.forceRerender();
      console.log(this.candidats)
  },
  methods: {
    forceRerender() {
      this.componentKey += 1
      this.$forceUpdate();
    },
    logOut() {
      this.$emit("log-out");
    },
  },
};
</script>

<style scoped>



p {
  text-align: center;
  margin-top: 50px;
}

label, th{
  color: white;
  font-size: 20px;
}

body {
  text-align: center;
  margin-top: 300px;
}
div {
  position: relative;
}

section{
  height: calc(100vh - 320px);
}



form{
  border: 2mm ridge;
  width: auto;
  margin: auto;
  width: 1600px;
  padding: 30px;
}



input + span {
  padding-right: 30px;
}

input:invalid + span:after {
  position: absolute;
  content: "✖";
  padding-left: 5px;
}

input:valid + span:after {
  position: absolute;
  content: "✓";
  padding-left: 5px;
}

p {
  color: red;
}

input{
  margin: 20px;
  
}

.titre_centre{
    text-align: center;
}

.title_container {
    background: rgb(1,25,68);
    background: linear-gradient(90deg, rgba(1,25,68,1) 0%, rgb(3, 3, 114) 46%, rgba(1,25,68,1) 100%);
    font-size: 50px;
    padding-top: 10px;
    color: white;
    text-align: center;
    justify-content: center;
    margin: auto;
    height: 100px;
    margin: 0;
}

section {
background-color: rgba(1,25,68,1);
}

.button_style{
    color:rgb(255, 255, 255);
    border-color: rgb(0, 0, 0);
    background-color: rgb(27, 44, 194);
    border-radius:10px;
    display: block;
    margin: auto auto;
    height: 2em;
    margin-top: 10px;
  }

#errorSampleMessage{
    margin: 0;
}

</style>