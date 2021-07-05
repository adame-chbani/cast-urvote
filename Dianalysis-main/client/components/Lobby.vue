<template>
  <section>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    
    <div id="section_y">
      
      <div class="sommaire">
        <router-link class="summary" to="/sample">Liste des candidats</router-link>
        <router-link class="summary" to="/vote">Voter</router-link>
      </div>
    </div>
  </section>
</template>

<script>
const Navbar = window.httpVueLoader("./components/Navbar.vue");
module.exports = {
  props: {
    connected: { type: Boolean },
  },
  components: {
    Navbar,
  },
  methods: {
    logOut() {
      this.$emit("log-out");
    },
  },
};
</script>

<style scoped>
.title_container{
    background: linear-gradient(#071e38, #040614);
    background: linear-gradient(90deg, #9aa7b6 0%, rgb(81, 81, 161) 46%, #9aa7b6 100%);
    font-size: 60px;
    padding-top: 10px;
    color: white;
    text-align: center;
    justify-content: center;
    margin: auto;
    height: 110px;
    margin: 0;
}


h2{
  margin-left:50px;
  color:#fff;
}
section {
  background: linear-gradient(#b1b9c4, #ffffff);
}


.section_y {
  height: 1vh;
  text-align: center;
}
.sommaire {
  margin-bottom: 0%;
  margin-top:50px;
  font-size:22,9px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary {
  color:rgb(255, 255, 255);
  background-color: #033797;
  height: 130px;
  width: 40em;
  text-decoration: none;
  text-align: center;
  border: solid #000000;
  border-radius: 10px;
  padding-top: 45px;
  margin-top: 30px;
  margin-bottom:20px; 
}

.summary:hover {
  text-decoration: none;
  color: white;
  background: linear-gradient(to right, #4f596d, #2051ad, #4f596d);
  transition: 1s, 1s, 1s;
  font-size: 50px;
  width: 900px;
}

.title_container {
    background: rgb(1,25,68);
    background: linear-gradient(90deg, rgb(103, 122, 156) 0%, rgb(3, 3, 114) 46%, rgb(103, 122, 156) 100%);
    font-size: 60px;
    padding-top: 10px;
    color: white;
    text-align: center;
    justify-content: center;
    margin: auto;
    height: 110px;
    margin: 0;
}
</style>