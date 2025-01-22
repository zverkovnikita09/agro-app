import { CardContainer } from "@shared/ui/CardContainer";
import { Application } from "../model/Applications.model";
import { Title } from "@shared/ui/Title";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { GilroyText } from "@shared/ui/GilroyText";
import { COLORS } from "@shared/lib/styles";
import { TrailBlock } from "@shared/ui/TrailBlock";
import { ViewsCounter } from "@shared/ui/ViewsCounter";
import { useCreateOfferMutation } from "../model/Applications.api";
import { useAppDispatch } from "@app/store";
import { addNotification, NotificationType } from "@entities/Notifications";
import { ApplicationProp } from "./ApplicationProp";

export const ApplicationShort = ({
  order_number,
  created_at,
  deadlines,
  load_place_name,
  unload_place_name,
  terminal_name,
  crop,
  volume,
  distance,
  tariff,
  view_counter,
  isMine,
  id,
}: Application & { isMine?: boolean }) => {
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

  return (
    <CardContainer style={styles.container}>
      <View style={styles.title}>
        <Title fontSize={17}>Заявка №{order_number}</Title>
        <GilroyText color={COLORS.blackGrey} fontSize={14}>
          от: {created_at}
        </GilroyText>
      </View>
      <View style={styles.title}>
        <GilroyText fontSize={14}>Сроки:</GilroyText>
        <GilroyText color={COLORS.blackGrey} fontSize={14}>
          {deadlines}
        </GilroyText>
      </View>
      <TrailBlock
        destinationFrom={load_place_name ?? ""}
        destinationTo={unload_place_name ?? ""}
      />
      {terminal_name && (
        <GilroyText fontSize={14}>
          Грузополучатель/Терминал выгрузки:{" "}
          <GilroyText fontSize={14} color={COLORS.blackGrey}>
            {terminal_name}
          </GilroyText>
        </GilroyText>
      )}
      <View style={styles.properties}>
        <ApplicationProp icon="box">{crop}</ApplicationProp>
        <ApplicationProp icon="box_3d">{volume} тонн</ApplicationProp>
        <ApplicationProp icon="routing">{distance} км</ApplicationProp>
        <ApplicationProp icon="card_coin">
          {tariff} ₽ <GilroyText color={COLORS.blackGrey}>Без НДС</GilroyText>
        </ApplicationProp>
      </View>
      <ViewsCounter views={view_counter} />
      <View style={{ gap: 8 }}>
        <Link href={`/main/application/${id}`} asChild>
          <Button theme={ButtonTheme.OUTLINE} size={ButtonSize.M}>
            Подробнее
          </Button>
        </Link>
        {!isMine && !isSuccess && (
          <Button
            isLoading={isLoading}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.M}
            onPress={onSubmit}
          >
            Откликнуться
          </Button>
        )}
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  properties: {
    gap: 8,
  },
  title: {
    flexDirection: "row",
    gap: 6,
  },
  cargoInfo: {},
  button: {},
});
