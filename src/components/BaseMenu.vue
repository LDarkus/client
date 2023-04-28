<script setup>
import LeftMenuItem from './LeftMenuItem.vue';
import { PrimeIcons } from 'primevue/api';



</script>

<template>
    <div class="leftMenu">
        <div class="Logo">
            <i  :class="PrimeIcons.FACEBOOK"></i>
        </div>
        <left-menu-item to="/" :is-active="true" :icon="PrimeIcons.HOME">Главная</left-menu-item>
        <left-menu-item to="schedules" :is-active="true" :icon="PrimeIcons.HOME">Расписание</left-menu-item>
        <left-menu-item to="disciplines" :is-active="true" :icon="PrimeIcons.HOME">Дисциплины</left-menu-item>
        <left-menu-item to="groups" :is-active="true" :icon="PrimeIcons.HOME">Группы</left-menu-item>
    </div>
</template>

<style scoped>
.Logo{
    width: 100%;
    min-height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Logo i{
    font-size: 6rem;
    color: white;
    border-radius: 100%;

}
.leftMenu {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 0;
    height: 100%;
    
}

</style>