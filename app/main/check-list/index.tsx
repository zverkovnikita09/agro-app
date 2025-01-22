import {
  Application,
  ApplicationShort,
  useGetApplicationsQuery,
} from "@entities/Applications";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { usePathname } from "expo-router";
import { FlatList, RefreshControl, View } from "react-native";

export default function CheckList() {
  const { data, refetch, isFetching, isLoading, isError } =
    useGetApplicationsQuery();
  const renderApps = ({
    item,
    index,
  }: {
    item: Application;
    index: number;
  }) => {
    return (
      <View style={{ paddingBottom: 16, paddingTop: index === 0 ? 16 : 0 }}>
        <ApplicationShort {...item} />
      </View>
    );
  };
  if (isLoading || isFetching) return <LoadingBlock />;
  if (!data?.length) return null;

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          style={{ backgroundColor: "transparent" }}
          colors={["transparent"]}
          onRefresh={refetch}
        />
      }
      style={{ paddingHorizontal: 12 }}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderApps}
    />
  );
}
