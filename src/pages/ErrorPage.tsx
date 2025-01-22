import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { GilroyText } from "@shared/ui/GilroyText";
import { PageContainer } from "@shared/ui/PageContainer";
import { Title } from "@shared/ui/Title";
import { Link } from "expo-router";
import { Dimensions, Image, StyleSheet, View } from "react-native";

export const ErrorPage = () => {
  const windowWidth = Dimensions.get("window").width;
  const ratio = windowWidth / 537 - 15;
  return (
    <PageContainer style={styles.wrapper}>
      <View style={styles.content}>
        <Image
          source={require("@images/track.png")}
          style={{
            width: windowWidth - 30,
            height: ratio * 436,
            aspectRatio: 1.23,
          }}
        />
        <Title style={styles.title}>Упс!</Title>
        <GilroyText>Что-то пошло не так</GilroyText>
        <Link href="/" asChild style={styles.link}>
          <Button
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.M}
            fontWeight="bold"
          >
            На главную
          </Button>
        </Link>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  content: {
    padding: 15,
    alignItems: "center",
    gap: 4,
  },
  title: {
    marginTop: 22,
  },
  link: {
    width: 250,
    marginTop: 8,
    marginInline: "auto",
  },
});
