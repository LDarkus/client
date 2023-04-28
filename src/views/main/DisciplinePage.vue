<script setup>
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import DynamicDialog from 'primevue/dynamicdialog';
import { computed, ref, watch } from 'vue';
import { useDialog } from 'primevue/usedialog';

const dialog = useDialog();

let date_year = ref();
const getYearFromDate = computed(() => {
    console.log(date_year);
    if (date_year.value == null) {
        return new Date().getFullYear()
    }
    else {
        let y = parseInt(String(date_year.value).substring(11, 15));
        console.log(parseInt(y));
        if (y < 2010 || y > 2030) {
            return null
        }
        else
            return String(date_year.value).substring(11, 15)
    }
});


</script>

<template>
    <div class="container">
        <div class="row" style="margin-top: 150px;">
            <div class="col-2"></div>
            <div class="col-3">
                <Calendar v-model="date_year"  placeholder="Выберите год" showIcon view="year" dateFormat="yy" />
            </div>
            <div class="col-2"></div>
            <div class="col-5">
                <Button label="Сформировать дисциплину" icon="pi pi-search"  />

                
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-2"></div>
            <div class="col-10 fs-3">Год {{ getYearFromDate }}</div>
        </div>
        <div class="row mt-1">
            <div class="col-2"></div>
            <div class="col-10 fs-3">Сформированные дисциплины</div>
        </div>
    </div>
</template>

<style  scoped></style>