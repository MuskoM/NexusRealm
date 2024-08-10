import { defineStore } from "pinia";
import { ref } from "vue";
import { AppNotification } from "../types/app";

export const useNotificationStore = defineStore("appNotification", ()=> {
    const notifications = ref<AppNotification[]>([])
    
    const addNotification = (notification: AppNotification) => {
        notifications.value.push(notification)
        console.log("Added", notifications.value)
    }

    const popNotification = () => {
        notifications.value.pop()
        console.log("Removed", notifications.value)
    }

    return {notifications, addNotification, popNotification}
})