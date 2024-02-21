<template>
    <div class="app-container">
        <div class="sidebar">
            <h2>Contact me</h2>
            <p> Please fill out the information </p>
            <div class="link-buttons">
                <router-link to="/" class="link-button">Calculator</router-link>
                <router-link to="/ContactForm" class="link-button">Contact</router-link>
            </div>
        </div>
        <div class="contact-form-container">
            <form @submit.prevent="handleSubmit">
                <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="name" required/>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required/>
                </div>
                <div>
                    <label for="message">Message</label>
                    <textarea id="message" v-model="message" required></textarea>
                </div>
                <button type="submit" :disabled="isFormInvalid">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "../store.js";

const store = useStore();
const name =ref(store.name);
const email = ref(store.email);
const message = ref('');

const isFormInvalid = computed(() => {
    return !name.value || !email.value || !message.value;
});

const handleSubmit = async () => {
    if (isFormInvalid.value) {
        alert('Please fill in all fields.');
        return;
    }

    try {
    const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            message: message.value,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Form submitted:', data);
        store.setName(name.value);
        store.setEmail(email.value);
        alert("I got your personal info now! I'll be in touch");
        message.value = '';
    } else {
        alert("I dunno what you did, but it didn't work.");
    }
    } catch (error) {
        console.error('There was an error submitting the form:', error);
        alert('An error occurred. Please try again later.');
    }
};

</script>

<style scoped>

.app-container {
    height: 97vh;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    grid-template-rows: repeat(9, 1fr);
    border: 1px solid black;

}
.sidebar {
    grid-column:3/8;
    grid-row:4/9;
}

.contact-form-container {
    grid-column: 9/13;
    grid-row: 4/9;
}
.link-button {
  margin-top: 10px; 
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 30px; 
  border: 2px solid #ccc;
  border-radius: 5px; 
  background-color: #f8f8f8;
  color: #333;
  text-align: center;
}

.contact-form-container {
}
</style>