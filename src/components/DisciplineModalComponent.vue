<script setup>


const props = defineProps([{
    disciplinesList: {
        type: Array,
        required: false,
        default: [
            { name: 'ТРПК' },
            { name: 'Информатика' },
            { name: 'АСУИУ' },
            { name: 'Проектирование инфомационых систем' },
            { name: 'Физика' },
            { name: 'Экономика' }

        ]
    },
    
}
])

</script>

<template>
    <Dialog v-model:visible="showModal" modal header="Формирование дисциплины" :style="{ width: '65rem' }">
        <div class="row">
            <div class="col-12 h3 text-center">Формирование дисциплины на семестр</div>
        </div>
        <div class="row mt-3">
            <div class="col-6">
                <div class="p-float-label">

                    <Dropdown v-model="disciplineName" inputId="dd-city" :options="disciplinesList" optionLabel="name"
                        placeholder="Выберите дисциплину" class="w-full md:w-14rem" />
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
                    <Calendar v-model="disciplineYear" placeholder="Выберите год" showIcon view="year" dateFormat="yy" />
                </div>
            </div>
            <div class="col-6">
                <div class="card flex justify-content-center w-75">
                    <MultiSelect v-model="disciplineGroups" :options="selectedDirection" optionLabel="name"
                        optionGroupLabel="name" optionGroupChildren="groups" display="chip" placeholder="Выберите группы"
                        class="w-full md:w-20rem" filter>
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
                    <Dropdown v-model="disciplineType" inputId="dd-city" optionLabel="name" :options="disciplineTypes"
                        placeholder="Выберите тип" class="w-full md:w-14rem" />
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
</template>

<style scoped></style>