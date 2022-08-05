<template>
  <div id="container">
    <div>
      <form @submit.prevent="inputKeyword()">
        <input
          type="text"
          v-model="this.keywordSearch"
          @click="this.$store.state.searchBar = !this.$store.state.searchBar"
        />
      </form>
      <div v-show="this.$store.state.searchBar">
        <ul>
          <li
            v-for="list in this.$store.state.positions"
            :key="list"
            @click="this.$store.state.searchBar = !this.$store.state.searchBar"
          >
            <div
              v-show="list.place_name.includes(this.keywordSearch)"
              class="ae"
            >
              {{ list.place_name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div id="nav" v-show="!this.$store.state.searchBar">
      <ion-icon name="menu"></ion-icon>
    </div>
    <div class="map_wrap">
      <div id="map"></div>
      <div id="myCenter" v-show="!this.$store.state.searchBar">
        <div v-show="this.$store.state.localIconShow == true">
          <ion-icon name="location" id="getCenter"></ion-icon>
        </div>
        <div v-show="this.$store.state.localIconShow == false">
          <ion-icon name="location-outline" id="hideMyCenter"></ion-icon>
        </div>
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
      //--------------------------------------------------------------------------------
      // 내 위치 마커
      //--------------------------------------------------------------------------------
      document
        .querySelector("#getCenter")
        .addEventListener("click", function () {
          store.state.localIconShow = false;
          if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
              var Mylat = position.coords.latitude, // 위도
                Mylon = position.coords.longitude; // 경도

              var locPosition = new kakao.maps.LatLng(Mylat, Mylon); // 인포윈도우에 표시될 내용입니다

              // 마커와 인포윈도우를 표시합니다
              displayMarker2(locPosition);
            });
          } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

            displayMarker2(locPosition);
          }
          var imageSrc =
            "https://www.citypng.com/public/uploads/small/11641513638sanpg6vtthzma5pmyxbnbe0sfhpnqdawfg2pjpzl11hkj9qhwbj7g0ektsxgghfjeml4jehzbjkaujbydzfrhf4nb9agagomf0yz.png";
          var imageSize = new kakao.maps.Size(20, 20);
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          function displayMarker2(locPosition) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: locPosition,
              image: markerImage,
            });
            map.setCenter(locPosition);

            map.setLevel(3);

            kakao.maps.event.addListener(marker, "click", function () {
              marker.setMap(null);
              store.state.localIconShow = true;
            });

            document
              .querySelector("#hideMyCenter")
              .addEventListener("click", function () {
                map.panTo(locPosition);
                if (store.state.localIconShow == true) {
                  marker.setMap(map);
                }
              });
          }
        });
      // 마커 셋팅  ---------------------------------------------------------------------
      var imageSrc =
        "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-7-16347.png";
      for (var i = 0; i < this.$store.state.positions.length; i++) {
        // 마커 이미지의 이미지 크기
        var imageSize = new kakao.maps.Size(40, 40);

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

        let label = document.createElement("div");
        label.appendChild(
          document.createTextNode(store.state.positions[i].label)
        );

        content.appendChild(info);
        info.appendChild(header);
        info.appendChild(label);
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
        //오버레이 생성-----------------------------------------------------
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
      const goToPlace = document.querySelectorAll(".ae");
      goToPlace.forEach(function (event, index) {
        var moveLatLng = new kakao.maps.LatLng(
          store.state.positions[index].lat,
          store.state.positions[index].lng
        );
        event.addEventListener("click", function () {
          map.panTo(moveLatLng);
        });
      });

      kakao.maps.event.addListener(map, "click", function () {
        store.state.searchBar = false;
        console.log("active");
      });
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
      display: block;
      padding: 10px;
      position: fixed;
      width: 100%;
      z-index: 2;
      left: 50%;
      transform: translateX(-50%);
      padding-top: 2rem;

      form {
        width: 50%;
        margin: 0 auto;
        position: relative;
        height: 3rem;
        input {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: none;
          box-shadow: 1px 1px 10px #9c9c9c;
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          height: 100%;
          z-index: 6;
          outline: none;
          text-align: center;
          font-size: 1.5rem;
        }
      }

      > div {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        width: 100vw;
        height: 100vh;
        padding: 7rem 0;
        z-index: 5;

        ul {
          max-height: 400px;
          overflow: scroll;
        }
      }
    }
  }

  #nav {
    position: fixed;
    top: 2rem;
    left: 1rem;
    z-index: 3;
    font-size: 3rem;
  }
}
.ae {
  padding: 10px;
  cursor: pointer;
  text-align: center;
}
</style>
