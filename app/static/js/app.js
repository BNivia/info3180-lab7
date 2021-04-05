/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

const app = Vue.createApp({
    data() {
        return {

        }
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

app.component('upload-form', {
    name: 'UploadForm',
    template:`
        <div>
            <div class="alert alert-success" role="alert" v-if="on && success" v-for="message in messages">
                    {{message}}
            </div>
            <div class="alert alert-danger" role="alert"  v-if="on && !success" >
                <div v-for="message in messages">
                    <li> {{message}}</li>
                </div>
            </div>

            <form @submit.prevent="uploadPhoto" id="uploadForm">
                <label for="description">Description</label>
                <textarea name="description"></textarea>
                
                <label for="photo">Photo</label>
                <input name="photo" type="file">

                <button type=submit class="btn btn-primary">Submit</button>
            </form>
        </div>
    `,
    methods: {
        uploadPhoto: function(){
            self = this;
            let form = document.getElementById('uploadForm');
            let uploadForm = document.getElementById('uploadForm');
            
            fetch("/api/upload", {
                method: "POST"
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
})
        


// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here

    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');