import { StepOne, StepThree, StepTwo } from "@entities/ProfileForm";
import { UserInfo } from "@entities/User";
import { useGetUserDataQuery } from "@entities/User/model/User.api";
import { CameraIcon } from "@images/svg/CameraIcon";
import { COLORS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { GilroyText } from "@shared/ui/GilroyText";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { Title } from "@shared/ui/Title";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

export const EditProfilePage = () => {
  const { data: userInfo, isLoading, isError } = useGetUserDataQuery();

  const initialAvatar =
    userInfo?.files?.find(({ type }) => type === "Аватар")?.path_url ?? "";

  const { id } = useLocalSearchParams<{ id: string }>();
  const [step, setStep] = useState<1 | 2 | 3>(3);

  const methods = useForm<UserInfo>();

  const { handleSubmit } = methods;

  const onSubmit = (data: UserInfo) => {};

  const ButtonsProps = () => {
    switch (step) {
      case 1:
        return {
          next: { func: () => setStep(2), text: "Далее" },
          prev: {
            func: () => router.push(`/main/profile/${id}`),
            text: "Отмена",
          },
        };
      case 2:
        return {
          next: { func: () => setStep(3), text: "Далее" },
          prev: {
            func: () => setStep(1),
            text: "Назад",
          },
        };
      case 3:
        return {
          next: { func: handleSubmit(onSubmit), text: "Отправить" },
          prev: {
            func: () => setStep(2),
            text: "Назад",
          },
        };
      default:
        return {
          next: { func: () => {}, text: "Далее" },
          prev: { func: () => {}, text: "Назад" },
        };
    }
  };

  const getCurrentStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <></>;
    }
  };

  if (isLoading) return <LoadingBlock />;

  return (
    <ScrollView style={styles.wrapper} keyboardShouldPersistTaps={"handled"}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <CameraIcon width={40} height={40} />
        </View>
        <View>
          <Title fontWeight="bold" fontSize={17}>
            Личный кабинет
          </Title>
          <GilroyText color={COLORS.blackGrey} style={{ marginTop: 12 }}>
            Заполните свои личные данные
          </GilroyText>
        </View>
      </View>
      <FormProvider {...methods}>{getCurrentStep()}</FormProvider>
      {userInfo?.type && (
        <Button
          style={{ marginTop: 24, alignSelf: "baseline" }}
          color={COLORS.error}
          fontWeight="regular"
          withConfirm
          confirmProps={{
            title: "Вы действительно хотите очистить свой профиль?",
            additionalText:
              "Внимание! В случае очистки кабинета данные удалятся безвозвратно",
          }}
        >
          Очистить данные профиля
        </Button>
      )}
      <View style={styles.buttons}>
        <Button
          size={ButtonSize.M}
          theme={ButtonTheme.OUTLINE}
          onPress={ButtonsProps().prev.func}
        >
          {ButtonsProps().prev.text}
        </Button>
        <Button
          size={ButtonSize.M}
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          onPress={ButtonsProps().next.func}
        >
          {ButtonsProps().next.text}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
  },
  header: {
    paddingTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.specialGrey2,
    borderRadius: 76 / 2,
    width: 76,
    height: 76,
  },
  buttons: {
    gap: 8,
    marginTop: 24,
    paddingBottom: 24,
  },
});
