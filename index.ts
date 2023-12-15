// Import the JongRouter class

import JongRouter from './src/jong-router';



// Configurable variables

const routes: any = [

    { pattern: '/', component: import('./src/home-component') },

    { pattern: '/about', component: import('./src/about-component') },
    { pattern: '/about/:teamId', component: import('./src/team-component') },

    { pattern: '/profile/:username', component: import('./src/profile-component') },

];



// Create an instance of the WebComponentsRouter class

const router = new JongRouter(routes);



// Initialize the router

router.init();