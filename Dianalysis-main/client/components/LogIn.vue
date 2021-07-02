<template>
  <div>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    <section>
      
      
      <div id="container">
        
        <!-- zone de connexion -->

        <form @submit.prevent="logIn">
          <img src="./img/logo-rond.png" id="img1" />
          <h1>Connexion</h1>

          <label><b> E-mail</b></label>
          <input
            type="email"
            v-model="user.email"
            placeholder="Entrer l'email"
            name="email"
            required
          />

          <label><b>Mot de passe</b></label>
          <input
            type="password"
            v-model="user.password"
            placeholder="Entrer le mot de passe"
            name="password"
            required
          />

          <div>
            <p id="errorLogInMessage"></p>
          </div>

          <input type="submit" id="submit" value="Connexion" />
        </form>
      </div>
    </section>
  </div>
</template>

<script>
const Navbar = window.httpVueLoader("./components/Navbar.vue");
module.exports = {
  components: {
    Navbar,
  },
  props: {
    connected: { type: Boolean }
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      this.$emit("log-in", this.user);
    },
    logOut () {
      this.$emit('log-out')
    }
  },
};
</script>

<style scoped>

#img1{
  
  height: 95px;
  width: 95px;
  margin:auto;
  display:block;
  border-radius:200px;



}
section {
  background: rgb(74,95,205);
  background: linear-gradient(90deg, rgba(74,95,205,1) 0%, rgba(221,227,233,1) 50%, rgba(252,69,69,1) 100%);
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}

#container {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 400px;
  margin-left:auto;
  margin-right:auto;

}

form {
  padding: 30px;
  border: 1px solid #f1f1f1;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 10px;
}

#container h1 {
  
  margin: 0 auto;
  padding-bottom: 10px;
  border-radius: 2px;
  text-align: center;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 4px;
}

input[type="submit"] {
  background-color: #2a3088;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #000000;
}

input[type="submit"]:hover {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
}

p {
  color: red;
}
</style>