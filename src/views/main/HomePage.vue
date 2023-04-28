<script setup>
import api from "../../services/api"
import BaseMenu from "../../components/BaseMenu.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import axios from "axios";
import router from "../../router";

let res = ref("");
onBeforeMount(async () => {
    // try {
    //     await api.get('/api/auth/groups').then(r => res.value = r.data)
    //     console.log(res);
    // }
    // catch (err) {
    //     console.log(err);
    // }
});


const logout = () => {
    api.post("/api/auth/logout").catch((er) => { console.log("тут ошибка") });

    localStorage.removeItem("access_token");
    router.push({ name: "login" });
}
</script>

<template>
    <div class="row homeContainer" style="">
        <div class="col-2 left-menu">
            <base-menu></base-menu>
        </div>
        <div class="col-8 pt-5">

            <router-view></router-view>
        </div>
        <div class="col-2 pt-5">
            <input type="submit" value="Выйти" class="btn btn-danger rounded-3" @click="logout" />
        </div>
    </div>
</template>

<style >


.left-menu {
    padding: 0;
    height: 100%;
    background-color: #0B5ED7;
    min-width: 200px;

}

.homeContainer {
    margin: 0;
    height: 100%;
}
</style>