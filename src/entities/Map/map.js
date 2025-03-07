export const map = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no, maximum-scale=1" />
  <script src="https://api-maps.yandex.ru/2.1/?apikey=f1221bfd-10ff-47b9-980f-15aac6dde446&lang=ru_RU"
  type="text/javascript">
  </script>
  <script type="text/javascript">
  var myMap;
  var multiRoute;
  var points;
  var markerPath = "./marker.png";
  ymaps.ready(function () {
    window.ReactNativeWebView.postMessage("load");
    myMap = new ymaps.Map("YMapsID", {
      center: [47.13, 39.42],
      zoom: 3,
      controls: [],
    }, {suppressMapOpenBlock: true, restrictMapArea: [[80.23618,-178.9], [-73.87011,181] ]});
  });
</script>
<style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
      [class*="copyrights-pane"] {
        display: none !important;
      };
</style>
</head>
<body>
  <div id="YMapsID" style="width: 100vw; height: 100vh;"></div>
</body>
</html>
`
