import { useAppDispatch } from "@app/store";
import {
  Coord,
  setMapCenter,
  useGetApplicationsQuery,
} from "@entities/Applications";
import { CloseIcon } from "@images/svg/CloseIcon";
import { SearchIcon } from "@images/svg/SearchIcon";
import { Routes } from "@shared/lib/constants";
import { COLORS } from "@shared/lib/styles";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { Select, SelectOptions } from "@shared/ui/Select";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

export default function Search() {
  const {
    data: applications,
    isLoading,
    isFetching,
    isError,
  } = useGetApplicationsQuery();

  const [searchString, setSearchString] = useState("");

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

    if (searchString) {
      return uniquePlaces.filter(({ load_place_name }) =>
        load_place_name.toUpperCase().includes(searchString.toLocaleUpperCase())
      );
    }

    return uniquePlaces;
  }, [applications, searchString]);

  const onSelect = (item: {
    load_place_name: string;
    load_coordinates: Coord;
  }) => {
    dispatch(setMapCenter(item.load_coordinates));
    router.push(Routes.main);
  };

  if (isLoading || isFetching) return <LoadingBlock />;

  return (
    <View style={{ paddingHorizontal: 12, marginTop: 12, flex: 1 }}>
      <View>
        <SearchIcon
          width={18}
          height={18}
          style={{
            position: "absolute",
            top: "50%",
            left: 16,
            transform: [{ translateY: "-50%" }],
          }}
          color={COLORS.disabled}
        />
        <Input
          type="text"
          value={searchString}
          onChangeText={setSearchString}
          placeholder="Введите пункт погрузки"
          style={{ paddingVertical: 12, height: 42, paddingHorizontal: 42 }}
          scrollEnabled
          multiline={false}
        />
        <Button
          onPress={() => setSearchString("")}
          style={{
            position: "absolute",
            top: "50%",
            right: 16,
            paddingTop: 3,
            transform: [{ translateY: "-50%" }],
            width: 18,
            height: 18,
          }}
        >
          <CloseIcon width={14} height={14} />
        </Button>
      </View>
      <SelectOptions
        options={options}
        keyExtractor={(item) => JSON.stringify(item.load_coordinates)}
        optionText={(item) => item.load_place_name}
        onSelect={onSelect}
      />
    </View>
  );
}
