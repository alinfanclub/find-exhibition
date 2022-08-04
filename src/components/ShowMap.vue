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
        <div id="bg" v-show="this.$store.state.closeBtn == true"></div>
      </div>
      <!-- 지도타입 컨트롤 div 입니다 -->
      <!-- <div class="custom_typecontrol radius_border">
        <span
          id="btnRoadmap"
          class="selected_btn"
          @click="setMapType('roadmap')"
          >지도</span
        >
        <span id="btnSkyview" class="btn" @click="setMapType('skyview')"
          >스카이뷰</span
        >
      </div> -->
      <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
      <!-- <div class="custom_zoomcontrol radius_border">
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
      </div> -->
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
      closeBtn: false,
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
    // 맵 초기 셋팅 ---------------------------------------------------------------------
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(
          this.$store.state.mainLocation.lat,
          this.$store.state.mainLocation.lng
        ),
        level: this.$store.state.viewLevel,
      };
      const map = new kakao.maps.Map(container, options);
      this.map = map;
      // 마커 셋팅  ---------------------------------------------------------------------
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      for (var i = 0; i < this.$store.state.positions.length; i++) {
        // 마커 이미지의 이미지 크기
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커위치 지정
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
        // 커스텀 오버레이 셋팅  ---------------------------------------------------------------------
        // 콘텐츠
        let content = document.createElement("div");

        let header = document.createElement("div");
        header.className = "header";

        let info = document.createElement("div");

        let close = document.createElement("ion-icon");
        close.onclick = () => {
          overlay.setMap(null);
        };

        let title = document.createElement("div");

        let link = document.createElement("a");
        link.href = store.state.positions[i].url;
        link.target = "_blank";
        link.appendChild(
          document.createTextNode(`${store.state.positions[i].place_name}`)
        );

        let adress = document.createElement("div");
        adress.appendChild(
          document.createTextNode(`${store.state.positions[i].adress}`)
        );
        let subBtnArea = document.createElement("div");
        subBtnArea.className = "sub-btn-area";

        let moreInfo = document.createElement("a");
        moreInfo.href = "/space/" + store.state.positions[i].id;
        moreInfo.appendChild(document.createTextNode("더보기"));

        let contect = document.createElement("div");

        let contentRoute = document.createElement("a");
        contentRoute.href =
          "https://map.kakao.com/link/to/" +
          store.state.positions[i].place_name +
          "," +
          store.state.positions[i].lat +
          "," +
          store.state.positions[i].lng;
        contentRoute.target = "_blank";

        contentRoute.appendChild(document.createTextNode("길찾기"));

        content.appendChild(info);
        info.appendChild(header);
        info.appendChild(adress);
        info.appendChild(subBtnArea);
        header.appendChild(title);
        header.appendChild(close);
        subBtnArea.appendChild(contect);
        subBtnArea.appendChild(moreInfo);
        contect.appendChild(contentRoute);
        title.appendChild(link);

        title.className = "title";
        content.className = "wrap";
        adress.className = "adress";
        info.className = "info";
        close.name = "close-outline";
        close.className = "close-btn";
        //오버레이 생성
        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
        });
        //초기 오버레이 닫은 상태로 시작하기 위해 추가.
        overlay.setMap(null);
        kakao.maps.event.addListener(marker, "click", function () {
          overlay.setMap(map);
          map.panTo(this.getPosition(store.state.setLevel));
          console.log(store.state.closeBtn);
          store.state.closeBtn = true;
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
#xxx {
  background-color: #fff;
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  overflow: hidden;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
#bg {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  z-index: 1;
}
/* we will explain what these classes do next! */
// .v-enter-active {
//   transition: opacity 0.5s step-end;
// }
// .v-leave-active {
//   transition: opacity 0.1s ease;
// }

// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
// }
</style>
