import {
  Application,
  ApplicationShort,
  useGetApplicationsQuery,
} from "@entities/Applications";
import { FiltersSelectors } from "@widgets/Filters";
import { SortSelectors } from "@widgets/Sort";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { InfoBlock } from "@shared/ui/InfoBlock";
import { TruckIcon } from "@images/svg/TruckIcon";
import { COLORS } from "@shared/lib/styles";

export default function CheckList() {
  const sortBy = useSelector(SortSelectors.selectSort);
  const filters = useSelector(FiltersSelectors.selectFilters);

  const { data, refetch, isFetching, isLoading, isError } =
    useGetApplicationsQuery({ sort: sortBy, filters });

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
  if (!data?.length)
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            style={{ backgroundColor: "transparent" }}
            colors={["transparent"]}
            onRefresh={refetch}
          />
        }
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <InfoBlock
          title="Заявок не найдено"
          style={{
            main: { gap: 4 },
            additionalText: { color: COLORS.blackGrey },
          }}
          icon={<TruckIcon width={47} height={47} />}
        />
      </ScrollView>
    );

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
