<template>
  <div id="container">
    <div>
      <form @submit.prevent="inputKeyword()">
        <input type="text" name="" id="" v-model="this.keywordSearch" />
        <button type="submit"></button>
      </form>
    </div>
    <div class="map_wrap">
      <div id="map">
        <slot name="overlay"></slot>
      </div>
      <!-- 지도타입 컨트롤 div 입니다 -->
      <div class="custom_typecontrol radius_border">
        <span
          id="btnRoadmap"
          class="selected_btn"
          @click="setMapType('roadmap')"
          >지도</span
        >
        <span id="btnSkyview" class="btn" @click="setMapType('skyview')"
          >스카이뷰</span
        >
      </div>
      <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
      <div class="custom_zoomcontrol radius_border">
        <span @click="zoomIn()"
          ><img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
        /></span>
        <span @click="zoomOut()"
          ><img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
        /></span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
export default {
  name: "KakaoMap",
  data() {
    return {
      modalOpen: false,
      keywordSearch: "",
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3e1a77f956eae1e9dd319a03071ce091&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
  },
  methods: {
    inputKeyword() {
      this.$store.state.keyword = this.keywordSearch;
      this.initMap();
    },
    initMap() {
      var infowindow = new kakao.maps.InfoWindow({
        zIndex: 99,
        removable: true,
      });
      this.infowindow = infowindow;
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(
          this.$store.state.mainLocation.lat,
          this.$store.state.mainLocation.lng
        ),
        level: this.$store.state.viewLevel,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      const map = new kakao.maps.Map(container, options);
      this.map = map;
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      for (var i = 0; i < this.$store.state.positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        displayMarker(this.$store.state.positions[i]);
      }
      // 지도에 마커를 표시하는 함수입니다
      function displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.lat, place.lng),
          image: markerImage,
        });
        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        var overlay = new kakao.maps.CustomOverlay({
          // content: "<div>" + store.state.positions[i].place_name + "</div>",
          content:
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            store.state.positions[i].place_name +
            "        </div>" +
            '        <div class="body">' +
            '               <div class="">' +
            '                   <div class="">' +
            store.state.positions[i].adress +
            "                     </div>" +
            store.state.positions[i].url +
            "               </div>" +
            store.state.positions[i].findRoute +
            "         </div>" +
            "         <div>" +
            "             <div>" +
            "                 <span>" +
            "                   현재 진행중인 전시 : " +
            store.state.positions[i].exhibition +
            "                 </span>" +
            "           </div>" +
            store.state.positions[i].info +
            "       </div>" +
            "  </div>" +
            "</div>",
          map: map,
          position: marker.getPosition(),
        });
        overlay.setMap(null);
        kakao.maps.event.addListener(marker, "click", function () {
          for (let i = 0; i < store.state.positions.length; i++) {
            overlay.setMap(null);
            if (store.state.positions[i].show == false) {
              overlay.setMap(map);
              store.state.positions[i].show = true;
            } else if (store.state.positions[i].show == true) {
              store.state.positions[i].show = false;
            }
          }
          map.panTo(this.getPosition(store.state.setLevel));
        });
      }
    },
    CenterSet() {
      this.$store.state.mainLocation.lat = 35.109011427681004;
      this.$store.state.mainLocation.lng = 128.94260030819132;
    },
    zoomOut() {
      var level = this.map.getLevel();
      this.map.setLevel(level + 1);
    },
    zoomIn() {
      var level = this.map.getLevel();
      this.map.setLevel(level - 1);
    },
    setMapType(maptype) {
      var roadmapControl = document.getElementById("btnRoadmap");
      var skyviewControl = document.getElementById("btnSkyview");
      if (maptype === "roadmap") {
        this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = "selected_btn";
        skyviewControl.className = "btn";
      } else {
        this.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = "selected_btn";
        roadmapControl.className = "btn";
      }
    },
    // closeOverlay() {
    //   overlay.setMap(null);
    // },
  },
};
</script>

<style scoped lang="scss">
@import url("../css/common.css");
#container {
  display: flex;

  > div {
    &:nth-child(1) {
      display: none;
    }
  }
}
</style>
