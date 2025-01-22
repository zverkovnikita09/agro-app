import {
  useGetApplicationByIdQuery,
  useGetUserAplicationsQuery,
} from "@entities/Applications";
import { ViewApplicationPage } from "@pages/ViewApplicationPage";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useLocalSearchParams } from "expo-router";

export default function Application() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { isLoading: isApplicationLoading, data: application } =
    useGetApplicationByIdQuery({ id });
  const { data: userApplications, isLoading: isLoadingUserApplications } =
    useGetUserAplicationsQuery();

  if (isApplicationLoading || isLoadingUserApplications)
    return <LoadingBlock />;

  if (!application || !userApplications?.length) return null;

  return (
    <ViewApplicationPage
      {...application}
      userApplications={userApplications}
      id={id}
    />
  );
}
