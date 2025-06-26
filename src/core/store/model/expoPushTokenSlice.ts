import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpoPushTokenState {
    deviceToken: string | null;
}

const initialState: ExpoPushTokenState = {
    deviceToken: null,
};

const expoPushTokenSlice = createSlice({
    name: 'expoPushToken',
    initialState,
    reducers: {
        setExpoPushToken: (state, action: PayloadAction<string>) => {
            state.deviceToken = action.payload;
        },
        clearExpoPushToken: (state) => {
            state.deviceToken = null;
        },
    },
});

export const { setExpoPushToken, clearExpoPushToken } = expoPushTokenSlice.actions;
export default expoPushTokenSlice.reducer;
