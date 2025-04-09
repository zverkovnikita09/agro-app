import { useAppDispatch } from "@app/store";
import { setTimeOfLogin, setUserPhone, useLoginMutation } from "@entities/Auth";
import { addNotification, NotificationType } from "@entities/Notifications";
import { isIOS } from "@shared/lib/checkPlatform";
import { PHONE_MASK } from "@shared/lib/masks";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { GilroyText } from "@shared/ui/GilroyText";
import { Input } from "@shared/ui/Input";
import { Title } from "@shared/ui/Title";
import { useState } from "react";
import { StyleSheet } from "react-native";

const phoneLength = 12;

export const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async () => {
    try {
      const response = await login({ phone_number: phoneNumber });

      if (response.error) {
        dispatch(
          addNotification({
            type: NotificationType.ERROR,
            id: performance.now().toString(),
            message: (response.error as any).data.message,
          })
        );
        return;
      }
      dispatch(setTimeOfLogin(new Date().getTime()));
      dispatch(setUserPhone(phoneNumber));
      dispatch(
        addNotification({
          type: NotificationType.SUCCESS,
          id: performance.now().toString(),
          message: response.data.user.code,
          timeout: 10000,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Title>Вход</Title>
      <GilroyText style={styles.text}>
        Сельско-хозяйственные грузоперевозки по всей России
      </GilroyText>
      <Input
        type="mask"
        placeholder="Ваш номер телефона"
        keyboardType={isIOS ? "numbers-and-punctuation" : "phone-pad"}
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={phoneLength}
        mask={PHONE_MASK}
      />
      <Button
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.L}
        style={styles.button}
        onPress={onSubmit}
        disabled={phoneNumber.length < phoneLength}
        isLoading={isLoading}
      >
        Далее
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 32,
  },
  button: {
    marginTop: 24,
  },
  text: {
    textAlign: "center",
    marginTop: 16,
  },
});
