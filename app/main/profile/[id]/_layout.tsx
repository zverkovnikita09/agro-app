import { useAppDispatch } from "@app/store";
import { removeToken } from "@entities/Auth";
import { useGetUserDataQuery } from "@entities/User/model/User.api";
import { useGetUserDocsQuery } from "@entities/UserDoc/model/UserDoc.api";
import { CameraIcon } from "@images/svg/CameraIcon";
import { CheckIcon } from "@images/svg/CheckIcon";
import { HourglassIcon } from "@images/svg/HourglassIcon";
import { InfoIcon } from "@images/svg/InfoIcon";
import { PenIcon } from "@images/svg/PenIcon";
import { Routes } from "@shared/lib/constants";
import { COLORS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Gallery } from "@shared/ui/Gallery";
import { GilroyText } from "@shared/ui/GilroyText";
import { InfoBlock } from "@shared/ui/InfoBlock";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { RadioButtonGroup } from "@shared/ui/RadioButton";
import { StatusBadge, Statuses } from "@shared/ui/StatusBadge";
import { TabLink } from "@shared/ui/TabLink";
import { Title } from "@shared/ui/Title";
import { router, Slot, useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useMemo } from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function Layout() {
  const dispatch = useAppDispatch();
  const {
    data: userInfo,
    isFetching: isFetchingUserData,
    isError,
    refetch: refetchUserData,
  } = useGetUserDataQuery();
  const { isFetching: isDocsFetching, refetch: refetchDocs } =
    useGetUserDocsQuery();

  const { id: initialId } = useLocalSearchParams<{ id: string }>();
  const path = usePathname();

  const isFetching = isFetchingUserData || isDocsFetching;
  const refetch = () => {
    refetchUserData();
    refetchDocs();
  };

  const {
    id,
    phone_number,
    short_name,
    cinn,
    ogrn,
    okved,
    type,
    moderation_status,
    files,
  } = userInfo || {};

  const logout = () => {
    dispatch(removeToken());
    router.replace(Routes.login);
  };

  const avatar =
    userInfo?.files?.find(({ type }) => type === "Аватар")?.path_url ?? "";

  const statusOptions = useMemo<{
    icon: JSX.Element;
    text: string;
    status: Statuses;
  }>(() => {
    switch (moderation_status) {
      case "approved":
        return {
          icon: <CheckIcon width={14} height={14} />,
          text: "Профиль подтвержден",
          status: "complete",
        };
      case "pending":
        return {
          icon: <HourglassIcon width={14} height={14} />,
          text: "Профиль на модерации",
          status: "inactive",
        };
      case "rejected":
        return {
          icon: <InfoIcon width={14} height={14} />,
          text: "Профиль не подтвержден",
          status: "active",
        };
      default:
        return {
          icon: <></>,
          text: "",
          status: "active",
        };
    }
  }, [moderation_status]);

  const profileIsFilled =
    userInfo?.type && userInfo.moderation_status === "approved";

  const Content = () => {
    if (!userInfo?.type) {
      return (
        <InfoBlock
          style={{
            main: styles.notFound,
          }}
          title="Профиль не заполнен"
          additionalText="Заполните личные данные профиля"
          icon={<PenIcon width={46} height={47} />}
        >
          <Button
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.M}
            style={{ marginTop: 8, alignSelf: "center" }}
            onPress={() => router.navigate(Routes.editProfile(id))}
          >
            Заполнить профиль
          </Button>
        </InfoBlock>
      );
    }

    if (moderation_status === "pending") {
      return (
        <InfoBlock
          style={{
            main: styles.notFound,
          }}
          title="Ваш профиль проходит модерацию"
          additionalText="Данные скоро появятся в личном кабинете"
          icon={<HourglassIcon width={46} height={46} />}
        />
      );
    }
    return <Slot />;
  };

  if (!initialId) return null;

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      scrollEnabled={!isFetching}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      {isFetching && <LoadingBlock style={styles.loading} />}
      <View style={styles.header}>
        <View style={styles.avatar}>
          {avatar ? (
            <Gallery>
              {(openImage) => (
                <Button onPress={() => openImage(avatar)}>
                  <Image
                    source={{
                      uri: avatar,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </Button>
              )}
            </Gallery>
          ) : (
            <CameraIcon width={40} height={40} />
          )}
        </View>
        <View style={styles.headerRight}>
          <Title>{short_name || phone_number}</Title>
          {type && (
            <StatusBadge
              status={statusOptions.status}
              style={styles.status}
              icon={statusOptions.icon}
            >
              {statusOptions.text}
            </StatusBadge>
          )}
          <View style={styles.headerInfo}>
            <GilroyText fontWeight="medium" style={styles.infoTitle}>
              ИНН
            </GilroyText>
            <GilroyText color={COLORS.blackGrey} style={styles.infoText}>
              {cinn || "Не указано"}
            </GilroyText>
          </View>
          <View style={styles.headerInfo}>
            <GilroyText fontWeight="medium" style={styles.infoTitle}>
              ОГРН
            </GilroyText>
            <GilroyText color={COLORS.blackGrey} style={styles.infoText}>
              {ogrn || "Не указано"}
            </GilroyText>
          </View>
          <View style={styles.headerInfo}>
            <GilroyText fontWeight="medium" style={styles.infoTitle}>
              Основной ОКВЭД
            </GilroyText>
            <GilroyText color={COLORS.blackGrey} style={styles.infoText}>
              {okved || "Не указано"}
            </GilroyText>
          </View>
        </View>
      </View>
      <Button
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        style={styles.edit}
        withConfirm={moderation_status === "pending"}
        confirmProps={{
          title: "Ваш профиль на модерации",
          additionalText: "Пожалуйста подождите",
          hideConfirm: true,
          cancelText: "Понятно",
        }}
        onPress={() => router.push(Routes.editProfile(id))}
      >
        {type ? "Редактировать профиль" : "Заполнить профиль"}
      </Button>
      <Button
        style={styles.logout}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.M}
        onPress={logout}
        withConfirm
        confirmProps={{
          confrimText: "Выйти",
          title: "Вы действительно хотите выйти?",
          cancelText: "Остаться",
        }}
      >
        Выйти
      </Button>
      {profileIsFilled && (
        <View style={styles.tabs}>
          <TabLink href={Routes.profile(userInfo?.id)}>Личные данные</TabLink>
          <TabLink href={Routes.docs(userInfo?.id)}>Документы</TabLink>
        </View>
      )}
      <View style={styles.mainBLock}>{Content()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  headerRight: {
    flex: 1,
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    gap: 20,
  },
  infoTitle: {
    width: "50%",
  },
  infoText: {
    width: "50%",
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.specialGrey2,
    borderRadius: "50%",
    width: 76,
    height: 76,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  logout: {
    marginTop: 12,
  },
  edit: {
    marginTop: 16,
  },
  status: {
    marginTop: 8,
    marginBottom: 10,
  },
  tabs: {
    marginTop: 24,
    flexDirection: "row",
    gap: 8,
  },
  mainBLock: {
    flexGrow: 1,
    marginBottom: 16,
  },
  notFound: {
    flexGrow: 1,
    alignItems: "center",
  },
  loading: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: COLORS.white,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 130,
  },
});
