const Home = window.httpVueLoader('./components/Home.vue')
const LogIn = window.httpVueLoader('./components/LogIn.vue')
const SignUp = window.httpVueLoader('./components/SignUp.vue')
const Lobby = window.httpVueLoader('./components/Lobby.vue')
const Profile = window.httpVueLoader('./components/Profile.vue')
const Sample = window.httpVueLoader('./components/Sample.vue')
const Vote = window.httpVueLoader('./components/Vote.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: LogIn },
    { path: '/signup', component: SignUp },
    { path: '/lobby', component: Lobby },
    { path: '/me', component: Profile },
    { path: '/sample', component: Sample },
    { path: '/vote', component: Vote },
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        candidats: [],
        user: [],
        connected: false,
        vote : false,
    },
    async mounted() {
        await this.getAllCandidats();
        await this.aVote()
        var verif = this.readCookie("connected")
        if (verif.localeCompare("true") == 0){
            this.connected = true
            await this.getCurrentUser()
        }
    },
    methods: {
        // LIRE LES COOKIES
        readCookie(name) {
            var i, c, ca, nameEQ = name + "=";
            ca = document.cookie.split(';');
            for(i=0;i < ca.length;i++) {
                c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length,c.length);
                }
            }
            return '';
        },
        // INSCRIPTION NOUVEL UTILISATEUR
        async addUser(newUser) {
            if (await axios.post('https://cast-ur-vote.herokuapp.com/signup?type=user', newUser)
                .catch(function(error) {
                    document.getElementById('errorSignUpMessage').innerHTML = "L'adresse email est déjà prise.";
                })) {
                this.connected = true;
                document.cookie = "connected="+ true;
                document.cookie = "idUser="+ newUser.idUser;
                document.cookie = "email="+ newUser.email;
                document.cookie = "idCandidate="+ newUser.idCandidate;
                router.push('/lobby')
            }
        },
        // INSCRIPTION NOUVEAU CANDIDAT
        async addACandidat(newUser) {
            if (await axios.post('https://cast-ur-vote.herokuapp.com/signup?type=candidat', newUser)
                .catch(function(error) {
                    document.getElementById('errorSignUpMessage').innerHTML = "L'adresse email est déjà prise.";
                })) {
                    document.getElementById('validateSignUpCandidate').innerHTML = "l'administrateur va procéder à la validation de votre compte";
                    document.getElementById('validateSignUpCandidate').style.visibility = 'visible';
            }
        },
        // SE CONNECTER
        async logIn(user) {
            const userData = await axios.post('https://cast-ur-vote.herokuapp.com/login?type=user', user)   
                .catch(function(error) {
                    if (error.response.status === 400 || error.response.status === 401) {
                        document.getElementById('errorLogInMessage').innerHTML = "La combinaison est incorrecte.";
                        return error.response;
                    }
                })
            if (userData.status === 200) {
                this.connected = true;

                document.cookie = "connected="+ userData.data.connected;
                document.cookie = "idUser="+ userData.data.idUser;
                document.cookie = "email="+ userData.data.email;
                document.cookie = "idCandidate="+ userData.data.idCandidate;
                router.push('/lobby')
            }
        },
        // Information de l'utilisateur courrent 
        async getCurrentUser() {
                var email = { 
                    email : this.readCookie('email') 
                }
                var res = await axios.post('https://cast-ur-vote.herokuapp.com/getuser', email)
                .then(function(response){
                    return response.data;
                }).catch(function(error){
                    console.log(error);
                });
                this.user = res.data
        },
        // LISTE DES CANDIDATS
        async getAllCandidats() {
            var res =await axios.get('https://cast-ur-vote.herokuapp.com/getcandidat')
                .then(function (response) {
                    return response.data;
                })
                .catch(function(error) {
                    console.log(error)
                })
            this.candidats = res.data
        },
        // Verifie si l'utilisateur a déja voté ou non
        async aVote() {
            data = {
                id_user : parseInt(this.readCookie('idUser')),
            }
            await axios.post('https://cast-ur-vote.herokuapp.com/avote', data)
                .then(function (response) {
                    this.vote = true;
                })
                .catch(function(error) {
                    this.vote=false
                   console.log(error)
                })
        },
        // Voter
        async voter(idcandidat) {
            data = {
                id_user : parseInt(this.readCookie('idUser')),
                id_candidat : idcandidat
            }
            console.log(data)
            
            await axios.post('https://cast-ur-vote.herokuapp.com/vote', data)
                .then(function (response) {
                    console.log(response)
                    this.vote = true;
                })
                .catch(function(error) {
                    this.vote=true
                    console.log(error)
                })
        },
        logOut() {
            let date = (function(d){ d.setDate(d.getDate()-1); return d})(new Date)
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + date.toUTCString() + ";path=/"); 
            });
            this.connected = false;
            router.push('/')
        },
        async addSample(newSample) {
            if (await axios.post('/api/sample/', newSample)
                .catch(function(error) {
                    if (error.response.status === 400 || error.response.status === 401) {
                        document.getElementById('errorSampleMessage').innerHTML = "Le plat n'existe pas.";
                        console.log(error)
                    }
                })) {
                router.push('/lobby')
            }
        },
    }
})