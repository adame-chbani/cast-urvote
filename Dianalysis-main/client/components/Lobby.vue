<template>
  <section>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    
    <div id="section_y">
      <h2 class="title_container">Menu</h2>
      <div class="sommaire">
        <router-link class="summary" to="/sample">Voir la liste des candidats</router-link>
        <router-link class="summary" to="/food">Voter</router-link>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary {
  color:rgb(255, 255, 255);
  background-color: #033797;
  height: 140px;
  width: 50em;
  text-decoration: none;
  text-align: center;
  border: solid #000000;
  border-radius: 10px;
  padding-top: 35px;
  margin-top: 5px;
  margin-bottom:5px; 
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