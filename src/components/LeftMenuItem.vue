<script setup>

const props = defineProps({
    to: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String
    }

});

</script>

<template>
    <router-link class="LeftMenuItem-container" :to="props.to" v-slot="{ isExactActive }">
        <div class="leftMenuItem" :class="[isExactActive ? 'leftMenuItem-active' : '']">
            <div class="LeftActiveIcon" :style="[isExactActive ? 'visibility: visible' : 'visibility: hidden']"></div>
            <div class="LeftMenuItem-text">
                <i :class="icon"></i>
                <p style="margin:  0;"><slot></slot></p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>

.LeftMenuItem-container{
    text-decoration: none;
}
.leftMenuItem {
    color: rgba(255, 255, 255, .65);
    display: flex;
    flex-direction: row;
    height: 30px;

}

.leftMenuItem-active {
    color: white;
}

.LeftActiveIcon {
    background-color: white;
    height: 100%;
    width: 5px;
    border-radius: 0 25% 25% 0;
    margin-right: 15px;

}
.LeftMenuItem-text{
    display: flex;
    flex-direction: row;
    justify-content: center;

}

.LeftMenuItem-text i{
    line-height: inherit;
    padding-right: 10px;

}
</style>