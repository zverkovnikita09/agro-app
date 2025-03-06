import { AuthSelectors } from "@entities/Auth";
import { Login } from "@features/Login";
import { OTP } from "@features/OTP";
import { Routes } from "@shared/lib/constants";
import { PageContainer } from "@shared/ui/PageContainer";
import { Redirect } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const LoginPage = () => {
  const phoneNumber = useSelector(AuthSelectors.selectPhoneNumber);
  const token = useSelector(AuthSelectors.selectToken);
  if (token) return <Redirect href={Routes.default} />;

  return (
    <PageContainer style={styles.wrapper}>
      <Image source={require("@images/logo.png")} style={styles.logo} />
      {phoneNumber ? <OTP /> : <Login />}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  logo: {
    width: 108,
    height: 52,
    marginBottom: 60,
    marginTop: -60,
  },
});
