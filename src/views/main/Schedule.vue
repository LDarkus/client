<script setup>
import { computed, onMounted, ref } from 'vue';
import api from '../../services/api';

let a = [1, 2, 3, 4, 5];
let schedules = ref();
const getSchedule = async () => {
    await api.get("/api/auth/schedules").then(res => {
        schedules.value = res.data
        console.log(res.data)
        console.log(schedules);
        return res
    });
}

onMounted(() => {
    getSchedule();
})
</script>

<template>
    <button class="btn btn-primary" @click="getSchedule">Получить</button>
    <div class="m-4"><span style="font-size: 34px;">Пары на неделю</span>
        <div class="day pt-5" v-for="(lessons,key) in schedules" :key="key">
            <div class="mb-4">{{ key }}</div>
            <div class="d-flex " v-for="lesson in lessons" :key="lesson">
                <div class="me-4">{{  }}</div>
                <div class="flex-column me-4" style="width: 250px;">
                    <div class="">{{lesson.lesson_type}}</div>
                    <div class="">{{ lesson.discipline_verbose }}</div>
                    <div class="">{{lesson.groups_verbose}}</div>
                </div>
                <div class="">{{lesson.auditories_verbose }}</div>
            </div>
        </div>
    </div>
</template>

<style></style>