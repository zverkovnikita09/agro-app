import { ApplicationsState } from "@entities/Applications";
import { AuthState } from "@entities/Auth";
import { FiltersState } from "@widgets/Filters";
import { NotificationState } from "@entities/Notifications";
import { SortState } from "@widgets/Sort";

export interface RootState {
  notifications: NotificationState;
  auth: AuthState;
  applications: ApplicationsState;
  filters: FiltersState;
  sort: SortState;
}