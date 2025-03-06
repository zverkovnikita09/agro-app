import {
  GENDER_OPTIONS,
  INVALID_DOCUMENTS,
  ProfileForm,
  StepOne,
  StepThree,
  StepTwo,
  useCreateAvatarMutation,
  useCreateFilesMutation,
  useDeleteFilesMutation,
  useDeleteUserProfileMutation,
  useUpdateAvatarMutation,
  useUpdateFilesMutation,
  useUpdateUserProfileMutation,
} from "@entities/ProfileForm";
import { convertFilesToFormData } from "@entities/ProfileForm/lib/ProfileForm.lib";
import { UserInfo } from "@entities/User";
import { useGetUserDataQuery } from "@entities/User/model/User.api";
import { CameraIcon } from "@images/svg/CameraIcon";
import { useSendQueryHandler } from "@shared/hooks/useSendQueryHandler";
import { Routes } from "@shared/lib/constants";
import { COLORS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { FilePicker } from "@shared/ui/FilePicker";
import { GilroyText } from "@shared/ui/GilroyText";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { Title } from "@shared/ui/Title";
import { DocumentPickerAsset } from "expo-document-picker";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export const EditProfilePage = () => {
  const { data: userInfo, isLoading, isError, refetch } = useGetUserDataQuery();
  const sendHandler = useSendQueryHandler({
    successMessage: "Данный профиля успешно изменены",
  });
  const [createAvatar, {}] = useCreateAvatarMutation();
  const [updateAvatar, {}] = useUpdateAvatarMutation();
  const [updateUser] = useUpdateUserProfileMutation();
  const [createFiles] = useCreateFilesMutation();
  const [updateFiles] = useUpdateFilesMutation();
  const [deleteFiles] = useDeleteFilesMutation();

  const [newAvatar, setNewAvatar] = useState<DocumentPickerAsset | null>(null);

  const {
    files: userFiles,
    accountant_phone,
    bdate,
    cfull_name,
    cinn,
    cregion,
    cshort_name,
    department,
    department_code,
    director_lastname,
    director_name,
    director_surname,
    email,
    full_name,
    gender,
    inn,
    issue_date_at,
    juridical_address,
    kpp,
    moderation_status,
    name,
    number,
    office_address,
    ogrn,
    okved,
    patronymic,
    region,
    series,
    short_name,
    snils,
    surname,
    tax_system,
    type,
  } = userInfo ?? {};

  const initialAvatar =
    userFiles?.find(({ type }) => type === "Аватар")?.path_url ?? "";

  const userDocs = userFiles?.filter(
    (file) => !INVALID_DOCUMENTS.includes(file.type)
  );

  console.log(newAvatar);

  const { id } = useLocalSearchParams<{ id: string }>();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSendButtonLoading, setInSendButtonLoading] = useState(false);

  const [deleteProfile] = useDeleteUserProfileMutation();

  const methods = useForm<ProfileForm>({
    defaultValues: {
      accountant_phone,
      bdate,
      cfull_name,
      cinn,
      cregion,
      cshort_name,
      department,
      director_lastname,
      department_code,
      director_name,
      email,
      director_surname,
      full_name,
      gender: GENDER_OPTIONS.find((option) => gender === option.value) ?? {},
      inn,
      patronymic,
      region,
      issue_date_at,
      juridical_address,
      kpp,
      name,
      moderation_status,
      number,
      office_address,
      ogrn,
      okved,
      series,
      short_name,
      snils,
      surname,
      tax_system,
      type,
      files: userDocs?.length
        ? userDocs.map((file) => ({
            file_id: file.id,
            file_type: file.type,
          }))
        : [],
    },
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ProfileForm) => {
    if (!id) return;

    const { files, avatar: userAvatar, ...userData } = data;

    const filesToCreate = files?.filter(
      (file) => !userDocs?.find((userFile) => file.file_type === userFile.type)
    );
    const filesToUpdate = files?.filter(
      (file) =>
        !!userDocs?.find(
          (userFile) => file.file_type === userFile.type && file.file
        )
    );
    const filesToDelete = userDocs?.filter(
      (userFile) => !files?.find((file) => file.file_type === userFile.type)
    );

    setInSendButtonLoading(true);

    const promisesArray: Promise<any>[] = [
      updateUser({
        id,
        data: {
          ...userData,
          gender: userData.gender.value,
          director_lastname: userData.patronymic,
          director_name: userData.name,
          director_surname: userData.surname,
        },
      }),
    ];

    if (filesToCreate?.length) {
      promisesArray.push(createFiles({ files: filesToCreate }));
    }
    if (filesToUpdate?.length) {
      promisesArray.push(updateFiles({ files: filesToUpdate }));
    }
    if (filesToDelete?.length) {
      promisesArray.push(deleteFiles({ files: filesToDelete }));
    }

    if (newAvatar) {
      const avatar = {
        uri: newAvatar.uri,
        name: newAvatar.name,
        type: newAvatar.mimeType ?? "image/jpeg",
      };
      if (initialAvatar) {
        promisesArray.push(updateAvatar({ avatar }));
      } else {
        promisesArray.push(
          createAvatar({
            avatar,
          })
        );
      }
    }

    const sendingError = await sendHandler(promisesArray);

    setInSendButtonLoading(false);

    if (!sendingError) {
      refetch();
      router.push(Routes.profile(id));
    }
  };

  const ButtonsProps = () => {
    switch (step) {
      case 1:
        return {
          next: { func: () => setStep(2), text: "Далее" },
          prev: {
            func: () => router.push(Routes.profile(id)),
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
          next: { func: onSubmit, text: "Отправить" },
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

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      if (step === 1) {
        navigation.dispatch(e.data.action);
      }
      if (step === 2) {
        setStep(1);
      }
      if (step === 3) {
        setStep(2);
      }
    });
    return unsubscribe;
  }, [navigation, step]);

  const onProfileDelete = async () => {
    await deleteProfile();
    router.push(Routes.profile(id));
  };

  if (isLoading) return <LoadingBlock />;

  return (
    <ScrollView style={styles.wrapper} keyboardShouldPersistTaps={"handled"}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <FilePicker onPress={(file) => setNewAvatar(file)}>
            {initialAvatar || newAvatar ? (
              <Image
                source={{
                  uri: newAvatar?.uri || initialAvatar,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <CameraIcon width={40} height={40} />
            )}
          </FilePicker>
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
          onPress={onProfileDelete}
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
          onPress={handleSubmit(ButtonsProps().next.func)}
          isLoading={isSendButtonLoading}
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
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    gap: 8,
    marginTop: 24,
    paddingBottom: 24,
  },
});
