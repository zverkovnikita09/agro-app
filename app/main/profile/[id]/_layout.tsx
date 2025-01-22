import { useAppDispatch } from "@app/store";
import { removeToken } from "@entities/Auth";
import { useGetUserDataQuery } from "@entities/User/model/User.api";
import { CameraIcon } from "@images/svg/CameraIcon";
import { CheckIcon } from "@images/svg/CheckIcon";
import { HourglassIcon } from "@images/svg/HourglassIcon";
import { InfoIcon } from "@images/svg/InfoIcon";
import { PenIcon } from "@images/svg/PenIcon";
import { COLORS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { GilroyText } from "@shared/ui/GilroyText";
import { InfoBlock } from "@shared/ui/InfoBlock";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { StatusBadge } from "@shared/ui/StatusBadge";
import { TabLink } from "@shared/ui/TabLink";
import { Title } from "@shared/ui/Title";
import { Link, router, Slot } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Layout() {
  const dispatch = useAppDispatch();
  const { data: userInfo, isLoading, isError } = useGetUserDataQuery();

  const {
    id,
    phone_number,
    short_name,
    cinn,
    ogrn,
    okved,
    type,
    moderation_status,
  } = userInfo || {};

  const logout = () => {
    dispatch(removeToken());
    router.replace("/login");
  };

  const statusOptions = useMemo<{ icon: JSX.Element; text: string }>(() => {
    switch (moderation_status) {
      case "approved":
        return {
          icon: <CheckIcon width={14} height={14} />,
          text: "Профиль подтвержден",
        };
      case "pending":
        return {
          icon: <HourglassIcon width={14} height={14} />,
          text: "Профиль на модерации",
        };
      case "rejected":
        return {
          icon: <InfoIcon width={14} height={14} />,
          text: "Профиль не подтвержден",
        };
      default:
        return {
          icon: <></>,
          text: "",
        };
    }
  }, [moderation_status]);

  const isShowDocumentTab =
    userInfo?.type && userInfo.moderation_status === "approved";

  if (isLoading) return <LoadingBlock />;

  const WrapperComponent = type ? ScrollView : View;

  return (
    <WrapperComponent style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <CameraIcon width={40} height={40} />
        </View>
        <View style={styles.headerRight}>
          <Title>{short_name || phone_number}</Title>
          <StatusBadge
            status="complete"
            style={styles.status}
            icon={statusOptions.icon}
          >
            {statusOptions.text}
          </StatusBadge>
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
      <Link href={`/main/profile/edit/${id}`} asChild>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          style={styles.edit}
        >
          {type ? "Редактировать профиль" : "Заполнить профиль"}
        </Button>
      </Link>
      <Button
        style={styles.logout}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.S}
        onPress={logout}
      >
        Выйти
      </Button>
      <View style={styles.tabs}>
        <TabLink href={`/main/profile/${userInfo?.id}`}>Личные данные</TabLink>
        {isShowDocumentTab && (
          <TabLink href={`/main/profile/${userInfo?.id}/docs`}>
            Документы
          </TabLink>
        )}
      </View>
      <View style={styles.mainBLock}>
        {type ? (
          <Slot />
        ) : (
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
              onPress={() => router.navigate(`/main/profile/edit/${id}`)}
            >
              Заполнить профиль
            </Button>
          </InfoBlock>
        )}
      </View>
    </WrapperComponent>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    borderRadius: 76 / 2,
    width: 76,
    height: 76,
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
    flex: 1,
    marginBottom: 16,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
  },
});
