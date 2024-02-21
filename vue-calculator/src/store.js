import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: "main",
    state: () => ({
        name: "",
        email: "",
        message: "",
    }),
    actions: {
        setName(name) {
            this.name = name;
        },
        setEmail(email) {
            this.email = email;
        }
    },
});