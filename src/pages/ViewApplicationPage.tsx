import { useAppDispatch } from "@app/store";
import {
  Application,
  ApplicationInfoItem,
  ApplicationProp,
  useCreateOfferMutation,
} from "@entities/Applications";
import { addNotification, NotificationType } from "@entities/Notifications";
import { ArrowIcon } from "@images/svg/ArrowIcon";
import { COLORS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { CardContainer } from "@shared/ui/CardContainer";
import { GilroyText } from "@shared/ui/GilroyText";
import { Grid } from "@shared/ui/Grid";
import { Title } from "@shared/ui/Title";
import { TrailBlock } from "@shared/ui/TrailBlock";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export const ViewApplicationPage = ({
  order_number,
  contact_name,
  contact_phone,
  crop,
  distance,
  exporter_name,
  height_limit,
  id,
  is_overload,
  load_method,
  load_place,
  load_place_name,
  load_types,
  manager,
  scale_length,
  tariff,
  terminal_address,
  terminal_inn,
  terminal_name,
  timeslot,
  unload_place_name,
  view_counter,
  volume,
  approach,
  cargo_price,
  cargo_shortage_rate,
  clarification_of_the_weekend,
  created_at,
  daily_load_rate,
  description,
  end_order_at,
  is_full_charter,
  loader_power,
  nds_percent,
  outage_begin,
  outage_price,
  start_order_at,
  tolerance_to_the_norm,
  unit_of_measurement_for_cargo_shortage_rate,
  unload_methods,
  work_time,
  userApplications,
}: Application & { userApplications: Application[] }) => {
  const [createOrder, { isLoading, isSuccess }] = useCreateOfferMutation();

  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    try {
      const response = await createOrder({ order_id: id });

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
      dispatch(
        addNotification({
          type: NotificationType.SUCCESS,
          id: performance.now().toString(),
          message: "Вы успешно откликнулись, скоро с вами свяжется логист",
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const goBack = () => router.back();

  const getWorkingDays = () => {
    switch (clarification_of_the_weekend) {
      case "суббота":
        return "Пн-Сб";
      case "воскресенье":
        return "Пн-Пт, Вс";
      case "суббота и воскресенье":
        return "Пн-Вс";
      default:
        return "Пн-Пт";
    }
  };

  return (
    <View style={styles.wrapper}>
      {!isSuccess && !userApplications.find((item) => item.id === id) && (
        <View style={styles.buttonWrapper}>
          <Button
            isLoading={isLoading}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.M}
            onPress={onSubmit}
          >
            Откликнуться
          </Button>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrolalble}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Button onPress={goBack}>
              <ArrowIcon width={24} height={24} />
            </Button>
            <Title fontWeight="bold" fontSize={18}>
              Заявка № {order_number}
            </Title>
            <GilroyText color={COLORS.blackGrey}>от: {created_at}</GilroyText>
          </View>
        </View>
        <GilroyText fontWeight="semi-bold">
          Сроки:{" "}
          <GilroyText color={COLORS.blackGrey} fontSize={14}>
            {start_order_at}-{end_order_at}
          </GilroyText>
        </GilroyText>
        <ApplicationInfoItem style={{ marginTop: 20 }}>
          Норма: {daily_load_rate} т{" "}
          <GilroyText color={COLORS.blackGrey}>/ день</GilroyText>
        </ApplicationInfoItem>
        <ApplicationInfoItem style={{ marginTop: 12 }}>
          Не более: {loader_power} авто{" "}
          <GilroyText color={COLORS.blackGrey}>/ день</GilroyText>
        </ApplicationInfoItem>
        <TrailBlock
          style={{ marginTop: 24 }}
          destinationFrom={load_place_name ?? ""}
          destinationTo={unload_place_name ?? ""}
        />
        {terminal_name && (
          <ApplicationInfoItem style={{ marginTop: 24 }}>
            Грузополучатель/Терминал выгрузки:{" "}
            <GilroyText color={COLORS.blackGrey}>{terminal_name}</GilroyText>
          </ApplicationInfoItem>
        )}
        {exporter_name && (
          <ApplicationInfoItem style={{ marginTop: 12 }}>
            Экспортер:{" "}
            <GilroyText color={COLORS.blackGrey}>{exporter_name}</GilroyText>
          </ApplicationInfoItem>
        )}
        {timeslot && (
          <ApplicationInfoItem style={{ marginTop: 12 }}>
            Таймслот:{" "}
            <GilroyText color={COLORS.blackGrey}>{timeslot}</GilroyText>
          </ApplicationInfoItem>
        )}
        <Grid style={{ marginTop: 24 }} gap={8}>
          <ApplicationProp theme="accent" icon="box">
            {crop}
          </ApplicationProp>
          <ApplicationProp icon="box_3d" theme="accent">
            {volume} тонн
          </ApplicationProp>
          <ApplicationProp icon="routing" theme="accent">
            {distance} км
          </ApplicationProp>
          <ApplicationProp icon="card_coin" theme="accent">
            {tariff} ₽ <GilroyText color={COLORS.blackGrey}>Без НДС</GilroyText>
          </ApplicationProp>
        </Grid>
        <CardContainer style={styles.cardContainer}>
          <Title fontSize={17} fontWeight="bold">
            Детали погрузки
          </Title>
          <ApplicationInfoItem title="Тип транспорта:">
            {load_types.map(({ title }) => title).join(", ")}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Способ погрузки:">
            {load_method}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Возможность перегруза:">
            {is_overload ? "Да" : "Нет"}
          </ApplicationInfoItem>
          {Number(scale_length) && (
            <ApplicationInfoItem title="Длина весов:">
              {scale_length.toString().replace(".", ",")} м
            </ApplicationInfoItem>
          )}
          <ApplicationInfoItem title="Ограничения по высоте:">
            {height_limit?.toString().replace(".", ",")} м
          </ApplicationInfoItem>
          {tolerance_to_the_norm && (
            <ApplicationInfoItem title="Допуск к норме:">
              <GilroyText fontSize={14}>{tolerance_to_the_norm} %</GilroyText>
            </ApplicationInfoItem>
          )}
        </CardContainer>
        {!!outage_begin && (
          <CardContainer style={styles.cardContainer}>
            <Title fontSize={17} fontWeight="bold">
              Простой
            </Title>
            <ApplicationInfoItem title="Начало периода простоя:">
              <GilroyText fontSize={14}>
                {outage_begin === 2 ? "Со" : "С"} {outage_begin}-х суток
              </GilroyText>
            </ApplicationInfoItem>
            {outage_price && (
              <ApplicationInfoItem title="Стоимость простоя:">
                {outage_price} ₽
              </ApplicationInfoItem>
            )}
          </CardContainer>
        )}
        <CardContainer style={styles.cardContainer}>
          <Title fontSize={17} fontWeight="bold">
            Информация
          </Title>
          <ApplicationInfoItem title="Контактное лицо:">
            {contact_name}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Номер телефона:">
            {contact_phone}
          </ApplicationInfoItem>
          {manager && (
            <>
              <Title fontSize={17} style={{ marginTop: 4 }} fontWeight="bold">
                Менеджер
              </Title>
              <ApplicationInfoItem title="Контактное лицо:">
                {manager.name}
              </ApplicationInfoItem>
              <ApplicationInfoItem title="Номер телефона:">
                {manager.phone}
              </ApplicationInfoItem>
            </>
          )}
          {description && (
            <View style={styles.desription}>
              <GilroyText
                color={COLORS.blackGrey}
                fontSize={14}
                fontWeight="medium"
              >
                Примечание
              </GilroyText>
              <GilroyText fontWeight="medium" fontSize={14}>
                {description}
              </GilroyText>
            </View>
          )}
        </CardContainer>
        <CardContainer style={[styles.cardContainer, { marginBottom: 24 }]}>
          <Title fontSize={17} fontWeight="bold">
            Дополнительные параметры
          </Title>
          <ApplicationInfoItem title="Норма недостачи груза:">
            {cargo_shortage_rate
              ? `${cargo_shortage_rate} ${unit_of_measurement_for_cargo_shortage_rate}`
              : "Не указано"}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Стоимость груза:">
            {cargo_price ? `${cargo_price} ₽` : "Не указано"}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Место погрузки:">
            {load_place || "Не указано"}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Подъезд:">
            {approach || "Не указано"}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Тип выгрузки:">
            {unload_methods?.length
              ? unload_methods.map(({ title }) => title).join(", ")
              : "Не указано"}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Время работы:">
            {getWorkingDays()} {work_time}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Хартия:">
            {is_full_charter !== null
              ? is_full_charter
                ? "Полная"
                : "Не полная"
              : "Не указано"}
          </ApplicationInfoItem>
        </CardContainer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    alignContent: "center",
    gap: 4,
  },
  header: {
    paddingBottom: 24,
  },
  buttonWrapper: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrolalble: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 50,
  },
  cardContainer: {
    padding: 16,
    marginTop: 24,
    gap: 12,
  },
  desription: {
    marginTop: 4,
    gap: 8,
  },
});
