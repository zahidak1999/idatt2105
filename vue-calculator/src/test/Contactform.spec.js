import ContactForm from "../components/ContactForm.vue";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { describe, it, expect } from "vitest";

const pinia = createPinia();

const app = createApp(pinia);
app.use(pinia);

describe("ContactForm", () => {
    it("renders the form with correct props", async() => {
        const wrapper = mount(ContactForm, {
            props: {
                name: "Zahid",
                email: "zahid@mail.com",
                message: "Hello World",
            },
        });

        await wrapper.find("#name").setValue("Zahid");
        await wrapper.find("#email").setValue("zahid@mail.com");
        await wrapper.find("#message").setValue("Hello World");

        expect(wrapper.find("#name").element.value).toBe("Zahid");
        expect(wrapper.find("#email").element.value).toBe("zahid@mail.com");
        expect(wrapper.find("#message").element.value).toBe("Hello World");

        await wrapper.find("form").trigger("submit.prevent");

        expect(wrapper.emitted()).toHaveProperty("submit");

        wrapper.unmount();
    });
    it("emits a 'submit' event when the form is submitted", async () => {
        const wrapper = mount(ContactForm, {
            global: {
                plugins: [pinia],
            },
        });

        await wrapper.find("form").trigger("submit.prevent");

        expect(wrapper.emitted("submit")).toBeTruthy();

        wrapper.unmount();
    });
});