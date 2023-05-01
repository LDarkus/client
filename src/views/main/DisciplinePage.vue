<script setup>
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';
import DynamicDialog from 'primevue/dynamicdialog';
import { computed, ref, onMounted, watch } from 'vue';
import { useDialog } from 'primevue/usedialog';
import MyInput from '../../components/MyInput.vue';
import { GetDirections, CreateDiscipline, GetDisciplines } from '../../services/ApiService';

//Нужно для модального окна 
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';


const disciplinesList = ref([
    { name: 'ТРПК' },
    { name: 'Информатика' },
    { name: 'АСУИУ' },
    { name: 'Проектирование инфомационых систем' },
    { name: 'Физика' },
    { name: 'Экономика' }

]);

const selectedDirection = ref()
const directions = ref();

const disciplines = ref();

// ---------------------------------------- сделать динамеское изменение используя watch слушать нужно будет направление

const toast = useToast();
const showModal = ref();
const disciplineName = ref();
const disciplineYear = ref();
const disciplineSemester = ref();
const disciplineType = ref();
const disciplineGroups = ref();

const disciplineSearche = ref("");
const yearSearche = ref("");

const disciplineTypes = [
    { name: "Все (Лекция, лабораторная работы, практика)", key: 0 },
    { name: "Лекция, лабораторая работа", key: 1 },
    { name: "Лекция, практика", key: 2 },
    { name: "Лекция", key: 3 },
];

const year = computed(() => {
    if (disciplineYear.value == null) {
        return new Date().getFullYear()
    }
    else {
        let y = parseInt(String(disciplineYear.value).substring(11, 15));
        console.log(parseInt(y));
        if (y < 2010 || y > 2030) {
            return null
        }
        else
            return String(disciplineYear.value).substring(11, 15)
    }
});

let date_year = ref();
const getYearFromDate = computed(() => {
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



const showDialog = () => {
    showModal.value = true;
};

const closeDialog = () => {
    showModal.value = false;
}

const createDiscipline = async () => {
    const resp = await CreateDiscipline(
        disciplineName.value.name,
        disciplineGroups.value,
        year.value,
        disciplineSemester.value,
        disciplineType.value.key);

    console.log(resp);

}

const sortedDisciplines = computed(() => {

    if (!disciplineSearche.value && !yearSearche.value)
        return disciplines.value
    else
        return disciplines.value.filter(dis => {
            dis.discipline.name.toLowerCase().includes(disciplineSearche.value.toLowerCase())
            if (disciplineSearche.value && yearSearche.value) {
                return dis.discipline.name.toLowerCase().includes(disciplineSearche.value.toLowerCase()) && dis.year.includes(yearSearche.value);
            } else if (disciplineSearche.value) {
                return dis.discipline.name.toLowerCase().includes(disciplineSearche.value.toLowerCase())
            } else if (yearSearche.value) {
                return dis.year.includes(yearSearche.value)
            }
        });
})

onMounted(() => {
    GetDirections().then(res => directions.value = res)
    GetDisciplines().then(res => { disciplines.value = res; console.log(disciplines.value); })

})
const test = () => console.log(disciplineName.value.name);
</script>

<template>
    <div class="container">


        <div class="row mt-4">

            <div class="col-10 fs-3">Год {{ getYearFromDate }}</div>
        </div>
        <div class="row mt-1">

            <div class="col-10 fs-3">Сформированные дисциплины</div>
        </div>

        <div class="row justify-content-end">
            <div class="col-5">
                <div class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="disciplineSearche" style="width: 22rem;"
                        placeholder="Поиск по наименованию дисциплны" />
                </div>
            </div>
            <div class="col-3">
                <div class="p-input-icon-left ">
                    <i class="pi pi-search" />
                    <InputText v-model="yearSearche" style="width: 10rem; " placeholder="Поиск по году" />
                </div>
            </div>

            <div class="col-4">
                <div class="">
                    <Button label="Сформировать дисциплину" icon="pi pi-plus" @click="showDialog()" />
                </div>
            </div>
        </div>



        <DataTable :value="sortedDisciplines" class="mt-3" scrollable scrollHeight="400px" tableStyle="min-width: 40rem">
            <Column field="discipline.name" sortable header="Наименование дисциплины"
                style="width: 35%; font-weight: 700 ;"></Column>
            <Column field="year" sortable header="Учебный год" style="width: 10%;"></Column>
            <Column field="semester" sortable header="Семестр" style="width: 10%;"></Column>
            <Column field="discipline_groups" header="Прикрепленный группы" style="width: 30%;">
                <template #body="{ data }">
                    <div v-for="item in data.discipline_groups" :key="item.id">
                        {{ item.group.name }}
                    </div>
                </template>
            </Column>
            <Column field="semester" header="Подробнее" style="width: 15%;"></Column>

        </DataTable>









        <div>
            <Dialog v-model:visible="showModal" modal header="Формирование дисциплины" :style="{ width: '65rem' }">
                <div class="row">
                    <div class="col-12 h3 text-center">Формирование дисциплины на семестр</div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <div class="p-float-label">

                            <Dropdown v-model="disciplineName" inputId="dd-city" :options="disciplinesList"
                                optionLabel="name" placeholder="Выберите дисциплину" class="w-full md:w-14rem" />
                            <label for="dd-city">дисциплина</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-float-label">
                            <MultiSelect v-model="selectedDirection" :options="directions" filter optionLabel="name"
                                placeholder="Выберите направления" display="chip" id="direction" :maxSelectedLabels="3"
                                class="w-full md:w-20rem" />
                            <label for="direction">Направления</label>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-6">
                        <div class="p-float-label " :style="{ minWidth: '100px' }">
                            <Calendar v-model="disciplineYear" placeholder="Выберите год" showIcon view="year"
                                dateFormat="yy" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card flex justify-content-center w-75">
                            <MultiSelect v-model="disciplineGroups" :options="selectedDirection" optionLabel="name"
                                optionGroupLabel="name" optionGroupChildren="groups" display="chip"
                                placeholder="Выберите группы" class="w-full md:w-20rem" filter>
                                <template #optiongroup="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </MultiSelect>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-6">
                        <div class="p-float-label">
                            <Dropdown v-model="disciplineSemester" inputId="dd-city" :options="[1, 2]"
                                placeholder="Выберите семестр" class="w-full md:w-14rem" />
                            <label for="dd-city">Семестр</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-float-label">
                            <Dropdown v-model="disciplineType" inputId="dd-city" optionLabel="name"
                                :options="disciplineTypes" placeholder="Выберите тип" class="w-full md:w-14rem" />
                            <label for="dd-city">Тип занятий</label>
                        </div>
                    </div>
                </div>
                <button @click="test">111</button>
                <template #footer>
                    <Button class="mt-2" severity="eror" label="Закрыть" @click="closeDialog" />
                    <Button class="mt-2" severity="success" label="Сформировать" @click="createDiscipline" />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<style  scoped></style>