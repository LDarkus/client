<script setup>
import MyInput from "../components/MyInput.vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength, sameAs } from '@vuelidate/validators'
import { computed, ref } from "vue";
import axios from "axios";
import { UserRegistration } from "../services/ApiService"
import router from "../router";
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
const toast = useToast();
axios.defaults.baseURL = "http://localhost:80"



const emailField = ref("")
const passwordField = ref("")

const nameField = ref("")
const regEmailField = ref("")
const regPasswordField = ref("")
const confirmPassword = ref("")

let isActive = ref(false);
let authorizationFlag = ref();

const rules = computed(() => ({
    emailField: {
        email: helpers.withMessage("Некоретно введен email", email),
        required: helpers.withMessage("Поле должно быть заполненно", required),

    },
    passwordField: {
        minLength: helpers.withMessage("Длина пароля должна быть больше 6 символов", minLength(6)),
        required: helpers.withMessage("Поле должно быть заполненно", required),
    }
}))

const rules_1 = computed(() => ({

    regEmailField: {
        email: helpers.withMessage("Некоретно введен email", email),
        required: helpers.withMessage("Поле должно быть заполненно", required),

    },
    regPasswordField: {
        minLength: helpers.withMessage("Длина пароля должна быть больше 6 символов", minLength(6)),
        required: helpers.withMessage("Поле должно быть заполненно", required),

    },
    confirmPassword: {
        sameAsPassword: helpers.withMessage("Пароли не совпадают", sameAs(regPasswordField.value))
    },
    nameField: {
        required: helpers.withMessage("Поле должно быть заполненно", required),

    }


}))

const v = useVuelidate(rules, { emailField, passwordField })
const vv = useVuelidate(rules_1, { nameField, regPasswordField, regEmailField, confirmPassword })



const login = () => {
    v.value.$touch()

    if (!v.value.$error) {
        console.log("im doing");
        axios.post("api/auth/login", { email: emailField.value, password: passwordField.value })
            .then(res => {
                localStorage.setItem("access_token", res.data.access_token);
                router.push({ name: "home" })
            }).catch((error) => errorMessage(error))
    }
}

const registration = async () => {
    vv.value.$touch()
    let FIO = nameField.value.split(" ");
    if (!vv.value.$error) {
        const res = await UserRegistration({
            name: FIO[1],
            second_name: FIO[0],
            last_name: FIO[2],
            email: regEmailField.value,
            password: regPasswordField.value,
            password_confirm: regPasswordField.value
        });
        await router.push({ name: "home" });
    }
}

const changePage = () => {
    isActive.value = !isActive.value;
    emailField.value = "";
    passwordField.value = "";
    nameField.value = "";
    regEmailField.value = "";
    regPasswordField.value = "";
    confirmPassword.value = "";
    v.value.$reset();
    vv.value.$reset();
    authorizationFlag.value = false;
}

const errorMessage = (error) => {
    console.log(error.response.data.error);
    toast.add({ severity: 'error', summary: 'Ошибка авторизации!', detail: ` ${error ? error.response.data.error : "Нераспознанная ошибка"}`, life: 3150 });
}

</script>


<template>
    <div class="container" :class="{ 'right-panel-active': isActive }">
        <div class="form-container sign-up-container">
            <form @submit.prevent="registration">
                <h3 style="margin-bottom: 20px;">Зарегистрироваться</h3>

                <my-input name="name" placeholder="Введите ФИО" label="ФИО" v-model:value="vv.nameField.$model"
                    :error="vv.nameField.$errors" type="text" />
                <my-input name="regemail" placeholder="Введите email" label="email" v-model:value="vv.regEmailField.$model"
                    :error="vv.regEmailField.$errors" />
                <my-input name="regpassword" placeholder="Введите пароль" label="Пароль"
                    v-model:value="vv.regPasswordField.$model" :error="vv.regPasswordField.$errors" type="password" />
                <my-input name="conformPassword" placeholder="Введите пароль повторно" label="Пароль"
                    v-model:value="vv.confirmPassword.$model" :error="vv.confirmPassword.$errors" type="password" />


                <button>Зарегистрироваться</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form @submit.prevent="login">
                <h2 style="margin-bottom: 20px;">Войти</h2>

                <my-input name="email" placeholder="Введите email" label="email" v-model:value="v.emailField.$model"
                    :error="v.emailField.$errors" />
                <my-input name="password" placeholder="Введите пароль" label="Пароль" v-model:value="v.passwordField.$model"
                    :error="v.passwordField.$errors" type="password" />

                <Toast></Toast>
                <a href="#">Забыли пароль?</a>
                <button>Войти</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <button class="ghost" @click="changePage">Войти</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <button class="ghost" @click="changePage">Зарегистрироваться</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
    box-sizing: border-box;
}

body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
    width: 100%;
    height: 100%;
}

h1 {
    font-weight: bold;
    margin: 0;
}

h2 {
    text-align: center;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
    border-radius: 20px;
    border: 1px solid #FF4B2B;
    background-color: #FF4B2B;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
}

form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;

}



.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    margin-top: 100px;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #FF416C;
    background: -webkit-linear-gradient(to right, #FF4B2B, #0B5ED7);
    background: linear-gradient(to right, #FF4B2B, #0B5ED7);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #DDDDDD;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

.labelEror {
    background-color: #FF647C;
    border-radius: 7px;
    padding: 10px;
    color: white;
}
</style>