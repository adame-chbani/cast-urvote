<template>
  <div>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    <section>
      <div id="container">
        <form @submit.prevent="addUser">
           <img src="./img/logo-rond.png" id="img1" />
          <h1>Inscription</h1>
          <div>
            <p id="validateSignUpCandidate"></p>
          </div>

        <div>
          <label for="role">Role* :</label>
          <select id="role" name="role" v-model="newUser.role">
            <option value="votant" selected>Votant</option>
            <option value="candidat">Candidat</option>
          </select>
        </div>

          <div>
            <label for="name">Nom* :</label>
            <input
              type="text"
              id="name"
              name="user_name"
              v-model="newUser.lastname"
              required
            />
          </div>
          <div>
            <label for="firstname">Prénom*:</label>
            <input
              type="e"
              id="firstname"
              name="user_firstname"
              v-model="newUser.firstname"
              required
            />
          </div>
          <div>
            <label for="firstname">Date de naissance*:</label>
            <input 
            type="date" 
            id="date" 
            name="user_date"
            v-model ="newUser.date"
            >
          </div>
          <div>
            <label for="mail">E-mail* :</label>
            <input
              type="email"
              id="mail"
              name="user_mail"
              v-model="newUser.email"
              required
            />
          </div>
          <div>
            <label for="name">Mot de passe* :</label>
            <input
              type="password"
              id="password"
              v-model="newUser.password"
              required
            />
          </div>
          <div>
            <label for="name">Confirmation mot de passe* :</label>
            <input type="password" id="confirmationPassword" required />
          </div>
          <div>
            <label for="Numéro">Numéro electeur*:</label>
            <input 
              type="number"
              id="vote"
              name="vote"
              v-model="newUser.vote"
              required
            >
          </div>

          <div>
            <p id="errorSignUpMessage"></p>
          </div>

          <input type="submit" value="S'inscrire" />
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
    connected: { type: Boolean },
  },
  data() {
    return {
      newUser: {
        date: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        vote: "",
        role: ""
      },
    };
  },
  methods: {
    addUser() {
      if (
        document.getElementById("password").value ==
        document.getElementById("confirmationPassword").value
      ) {
        if(this.newUser.role == "votant"){
          delete this.newUser.role;
          this.$emit("add-user", this.newUser);
        }else{
          delete this.newUser.role;
          this.$emit("add-acandidat", this.newUser);
        }
      } else {
        document.getElementById("errorSignUpMessage").innerHTML =
          "Mot de passe non identique.";
      }
    },
    logOut() {
      this.$emit("log-out");
    },
  },
};
</script>

<style scoped>
#img1{
  height: 95px;
  width: 95px;
  margin:auto;
  display:block;
  border-radius:100px;

}
section {
  background: rgb(74,95,205);
  background: linear-gradient(90deg, rgba(74,95,205,1) 0%, rgba(221,227,233,1) 50%, rgba(252,69,69,1) 100%);
  
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
}
#container {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  margin-top:50px;
  margin-bottom: 50px;
  
}

#image {
  height: 150px;
  width: 150px;
  display: block;
  margin: auto;
}

#container h1 {
  margin: 0 auto;
  padding-bottom: 10px;
  border-radius: 2px;
  text-align: center;
  font-family: 'Archivo', sans-serif;
}

form {
  
  position: relative;
  padding: 30px;
  border: 1px solid #f1f1f1;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  
  border-radius:30px;
}

form div + div {
  margin-top: 1.5em;
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

label {
  /* Pour être sûrs que toutes les étiquettes ont même taille et sont correctement alignées */
  display: inline-block;
  color: rgb(0, 0, 0);
  width: 160px;
  text-align: right;
  text-align: justify;
  
}

input,
textarea {
  /* Pour s'assurer que tous les champs texte ont la même police.
     Par défaut, les textarea ont une police monospace */
  font: 1em sans-serif;

  /* Pour que tous les champs texte aient la même dimension */
  width: 300px;
  box-sizing: border-box;

  /* Pour harmoniser le look & feel des bordures des champs texte */
  border: 1px solid #999;
}

form div input {
  height: 30px;
  border-radius: 3px;
}

input:focus,
textarea:focus {
  /* Pour souligner légèrement les éléments actifs */
  border-color: #000;
}

form div {
  margin: 20px;
}

p {
  color: red;
}

p#validateSignUpCandidate{
  color: rgb(31, 253, 31);
  border: 1px solid rgb(31, 253, 31);
  visibility: hidden;
}


</style>