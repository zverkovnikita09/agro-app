import { ApplicationsState } from "@entities/Applications";
import { AuthState } from "@entities/Auth";
import { NotificationState } from "@entities/Notifications";

export interface RootState {
  notifications: NotificationState;
  auth: AuthState;
  applications: ApplicationsState;
}