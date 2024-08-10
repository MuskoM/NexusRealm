export interface AppNotification {
  level: "error" | "info" | "warning";
  content: string;
  visibleFor: number;
}
