import { useAppDispatch } from "@app/store";
import {
  Coord,
  setMapCenter,
  useGetApplicationsQuery,
} from "@entities/Applications";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { Select, SelectOptions } from "@shared/ui/Select";
import { router } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

export default function Search() {
  const {
    data: applications,
    isLoading,
    isFetching,
    isError,
  } = useGetApplicationsQuery();

  const dispatch = useAppDispatch();

  const options = useMemo(() => {
    if (!applications?.length) return [];

    const uniquePlaces: {
      load_place_name: string;
      load_coordinates: Coord;
    }[] = [];

    applications.forEach((item) => {
      if (
        !uniquePlaces.find(
          ({ load_coordinates }) =>
            JSON.stringify(load_coordinates) ===
            JSON.stringify(item.load_coordinates)
        )
      ) {
        uniquePlaces.push(item);
      }
    });

    return uniquePlaces;
  }, [applications]);

  const onSelect = (item: {
    load_place_name: string;
    load_coordinates: Coord;
  }) => {
    dispatch(setMapCenter(item.load_coordinates));
    router.push("/main");
  };

  if (isLoading || isFetching) return <LoadingBlock />;

  return (
    <View style={{ paddingHorizontal: 12, marginTop: 12, flex: 1 }}>
      <Select
        type="search"
        label="Поиск пункта погрузки"
        options={options}
        setValue={onSelect}
        isModal={false}
        searchByKey="load_place_name"
      >
        {(items, onSelect) => (
          <SelectOptions
            options={items}
            keyExtractor={(item) => JSON.stringify(item.load_coordinates)}
            optionText={(item) => item.load_place_name}
            onSelect={onSelect}
          />
        )}
      </Select>
    </View>
  );
}
