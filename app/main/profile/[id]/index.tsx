import { ProfilePage } from "@pages/ProfilePage";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <ProfilePage id={id} />;
}
