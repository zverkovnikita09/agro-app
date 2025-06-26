import { store } from "@app/store";
import { usersApi } from "@entities/Auth";
import { clearExpoPushToken } from "@app/store/model/expoPushTokenSlice";
import { RootState } from "@app/store";

export const logoutUser = async () => {
    const state: RootState = store.getState();
    const expoPushToken = state.expoPushToken.deviceToken;

    try {
        if (expoPushToken) {
            await store.dispatch(
                usersApi.endpoints.logout.initiate(expoPushToken)
            ).unwrap();
        }
    } catch (error) {
        console.error("Ошибка при logout:", error);
    }

    store.dispatch(clearExpoPushToken());
};
