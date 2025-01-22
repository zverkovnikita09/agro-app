import { StyleSheet, View } from "react-native";
import { Application } from "../model/Applications.model";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { COLORS } from "@shared/lib/styles";
import { Title } from "@shared/ui/Title";
import { GilroyText } from "@shared/ui/GilroyText";
import { ApplicationProp } from "./ApplicationProp";
import { ViewsCounter } from "@shared/ui/ViewsCounter";
import { TrailBlock } from "@shared/ui/TrailBlock";
import { addNotification, NotificationType } from "@entities/Notifications";
import { useAppDispatch } from "@app/store";
import { useCreateOfferMutation } from "../model/Applications.api";
import { Link } from "expo-router";
import { Grid } from "@shared/ui/Grid";

export const ApplicationContentExpanded = ({
  order_number,
  created_at,
  deadlines,
  crop,
  volume,
  distance,
  tariff,
  id,
  view_counter,
  load_place_name,
  unload_place_name,
}: Application) => {
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
    <View style={styles.wrapper}>
      <View style={{ gap: 6 }}>
        <View style={styles.title}>
          <Title fontSize={18}>Заявка №{order_number}</Title>
          <ViewsCounter views={view_counter} />
        </View>
        <GilroyText color={COLORS.blackGrey} fontSize={14}>
          от: {created_at}
        </GilroyText>
      </View>
      <GilroyText fontSize={14}>Сроки: {deadlines}</GilroyText>
      <TrailBlock
        destinationFrom={load_place_name ?? ""}
        destinationTo={unload_place_name ?? ""}
      />
      <Grid gap={12}>
        <ApplicationProp icon="box">{crop}</ApplicationProp>
        <ApplicationProp icon="box_3d">{volume} тонн</ApplicationProp>
        <ApplicationProp icon="routing">{distance} км</ApplicationProp>
        <ApplicationProp icon="card_coin">
          {tariff} ₽ <GilroyText color={COLORS.blackGrey}>Без НДС</GilroyText>
        </ApplicationProp>
      </Grid>
      <View style={styles.buttons}>
        <Link href={`/main/application/${id}`} asChild>
          <Button theme={ButtonTheme.OUTLINE} size={ButtonSize.S}>
            Подробнее
          </Button>
        </Link>
        {!isSuccess && (
          <Button
            isLoading={isLoading}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.S}
            onPress={onSubmit}
          >
            Откликнуться
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  buttons: {
    gap: 8,
  },
  properties: {
    flexDirection: "row",
  },
});
