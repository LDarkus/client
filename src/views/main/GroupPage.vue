<script setup>
import FileUpload from 'primevue/fileupload'
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { computed, onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
// Импорт компонента Dropdown из PrimeVue
import Dropdown from 'primevue/dropdown';


import { ExportFileInServer, GetGroups, UpdateStudentsInfo, UpdateGroupsStatus } from '../../services/ApiService';


const toast = useToast();
const file = ref(null);

// const visible = ref(false);
const groups = ref();

const showModal = ref(false);
const selectedGroup = ref(null);
const updatedRows = ref([]);

let previousData = ref(null);


//Отправка ворд документа на сервер
const myUploader = async (event) => {
    //Метод для вывода сообщения
    try {
        let mes = await ExportFileInServer(event)
        console.log(mes);
        GetGroups().then(res => groups.value = res)

        if (mes.status == 200) {
            toast.add({ severity: 'success', summary: 'Успешно!', detail: mes.data, life: 3000 });
        }
        else {
            toast.add({ severity: 'warn', summary: 'Внимание!', detail: mes.data, life: 3000 });
        }
    }
    catch (error) {
        toast.add({ severity: 'error', summary: 'Ошибка!', detail: `При загрузке файла произошла ошибка ${error}`, life: 3150 });

    }
}



onMounted(() => {
    GetGroups().then(res => groups.value = res)


})




const showDialog = (group) => {
    showModal.value = true;
    selectedGroup.value = group;
};

const closeDialog = () => {
    sendUpdatedRows();
    showModal.value = false;
    selectedGroup.value = null;
};



const updateSubgroup_updateCheckbox = (data, val, flag) => {
    const index = updatedRows.value.findIndex(row => row.id === data.id);
    if (flag) {
        if (index === -1) {
            // Если значение подгруппы изменилось и строка еще не была добавлена, добавляем строку в массив updatedRows
            updatedRows.value.push(data);
            // Обновляем значение подгруппы
            data.subgroup = val;
        } else {
            // Если строка уже была добавлена, обновляем значение подгруппы напрямую
            updatedRows.value[index].subgroup = val;
        }
    }
    else {
        if (index === -1) {
            // Если значение чекбокса изменилось и строка еще не была добавлена, добавляем строку в массив updatedRows
            updatedRows.value.push(data);
            // Обновляем значение чекбокса
            data.isActive = val;
        } else {
            // Если строка уже была добавлена, обновляем значение чекбокса напрямую
            updatedRows.value[index].isActive = val;
        }
    }

}



const sendUpdatedRows = async () => {
    let answer = { mes: "", status: 0 };
    if (updatedRows.value.length === 0) {
        answer.mes = "Данных для изменения не было зафиксировано"
        answer.code = 201

    } else {
        try {
            // Сравниваем данные в массиве updatedRows с previousData
            if (JSON.stringify(updatedRows.value) === JSON.stringify(previousData)) {
                answer.mes = "Изменений не было зафиксировано";
                answer.status = 201;
                return;
            }

            // Отправляем измененные строки на сервер с помощью PUT-запроса

            // Обрабатываем ответ от сервера

            await UpdateStudentsInfo(updatedRows);

            // Обновляем значение previousData
            previousData = updatedRows.value;

            // Очищаем массив updatedRows
            updatedRows.value = [];

            answer.mes = "Данные студентов успешно обновлены"
            answer.code = 200
        } catch (error) {
            // Обрабатываем ошибку
            answer.mes = "Произошла ошибка при отправке данных на сервер", error;
            answer.code = 500;
        }
    }

    ShowMessage(answer.mes, answer.code);

};

const ShowMessage = (message, code) => {
    if (code == 200) {
        toast.add({ severity: 'success', summary: 'Успешно!', detail: message, life: 3000 });
    } else if (code == 201) {
        toast.add({ severity: 'warn', summary: 'Внимание!', detail: message, life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Ошибка!', detail: message, life: 6000 });
    }
}

const updataGroupStatus = async (data, val) => {
    let resp = await UpdateGroupsStatus(data);
    ShowMessage(resp.data, resp.status);
}

</script>

<template>
    <div class="h3">Список групп студентов</div>
    <div class="card flex justify-content-end">
        <Toast />
        <FileUpload mode="basic" :name="file" :customUpload="true" @uploader="myUploader" accept=".docx"
            :maxFileSize="1000000" :auto="true" chooseLabel="Загрузить" />
    </div>

    <div class="card w-100 m-auto">
        <DataTable :value="groups" :sort-field="'isActive'" :sort-order="-1" tableStyle="min-width: 40rem">
            <Column field="id" header="Code" style="width: 10%;"></Column>
            <Column field="name" sortable header="Наименование группы" style="width: 45%;"></Column>
            <Column field="isActive" sortable header="Актуальность" style="width: 20%;"> :headerStyle="{ 'text-align':
                'center' }"
                :sortable="true" >
                <template #body="{ data }">
                    <div style="text-align: center;">
                        <InputSwitch v-model="data.isActive" :true-value="1" :false-value="0"
                            @input="val => updataGroupStatus(data, val, 0)" />
                    </div>
                    <span>{{ data.isActive }}</span>
                </template>
            </Column>
            <Column header="Подробнее" style="width: 25%;">
                <template #body="slotProps">
                    <Button :disabled="slotProps.data.isActive == 0" label="Список группы" icon="pi pi-external-link"
                        @click="showDialog(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showModal" modal header="Список студентов" :style="{ width: '50rem' }">
            <DataTable :value="selectedGroup?.students" :sort-field="'isActive'" :sort-order="-1"
                tableStyle="min-width: 40rem">
                <Column field="id" header="#" style="width: 10%;">
                    <template #body="{ index }">
                        {{ index + 1 }}
                    </template>
                </Column>
                <Column field="name" sortable header="ФИО" style="width: 30%;"></Column>
                <Column field="subgroup" sortable header="Подгруппа" style="width: 20%;"
                    :headerStyle="{ 'text-align': 'center' }">
                    <template #body="{ data }">
                        <div style="text-align: center;">
                            <Dropdown v-model="data.subgroup" :placeholder="String(data.subgroup)" :options="[1, 2]"
                                @update:modelValue="val => updateSubgroup_updateCheckbox(data, val, 1)">
                            </Dropdown>
                        </div>
                    </template>
                </Column>
                <Column field="isActive" header="Актуальность" style="width: 40%;" :headerStyle="{ 'text-align': 'center' }"
                    :sortable="true">
                    <template #body="{ data }">
                        <div style="text-align: center;">
                            <InputSwitch v-model="data.isActive" :true-value="1" :false-value="0"
                                @input="val => updateSubgroup_updateCheckbox(data, val, 0)" />
                        </div>
                        <span>{{ data.isActive }}</span>
                    </template>
                </Column>
            </DataTable>
            <template #footer>
                <Button class="mt-2" severity="success" label="Сохранить" @click="closeDialog" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>.p-datatable .p-datatable-thead th {
    text-align: center;
}</style>