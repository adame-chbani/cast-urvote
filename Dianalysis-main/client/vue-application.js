const Home = window.httpVueLoader('./components/Home.vue')
const LogIn = window.httpVueLoader('./components/LogIn.vue')
const SignUp = window.httpVueLoader('./components/SignUp.vue')
const Lobby = window.httpVueLoader('./components/Lobby.vue')
const Profile = window.httpVueLoader('./components/Profile.vue')
const Sample = window.httpVueLoader('./components/Sample.vue')
const Food = window.httpVueLoader('./components/Food.vue')
const Advices = window.httpVueLoader('./components/Advices.vue')
const History = window.httpVueLoader('./components/History.vue')
const HistoryDetails = window.httpVueLoader('./components/HistoryDetails.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: LogIn },
    { path: '/signup', component: SignUp },
    { path: '/lobby', component: Lobby },
    { path: '/me', component: Profile },
    { path: '/sample', component: Sample },
    { path: '/food', component: Food },
    { path: '/advices', component: Advices },
    { path: '/history', component: History },
    { path: '/details/:id', component: HistoryDetails },
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        candidats: [],
        connected: false
    },
    async mounted() {
        this.candidats = this.getAllCandidats();
        console.log(document.cookie)
        var verif = this.readCookie("connected")
        if (verif.localeCompare("true") == 0){
            this.connected = true
        }
    },
    methods: {
        readCookie(name) {
            var i, c, ca, nameEQ = name + "=";
            ca = document.cookie.split(';');
            for(i=0;i < ca.length;i++) {
                c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    console.log(c)
                    return c.substring(nameEQ.length,c.length);
                }
            }
            return '';
        },
        async addUser(newUser) {
            console.log(newUser)
            if (await axios.post('https://cast-ur-vote.herokuapp.com/signup?type=user', newUser)
                .catch(function(error) {
                    document.getElementById('errorSignUpMessage').innerHTML = "L'adresse email est déjà prise.";
                })) {
                this.connected = true;
                document.cookie = "connected="+ true;
                document.cookie = "idUser="+ newUser.idUser;
                document.cookie = "email="+ newUser.email;
                document.cookie = "idCandidate="+ newUser.idCandidate;
                console.log("document.cookie = " + document.cookie);
                router.push('/lobby')
            }
        },
        async addACandidat(newUser) {
            console.log(newUser)
            if (await axios.post('https://cast-ur-vote.herokuapp.com/signup?type=candidat', newUser)
                .catch(function(error) {
                    document.getElementById('errorSignUpMessage').innerHTML = "L'adresse email est déjà prise.";
                })) {
                    document.getElementById('validateSignUpCandidate').innerHTML = "l'administrateur va procéder à la validation de votre compte";
                    document.getElementById('validateSignUpCandidate').style.visibility = 'visible';
            }
        },
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
                console.log("document.cookie = " + document.cookie);
                router.push('/lobby')
            }
        },
        async getAllCandidats() {
            var res =await axios.get('http://127.0.0.1:5000/getcandidat')
                .then(function (response) {
                    return response.data
                })
                .catch(function(error) {
                    document.getElementById('errorSignUpMessage').innerHTML = "L'adresse email est déjà prise.";
                })
                console.log(res)
            return res
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