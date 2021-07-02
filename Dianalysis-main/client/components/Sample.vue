<template>
  <section>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    <h2 class="title_container">Liste des candidats</h2>
     <div class="container">
      <div v-for="(candidat, index) in candidats" :key="index" class="item">
        <label> {{ candidat[1] }} - {{ candidat[2] }}</label>
        </br>
        <img :src="candidat[8]"/>
        </br>
        <label> {{ candidat[9] }}</label>
      </div>
    </div>
    
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
h2.title_container{
  display: block;
  color : white;
  text-align: center;
}
/************************************************
* ITEM
************************************************/ 
 
div.container{
    margin-top: 5%;
    height: 20%;
    width: 100%;
    text-align: center;
}

.item{
    display: inline-block;
    margin-left: 2%;
    margin-bottom: 2%;
    padding-top: 2%;
    width: 40%;
    height: 35%;
    background-color:white;
    border-radius: 10px;
    color: black;
    text-align: center;
}

.item:last-child{
  top:50%;
}

.item img{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 5%;
}


section{
  background-image: linear-gradient(to right top, #c33764, #a62a6f, #822675, #572676, #1d2671);
  align-items: center;
  font-family: "Montserrat", sans-serif;
  height: 100%;
}

</style>