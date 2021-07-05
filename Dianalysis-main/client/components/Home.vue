<template>
  <div>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    <div id="showcase">
      <div class="blur"><img src="screenfeed.png" alt="" /></div>

      <div>
        <h1>Bienvenue sur Cast'Ur Vote</h1>
      </div>
      <div>
        <p>
          Cast'Ur Vote est une plateforme permettant aux citoyens étant majeur de pouvoir voter à distance
          en cette période de crise sanitaire.<br />
          Cet outil est développé dans un but éducatif et convient a proposer une méthode de
          vote à distance efficace.
          
        </p>
      </div>
    </div>

    <section id="home">
      <div id="us">
        <h3>Qui sommes-nous ?</h3>
        <div class="element content">
          <article>
            Nous sommes une équipe de 6 étudiants en cursus ingénieur à EFREI
            Paris.<br />Nous aspirons à proposer Cast'Ur Vote comme produit permettant de
            voter à distance.<br />
            Notre devise : "Des outils pour tous, un monde meilleur."
          </article>
          <aside>
            <img src="./img/efrei.jpg" alt="img" />
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const Navbar = window.httpVueLoader("./components/Navbar.vue");
module.exports = {
  props: {
    connected: { type: Boolean }
  },
  components: {
    Navbar,
  },
  methods: {
    logOut () {
      this.$emit('log-out')
    },
  }
}
</script>

<style scoped>

#showcase {
  background-image: url("../img/fond-vote.jpg");
  background-size: 100%;
  height: calc(100vh - 70px);
  color: #fff;
  text-shadow: 0px 0px 10px #000;
  padding: 3em;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 80px;
  text-align: center;
  margin-bottom: 80px;
}

#showcase p {
  font-size: 20px;
  text-align: center;
}

h3 {
  text-align: center;
  font-size: 40px;
  margin-bottom: 20px;
}

section .element {
  margin: auto 20%;
}

section .content {
  display: flex;
}

article,
aside {
  flex: 1;
}


aside img {
  width: 100%;
  border-radius: 4px;
}

section article,
section aside {
  margin: 20px;
}

section article {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#us {
  padding: 50px 0;
}

#about {
  background-color: #efefef;
  padding: 50px 0;
}

#about div,
#us div {
  padding: 10px 0;
}

h4 {
  padding-top: 30px;
  font-size: 30px;
}

#home{
  background-color: white;
}
</style>