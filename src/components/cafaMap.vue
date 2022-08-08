<template>
  <div id="container">
    <div>
      <div>
        <form @submit.prevent="inputKeyword()">
          <input
            type="text"
            v-model="this.keywordSearch"
            @click="serchBarEventHandler"
            id="searchArea"
            autocomplete="off"
          />
        </form>
        <div id="nav" v-show="!this.$store.state.searchBar">
          <ion-icon name="menu" @click="menuToggle"></ion-icon>
        </div>
      </div>
      <div v-show="this.$store.state.searchBar">
        <ul>
          <li
            v-for="(list, i) in this.$store.state.cafePositions"
            :key="i"
            @click="
              (this.$store.state.searchBar = !this.$store.state.searchBar),
                initText()
            "
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
    // ! 카카오맵 초기 설청 -------------------------------------------------
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
    // !맵 초기 셋팅 ---------------------------------------------------------------------
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
      // !--------------------------------------------------------------------------------
      // !내 위치 마커
      // !--------------------------------------------------------------------------------
      document
        .querySelector("#getCenter")
        .addEventListener("click", function () {
          store.state.localIconShow = false;
          // * 위치 얻어오기
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var Mylat = position.coords.latitude,
                Mylon = position.coords.longitude;

              var locPosition = new kakao.maps.LatLng(Mylat, Mylon);
              displayMarker2(locPosition); //* 위치 마커 생성하는 함수
            });
          } else {
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

            displayMarker2(locPosition); // * 실행이 실패하면 설정한 좌표값에 표시
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
      // ! 전시장소 마커 셋팅  ---------------------------------------------------------------------
      var imageSrc =
        "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-7-16347.png";
      for (var i = 0; i < this.$store.state.cafePositions.length; i++) {
        var imageSize = new kakao.maps.Size(40, 40); // * 마커 이미지의 이미지 크기

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // * 마커 이미지를 생성

        displayMarker(this.$store.state.cafePositions[i]); // * 해당 위치들에 마커 표시
      }
      function displayMarker(place) {
        //* place = 위에서 받아온 위치정보 인자
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.lat, place.lng),
          image: markerImage,
        });
        // ! 커스텀 오버레이 셋팅  ---------------------------------------------------------------------
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

        let adressP = document.createElement("p");
        adressP.appendChild(
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

        let findLoadIcon = document.createElement("ion-icon");
        findLoadIcon.name = "train-outline";

        contentRoute.appendChild(findLoadIcon);

        let label = document.createElement("div");
        label.appendChild(
          document.createTextNode(store.state.positions[i].label)
        );

        content.appendChild(info);
        info.appendChild(header);
        info.appendChild(label);
        info.appendChild(adress);
        adress.appendChild(adressP);
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
        // !오버레이 생성-----------------------------------------------------
        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: map,
          // * 마커들의 위치를 가져온다.
          position: marker.getPosition(),
        });
        overlay.setMap(null);
        // ! 초기 오버레이 닫은 상태로 시작하기 위해 추가.
        kakao.maps.event.addListener(marker, "click", function () {
          overlay.setMap(map);
          map.panTo(this.getPosition());
          store.state.closeBtn = true;
        });
        // ! 장소 검색하고 리시트 클릭시 해당 마커로 이동
        // TODO 클래스 이름 변경하기
        const goToPlace = document.querySelectorAll(".ae");
        // * li tag 클릭시 이벤트 추가
        goToPlace.forEach(function (event, index) {
          var moveLatLng = new kakao.maps.LatLng(
            store.state.positions[index].lat,
            store.state.positions[index].lng
          );
          event.addEventListener("click", function () {
            map.panTo(moveLatLng);
          });
        });
      }
    },
    //* 메뉴 바 토글
    menuToggle() {
      this.$store.state.menuActive = !this.$store.state.menuActive;
    },
    // * 검색한 결과 클릭시 인풋 값 초기화 하는 함수
    initText() {
      this.keywordSearch = "";
    },
    // * 검색창 로직
    serchBarEventHandler() {
      if (this.$store.state.searchBar == false && this.keywordSearch == "") {
        this.$store.state.searchBar = true;
      } else if (
        this.$store.state.searchBar == true &&
        this.keywordSearch != ""
      ) {
        this.$store.state.searchBar = true;
      } else {
        this.$store.state.searchBar = false;
        document.querySelector("#searchArea").blur();
        this.keywordSearch = "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("../css/common.css");
@import url("../css/map.css");
</style>
