import store from "@/store/store";
export default function panTo() {
  const kakao = window.kakao;
  var mapContainer = document.getElementById("map"),
    mapOption = {
      center: new kakao.maps.LatLng(
        store.state.mainLocation.lat,
        store.state.mainLocation.lng
      ), //지도의 중심좌표., // 지도의 중심좌표// 지도의 확대 레벨
    };
  var moveLatLon = new kakao.maps.LatLng(
    35.109011427681004,
    128.94260030819132
  );

  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
}
