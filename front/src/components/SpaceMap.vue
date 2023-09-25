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
            v-for="(list, i) in this.$store.state.markersSpace"
            :key="i"
            @click="
              (this.$store.state.searchBar = !this.$store.state.searchBar),
                initText()
            "
          >
            <div
              v-show="list.place_name?.includes(this.keywordSearch)"
              class="ae"
              @click="go_to_place(list._id)"
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
import router from "@/router/index.js";
import { mapState } from "vuex";
export default {
  name: "KakaoMap",
  data() {
    return {
      modalOpen: false,
      keywordSearch: "",
      closeBtn: false,
    };
  },
  created() {
    this.$store.dispatch("FETCH_MARKERS_SPACE");
  },
  computed: {
    ...mapState(["isOK"]),
  },
  watch: {
    isOK: function () {
      this.initMap();
    },
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
    // this.$store.dispatch("FETCH_MARKERS_SPACE");
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
        disableDoubleClickZoom: true,
      };
      const map = new kakao.maps.Map(container, options);
      this.map = map;

      // var clusterer = new kakao.maps.MarkerClusterer({
      //   map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      //   minLevel: 10, // 클러스터 할 최소 지도 레벨
      // });
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
      for (var i = 0; i < this.$store.state.markersSpace.length; i++) {
        var imageSize = new kakao.maps.Size(40, 40); // * 마커 이미지의 이미지 크기

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // * 마커 이미지를 생성

        displayMarker(this.$store.state.markersSpace[i]); // * 해당 위치들에 마커 표시
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

        // let link = document.createElement("a");
        // link.href = "/space/" + store.state.markersSpace[i]._id;
        let link = document.createElement("div");
        link.addEventListener("click", function () {
          for (let i = 0; i < store.state.markersSpace.length; i++) {
            if (store.state.markersSpace[i].place_name == this.innerText) {
              router.push("/space/" + store.state.markersSpace[i]._id);
            } else {
              console.log(store.state.markersSpace[i].place_name);
            }
          }
        });
        link.appendChild(
          document.createTextNode(`${store.state.markersSpace[i].place_name}`)
        );

        let adress = document.createElement("div");

        let adressP = document.createElement("p");
        adressP.appendChild(
          document.createTextNode(`${store.state.markersSpace[i].contents}`)
        );
        let subBtnArea = document.createElement("div");
        subBtnArea.className = "sub-btn-area";

        let contect = document.createElement("div");

        let contentRoute = document.createElement("a");
        contentRoute.href =
          "https://map.kakao.com/link/to/" +
          store.state.markersSpace[i].place_name +
          "," +
          store.state.markersSpace[i].lat +
          "," +
          store.state.markersSpace[i].lng;
        contentRoute.target = "_blank";

        let findLoadIcon = document.createElement("ion-icon");
        findLoadIcon.name = "train-outline";

        contentRoute.appendChild(findLoadIcon);

        content.appendChild(info);
        info.appendChild(header);
        info.appendChild(adress);
        adress.appendChild(adressP);
        info.appendChild(subBtnArea);
        header.appendChild(title);
        header.appendChild(close);
        subBtnArea.appendChild(contect);
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
          zIndex: 10,
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
      }

      var addMarker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: store.state.np,
      });
      // 지도에 마커를 표시합니다
      addMarker.setMap(map);
      addMarker.setDraggable(true);
      // ! 위치 추가 오버레이 생성-----------------------------------------------------
      let con = document.createElement("div");
      con.className = "add-marker-container";
      let conInner = document.createElement("div");
      let conHeader = document.createElement("div");
      conHeader.className = "con-header";
      let conTitle = document.createElement("h1");
      conTitle.appendChild(document.createTextNode("장소를 등록 하세요!"));
      let addMarkercloseBtn = document.createElement("button");
      addMarkercloseBtn.appendChild(document.createTextNode("취소"));
      addMarkercloseBtn.onclick = () => {
        addMarkerOverlay.setMap(null);
        addMarker.setMap(null);
      };
      addMarkercloseBtn.name = "close-outline";
      addMarkercloseBtn.className = "close-btn";

      let conBody = document.createElement("div");
      conBody.className = "con-body";
      let agreeBtn = document.createElement("a");
      agreeBtn.className = "agreeBtn";
      agreeBtn.href = "space/make";
      agreeBtn.appendChild(document.createTextNode("등록"));

      con.appendChild(conInner);
      conInner.appendChild(conHeader);
      conInner.appendChild(conBody);
      conHeader.appendChild(conTitle);
      conBody.appendChild(agreeBtn);
      conBody.appendChild(addMarkercloseBtn);

      let addMarkerOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(35.1775975996367, 129.1154036580446),
        content: con,
        map: map,
      });
      // ! 맵 클릭시 장소 추가 마커 생성
      kakao.maps.event.addListener(map, "dblclick", function (c) {
        var p = c.latLng;
        store.state.clickLocation = p;
        localStorage.setItem("la", store.state.clickLocation.Ma);
        localStorage.setItem("ma", store.state.clickLocation.La);
        console.log(store.state.clickLocation);
        console.log(store.state.clickLocation);
        addMarker.setMap(map);
        addMarker.setPosition(store.state.clickLocation);
        addMarkerOverlay.setMap(null);
      });
      addMarkerOverlay.setMap(null);
      // ! 맵 클릭시 장소 추가 커스텀 오버레이 생성
      kakao.maps.event.addListener(addMarker, "click", function () {
        addMarkerOverlay.setMap(map);
        console.log(this.getPosition());
        addMarkerOverlay.setPosition(store.state.clickLocation);
        map.panTo(this.getPosition());
      });
      // ! 마커 드래그시 커스텀 오버레이 같이 이동
      kakao.maps.event.addListener(addMarker, "dragend", function () {
        console.log(this.getPosition());
        store.state.clickLocation = this.getPosition();
        addMarkerOverlay.setPosition(store.state.clickLocation);
      });
    },
    // ! new method start
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
    go_to_place(e) {
      this.$router.push("/space/" + e);
    },
  },
};
</script>

<style scoped lang="scss">
@import url("../css/common.css");
@import url("../css/map.css");
</style>
