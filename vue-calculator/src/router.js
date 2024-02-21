import { createRouter, createWebHistory } from "vue-router";
import Calculator from "../src/components/Calculator.vue";
import ContactForm from "../src/components/ContactForm.vue";

const routes = [
    {  
        path : "/",
        name : "Calculator",
        component: Calculator
    },
    {
        path : "/ContactForm",
        name : "Contact",
        component: ContactForm
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;