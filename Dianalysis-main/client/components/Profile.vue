<template>
  <section>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    <h2> Vos informations : </h2>
    <ul>
      <li><img :src="user[8]"/></li>
      <li>Nom : {{user[1]}} </li>
      <li>Prénom : {{user[2]}} </li>
      <li> Date de naissance : {{this.date()}} </li>
      <li>Adresse mail : {{user[4]}} </li>
    </ul>
  </section>
</template>

<script>
const Navbar = window.httpVueLoader("./components/Navbar.vue");
module.exports = {
  props: {
    user: { type: Array, default: [] },
    connected: { type: Boolean },
  },
  components: {
    Navbar,
  },
  data() {
    return {
    };
  },
  methods: {
    logOut() {
      this.$emit("log-out");
    },
    date(){
      var l = this.user[3].split("-");
      var date = l[2] + "/" + l[1] + "/" + l[0]
      return date
    }
  },
};
</script>

<style scoped>
h2{
  display: block;
  color : white;
  text-align: center;
}

ul{
  display: block;
  text-align: center;
  list-style-type:none
}
li img{
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 1%;
}

section{
  background-image: linear-gradient(to right top, #c33764, #a62a6f, #822675, #572676, #1d2671);
  align-items: center;
  font-family: "Montserrat", sans-serif;
  height: 100%;
}

</style>