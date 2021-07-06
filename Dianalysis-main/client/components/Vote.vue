<template>
  <section>
    <navbar :connected="connected" @log-out="logOut"></navbar>
    
    <h2 class="title_container">Liste des candidats</h2>
     <div :vote="!vote" class="container">
      <div id="choices">
        <div v-for="(candidat, index) in candidats" :key="index" class="item" :id="index">
          <img :src="candidat[8]"/>
          </br>
          <label class="name"> {{ candidat[1] }} - {{ candidat[2] }}</label>
          </br>
          <label class="politique"> {{ candidat[9] }}</label>
          </br>
          <button id="index" v-on:click="voter(index)">Voter</button>
        </div>
      </div>
    </div>

    <div :vote="vote == false" id="dia-fleches">
		  <span id="dia-gauche" v-on:click="move()" >&lt;</span>
		  <span id="dia-droite" v-on:click="move()">&gt;</span>
	  </div>

    <div v-if="vote" id="messageV">
      Vous avez déjà voté !
    </div>

  </section>
</template>

<script>
const Navbar = window.httpVueLoader("./components/Navbar.vue");
module.exports = {
  props: {
    candidats : {type: Array, default: []},
    connected: { type: Boolean },
    vote: { type: Boolean },
  },
  components: {
    Navbar,
  },
  async mounted(){
    await this.$emit("a-vote");
    console.log("le vote est" , this.vote)
  },
  methods: {
    logOut() {
      this.$emit("log-out");
    },
    move(){
      var hdiv = parseInt($('div.item').height());
      $("#dia-fleches span").click(function(){
        if( $(this).attr('id') == "dia-gauche" ){
          var gauche = parseInt($('div#choices').css('top'));
          gauche += hdiv;
          if( gauche <= 0 && gauche%hdiv == 0){
            $('div#choices').animate({ top: gauche });
          }
        }else{
          var droite = parseInt($('div#choices').css('top'));
          droite -= hdiv;
          console.log(droite);
          if( droite > -hdiv*6 && droite%hdiv == 0 ){
            $('div#choices').animate({ top: droite });
          }
        }
      });
    },
    voter(index) {
      this.$emit("voter", index+1);
    }
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
    margin: auto;
    height: 60vh;
    width: 100vw;
    display: block;
    clear: both;
    overflow: hidden;
    text-align: center;
    position: relative;
}

div#choices{
  position: relative;
  height: 100vh;
}

.item{
    margin-left: 2%;
    width: 100%;
    height: 60%;
    background-color:white;
    border-radius: 10px;
    color: black;
    text-align: center;
}

.item:last-child{
  top:50%;
}

.item img{
  margin-left: 5%;
  height: 60vh;
  width: 30vw;
  border-radius: 50%;
  object-fit: cover;
  float: left;
  left: -20%;
}

.name{
  margin-top: 10%;
}

/* Commun aux deux flêches */
#dia-fleches span
{
	position: absolute;
	top: 200px;
	font-size: 30px;
	font-family: sans;
	background-color: rgba(0,0,0,.4);
	color: #bbb;
	padding: .1em;
	/* Le pointeur de la souris */
	cursor: pointer;
}
#dia-gauche
{
	left: 0;
  margin-top: 5%;
}
#dia-droite
{
	right: 0;
  margin-top: 5%;
}
#dia-fleches span:hover
{
	color: #fff;
}


section{
  background-image: linear-gradient(to right top, #c33764, #a62a6f, #822675, #572676, #1d2671);
  align-items: center;
  font-family: "Montserrat", sans-serif;
  height: 100%;
}

button {
  background-color: #2a3088;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 30%;
  border-radius: 10px;
  border: 1px solid #000000;
}

button:hover {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
}

#messageV{
  background-color: white;
  color: black;
}
</style>