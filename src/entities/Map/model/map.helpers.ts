import { Coord } from "@entities/Applications";
import { markerBlackIcon, markerGreyIcon, markerIcon } from "@images/markers";


export const renderPointsScript = (points: {coords: [string, string], id: string}[]): string=>{
  return `
  points = ${JSON.stringify(points)};
        var collection = new ymaps.GeoObjectCollection();
        points.forEach(function(item) {
        const placemark = new ymaps.Placemark(item.coords, {}, {
            iconLayout: 'default#image',
            iconImageHref: '${markerIcon}',
            iconImageSize: [30, 37],
            iconImageOffset: [-15, -37],
            });
            placemark.events.add('click', function (event) {
              // event.get('target').options.set({
              //   iconImageHref: '${markerGreyIcon}'
              // });
              window.ReactNativeWebView.postMessage("appid:" + item.id);
            });
            collection.add(placemark);
        });
        myMap.geoObjects.add(collection);
  `
}

export const changeMarksColor = (to: "default" | "grey" = "default")=>{
  return `
        collection.each(element => {
        element.options.set({
            iconImageHref: '${to === "default" ? markerIcon : markerGreyIcon}'
          });
        })
        `
}

export const clearRoute = ()=> {
  return `
    if(multiRoute) {
     myMap.geoObjects.remove(multiRoute);
    }
  `
}

export const renderRoute = (from: Coord, to: Coord)=>{
  return `
  ${clearRoute()}
  ${changeMarksColor("grey")}
  multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [[${from.y}, ${from.x}], [${to.y}, ${to.x}]],
    params: {
      results: 1,
    }},
    {
    wayPointFinishIconLayout: "default#image",
    wayPointFinishIconImageHref: '${markerBlackIcon}',
    wayPointFinishIconImageSize: [30, 37],
    wayPointStartIconLayout: "default#image",
    wayPointStartIconImageHref: '${markerIcon}',
    wayPointStartIconImageSize: [30, 37],
    wayPointStartIconImageOffset: [-15, -37],
    pinVisible: false,
    routeActiveStrokeWidth: 8,
    balloonLayout: '',
    boundsAutoApply: true,
    routeActiveStrokeColor: "rgba(242, 180, 48, 1)",
});
    var timeoutId = null;
    multiRoute.events.add("boundschange", function (event) {
    const bounds = event.get("target").getBounds();
    window.clearTimeout(timeoutId);
    if(bounds){
      timeoutId = window.setTimeout(() => {
      window.ReactNativeWebView.postMessage("routeSuccess");
      }, 500)
    }
    });
    myMap.geoObjects.add(multiRoute);
  `
}

export const setMapCenter = (coords: Coord)=>{  
  return `
        myMap.setCenter([${coords.y}, ${coords.x}], 9);
        `
}