<script lang="ts" setup>
import { useNotificationStore } from '../stores/notificationStore';
import Toast from './elements/Toast.vue';

const appNotifications = useNotificationStore()
</script>

<template>
    <div class="wrapper">
        <TransitionGroup>
            <Toast :level="notification.level" :key="notification.content" v-for="notification in appNotifications.notifications">{{
                notification.content }}</Toast>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.wrapper {
    @apply absolute bottom-0 right-0 transition-all duration-300 overflow-hidden;
}

.v-enter-from {
    opacity: 0;
    translate: 0px 100px;
}

.v-enter-to {
    opacity: 1;
    translate: 0px 0px;
}

.v-enter-active {
    transition: all 0.7s;
}
</style>