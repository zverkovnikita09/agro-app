import { ApplicationInfoItem } from "@entities/Applications";
import { INVALID_DOCUMENTS } from "@entities/ProfileForm";
import { useGetUserDataQuery } from "@entities/User";
import { formatSnils } from "@shared/lib/formatSnils";
import { CardContainer } from "@shared/ui/CardContainer";
import { Document } from "@shared/ui/Document";
import { Grid } from "@shared/ui/Grid";
import { Title } from "@shared/ui/Title";
import { StyleSheet, View } from "react-native";

export const ProfilePage = () => {
  const { data: userInfo } = useGetUserDataQuery();

  const userDocs = userInfo?.files?.filter(
    (file) => !INVALID_DOCUMENTS.includes(file.type)
  );

  return (
    <>
      <CardContainer style={styles.cardContainer}>
        <Title fontSize={16} fontWeight="bold">
          Личные данные
        </Title>
        <View style={styles.dataBlock}>
          <ApplicationInfoItem title="Серия паспорта">
            {userInfo?.series}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Номер паспорта">
            {userInfo?.number}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Код подразделения">
            {userInfo?.department_code}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Дата выдачи">
            {userInfo?.issue_date_at}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Кем выдан">
            {userInfo?.department}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="СНИЛС">
            {formatSnils(userInfo?.snils || "")}
          </ApplicationInfoItem>
        </View>
      </CardContainer>
      {!!userDocs?.length && (
        <CardContainer style={styles.cardContainer}>
          <Title fontSize={16} fontWeight="bold">
            Документы
          </Title>
          <Grid style={styles.docs} gap={12}>
            {userDocs.map((file) => (
              <Document key={file.type} url={file.path_url}>
                {file.type}
              </Document>
            ))}
          </Grid>
        </CardContainer>
      )}
      <CardContainer style={styles.cardContainer}>
        <Title fontSize={16} fontWeight="bold">
          Информация
        </Title>
        <View style={styles.dataBlock}>
          <ApplicationInfoItem title="Код подразделения">
            {userInfo?.department_code}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Дата выдачи">
            {userInfo?.issue_date_at}
          </ApplicationInfoItem>
          <ApplicationInfoItem title="Кем выдан">
            {userInfo?.department}
          </ApplicationInfoItem>
        </View>
      </CardContainer>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    marginTop: 24,
  },
  docs: {
    marginTop: 24,
  },
  dataBlock: {
    gap: 8,
    marginTop: 16,
  },
  tabs: {
    marginTop: 24,
    flexDirection: "row",
    gap: 8,
  },
});
