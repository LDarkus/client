<script setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
  error: {
    type: Array,
    required: false
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '300px'
  }
})

const updateValue = (e) => {
  emit('update:value', e.target.value)
}
</script>

<template>
  <div class="form-input" :style="{width: width}">
    <input
      class="input-text"
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue">
    <label :for="name" class="input-label">{{label}}</label>
    <TransitionGroup>
      <div
        class="form-error"
        v-for="element of error"
        :key="element.$uid">
        <div class="form-error__message">{{element.$message}}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --primary: #6979f8;
  --primary-hover: #A5AFFB;
  --second: #BE52F2;
  --second-hover: #DBA5F5;
  --success: #00C48C;
  --success-hover: #7DDFC3;
  --info: #0084F4;
  --info-hover: #66B5F8;
  --warning: #FFA26B;
  --warning-hover: #FFC7A6;
  --danger: #FF647C;
  --danger-hover: #FDAFBB;
}
.form {
  &-input {
    margin-bottom: 30px;
    position: relative;
  }
  &-error {
    background: #FF647C;
    margin-top: 4px;
    border-radius: 7px;
    font-size: 13px;
    color: #ffffff;
    padding: 5px 5px 5px 15px;
  }
}
.input {
  &-text {
  border: 1px solid #6979f8;
  padding: 0 10px;
  height: 40px;
  border-radius: 7px;
  font-size: 15px;
  width: 100%;
  position: relative;
  z-index: 1;
    &:focus {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
    &:not(:placeholder-shown) {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
  }
  &-label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 20px;
    opacity: 0;
    z-index: -1;
    transition: .3s;
    font-size: 13px;
    color: #0084F4;
    
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


</style>