import { useAppDispatch } from "@app/store";
import {
  AuthSelectors,
  removeUserPhone,
  setRefetchCodeTime,
  setToken,
} from "@entities/Auth";
import { addNotification, NotificationType } from "@entities/Notifications";
import {
  useCodeVerificationMutation,
  useLoginMutation,
} from "@entities/User/model/User.api";
import { COLORS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { GilroyText } from "@shared/ui/GilroyText";
import { OTPInput } from "@shared/ui/OTPInput";
import { Title } from "@shared/ui/Title";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const OTP = () => {
  const [otp, setOtp] = useState("");
  const phoneNumber = useSelector(AuthSelectors.selectPhoneNumber);
  const refetchCodeTime = useSelector(AuthSelectors.selectRefetchCodeTime);
  const dispatch = useAppDispatch();

  const [handleVerification, { isLoading: isVerificationLoading }] =
    useCodeVerificationMutation();
  const [login] = useLoginMutation();

  const onSubmit = async () => {
    if (otp.length < 5) return;
    try {
      const response = await handleVerification({
        phone_number: phoneNumber!,
        code: otp,
      });

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
      dispatch(setToken(response.data.token));
      dispatch(removeUserPhone());
      router.navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const refetchCode = async () => {
    try {
      const response = await login({ phone_number: phoneNumber! });

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
      dispatch(setRefetchCodeTime(60));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!refetchCodeTime) return;
    const interval = setInterval(() => {
      dispatch(setRefetchCodeTime(refetchCodeTime - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [refetchCodeTime]);

  return (
    <>
      <Title>Вход</Title>
      <GilroyText style={styles.text} fontSize={13}>
        Мы отправили вам СМС с кодом подтверждения{"\n"} на номер {phoneNumber}
      </GilroyText>
      <OTPInput
        onChange={setOtp}
        otp={otp}
        style={styles.otpBlock}
        onSubmit={onSubmit}
      />
      {refetchCodeTime ? (
        <GilroyText style={styles.refetchCode}>
          Отправить повторно через 00:
          {refetchCodeTime < 10 ? `0${refetchCodeTime}` : refetchCodeTime}
        </GilroyText>
      ) : (
        <Button
          onPress={refetchCode}
          style={styles.refetchCode}
          color={COLORS.primaryYellow}
        >
          Запросить повторно
        </Button>
      )}
      <Button
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.L}
        style={styles.submitButton}
        disabled={otp.length < 5}
        onPress={onSubmit}
        isLoading={isVerificationLoading}
      >
        Подтвердить
      </Button>
      <Button
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.L}
        style={styles.changePhoneButton}
        onPress={() => dispatch(removeUserPhone())}
        fontWeight="bold"
      >
        Сменить номер для отправки
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 32,
  },
  submitButton: {
    marginTop: 24,
  },
  changePhoneButton: {
    marginTop: 16,
  },
  refetchCode: {
    paddingTop: 16,
  },
  otpBlock: {
    marginTop: 32,
  },
  text: {
    textAlign: "center",
    marginTop: 16,
  },
});
