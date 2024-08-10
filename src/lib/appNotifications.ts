import { AppNotification } from "../types/app";
import { useNotificationStore } from "../stores/notificationStore";

export const notify = async (notification: AppNotification) => {
    const appNotifications = useNotificationStore()
    appNotifications.addNotification(notification)
    setTimeout(()=> {
        appNotifications.popNotification()
    }, notification.visibleFor)
}