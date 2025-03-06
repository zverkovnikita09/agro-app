import { useAppDispatch } from "@app/store";
import {
  ApplicationsSelectors,
  SelectedApplications,
  setSelectedApplication,
  useGetApplicationsQuery,
} from "@entities/Applications";
import { FiltersLink, FiltersSelectors } from "@widgets/Filters";
import {
  changeMarksColor,
  clearRoute,
  renderPointsScript,
  renderRoute,
  setMapCenter,
} from "@entities/Map";
import { map } from "@entities/Map/map";
import { COLORS } from "@shared/lib/styles";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

export default function Main() {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isRouteCreating, setIsRouteCreating] = useState(false);
  const mapCenter = useSelector(ApplicationsSelectors.selectMapCenter);
  const filters = useSelector(FiltersSelectors.selectFilters);

  const {
    isLoading: isApplicationsLoading,
    isError: isApplicationsError,
    data: applications,
    refetch,
  } = useGetApplicationsQuery({ filters });
  const dispatch = useAppDispatch();

  const selectedApplications = useSelector(
    ApplicationsSelectors.selectSelectedApplications
  );

  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (!isMapLoading && applications && webViewRef) {
      webViewRef.current?.injectJavaScript(
        renderPointsScript(
          applications.map(({ load_coordinates: { y, x }, id }) => ({
            coords: [y, x],
            id,
          }))
        )
      );
    }
  }, [applications, webViewRef, isMapLoading]);

  useEffect(() => {
    if (!isMapLoading && webViewRef && !selectedApplications.length) {
      webViewRef.current?.injectJavaScript(
        `${clearRoute()}${changeMarksColor()}`
      );
    }
  }, [selectedApplications, webViewRef]);

  useEffect(() => {
    if (selectedApplications[0] && webViewRef && !isMapLoading) {
      setIsRouteCreating(true);
      const { load_coordinates, unload_coordinates } = selectedApplications[0];
      webViewRef.current?.injectJavaScript(
        renderRoute(load_coordinates, unload_coordinates)
      );
    }
  }, [selectedApplications[0], webViewRef, isMapLoading]);

  useEffect(() => {
    if (mapCenter && webViewRef && !isMapLoading) {
      webViewRef.current?.injectJavaScript(setMapCenter(mapCenter));
    }
  }, [mapCenter, webViewRef, isMapLoading]);

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
      }}
    >
      {(isMapLoading || isApplicationsLoading || isRouteCreating) && (
        <LoadingBlock
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            top: 0,
            zIndex: 100,
            backgroundColor: COLORS.white,
          }}
          text={
            isRouteCreating ? "Построение маршрута..." : "Загрузка карты..."
          }
        />
      )}
      <FiltersLink
        style={{ position: "absolute", top: 14, left: 8, zIndex: 1 }}
      />
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        ref={webViewRef}
        source={{ html: map }}
        onMessage={(event) => {
          if (event.nativeEvent.data === "load") {
            setIsMapLoading(false);
          }
          if (event.nativeEvent.data.includes("appid")) {
            const targetApplication = applications?.find(
              ({ id }) => id === event.nativeEvent.data.replace("appid:", "")
            );
            if (targetApplication) {
              dispatch(setSelectedApplication(targetApplication));
            }
          }
          if (event.nativeEvent.data === "routeSuccess") {
            setIsRouteCreating(false);
          }
        }}
      />
      <SelectedApplications
        style={{ position: "absolute", bottom: 10, left: 9, right: 9 }}
      />
    </View>
  );
}
