<template>
  <div id="map">
    <div id="bjmap" style="height: 840px"></div>
  </div>
</template>
<script>
// import mapstyle from '../../assets/mapjs/styleMap'
// import api from "../../api/index";
import zfz from '../../assets/images/warn/modal/zfz.png';
// import police from '../../assets/images/warn/modal/police.png';
import sxt from '../../assets/images/warn/modal/sxt.png';
export default {
  name: "Map",
  props: {
    Info: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  watch: {
    Info() {
      // this.showPoint();
    },
  },
  data() {
    return {
      centerClon: "",
      centerClat: "",
      zuobiao: {},
      zuobiaoList: [],
      pointLineList: [],
      warnPointData: {},
    };
  },
  mounted() {
    // this.initMap()
    this.showPoint();
  },
  methods: {
    // 初始化地图实例
    // initMap () {
    //   const minemap = minemap || window.minemap; // 划重点
    //   const self = this;
    //   self.bjMap = new minemap.Map({
    //     container: 'bjmap',
    //     style: 'https://mineservice.minedata.cn/service/solu/style/id/12612', /*底图样式*/
    //     // style: mapstyle, /*底图样式*/
    //     zoom: 9, //初始化地图层级
    //     center: [125.326834,43.835838], //初始化地图中心点,
    //     pitch: 0, /*地图俯仰角度*/
    //     maxZoom: 17, /*地图最大缩放等级*/
    //     minZoom: 3,  /*地图最小缩放等级*/
    //     projection: 'MERCATOR'
    //   });
    //   //默认marker
    // var lnglat = self.bjMap.getCenter();
    // var marker = new minemap.Marker().setLngLat(lnglat).addTo(self.bjMap);
    // marker.setDraggable(true); //此方法可以设置marker的拖拽属性，true为可以拖拽，false为不可以拖拽
    // var draggable = marker.isDraggable()
    // var popup = new minemap.Popup({closeOnClick: false, closeButton: false, offset: [0, -40]}).setText(`我是默认marker，我的拖拽属性是${draggable}`)
    // marker.setPopup(popup).togglePopup();
    // },
    // mapCenter(jd,wd){
    //   const minemap = minemap || window.minemap; // 划重点
    //     const self = this;
    //     self.bjMap = new minemap.Map({
    //       container: "bjmap",
    //       style:
    //         "//32.183.102.110:21009/service/solu/style/id/12874" /*底图样式*/,
    //       // style: mapstyle, /*底图样式*/
    //       zoom: 11, //初始化地图层级
    //       center: [jd,wd], //初始化地图中心点,
    //       pitch: 0 /*地图俯仰角度*/,
    //       maxZoom: 17 /*地图最大缩放等级*/,
    //       minZoom: 3 /*地图最小缩放等级*/,
    //       projection: "MERCATOR",
    //     });
    // },
    async showPoint() {
      if (
        ['ly_sd_yj','ly_st_yj','ly_sw_yj','ly_jz_yj','ly_vio_tried','ly_vio_speed','ly_close_gps','ly_other_province'].indexOf(this.Info.type)>-1
      ) {
        this.centerClon = this.Info.warn.yjjd;
        this.centerClat = this.Info.warn.yjwd;
      } else {
        this.centerClon = this.Info.warnPointData.clon;
        this.centerClat = this.Info.warnPointData.clat;
      }
      const minemap = minemap || window.minemap; // 划重点
      const self = this;
      self.bjMap = new minemap.Map({
        container: "bjmap",
        style:
          "//32.183.102.110:21009/service/solu/style/id/12874" /*底图样式*/,
        // style: mapstyle, /*底图样式*/
        zoom: 11, //初始化地图层级
        center: [this.centerClon, this.centerClat], //初始化地图中心点,
        pitch: 0 /*地图俯仰角度*/,
        maxZoom: 17 /*地图最大缩放等级*/,
        minZoom: 3 /*地图最小缩放等级*/,
        projection: "MERCATOR",
      });
      var el = document.createElement("img");
      el.style.zIndex = 110;
      el["src"] = sxt;
      // el2.style["background-size"] = "cover";
      el.style.width = "27px";
      el.style.height = "27px";
      if (
        ['ly_sd_yj','ly_st_yj','ly_sw_yj','ly_jz_yj','ly_vio_tried','ly_vio_speed','ly_close_gps','ly_other_province'].indexOf(this.Info.type)>-1
      ) {
        let _marker = new minemap.Marker({
          draggable: false, //可以在初始化的时候决定是否可以拖拽
          element: el, //可以将自定义的DOM元素给element字段
          offset: [-13, -50],
        })
          .setLngLat([this.Info.warn.yjjd, this.Info.warn.yjwd])
          .addTo(self.bjMap);
        let _popup = new minemap.Popup({
          closeOnClick: false,
          closeButton: false,
          offset: [0, -50],
        }).setHTML(
          `<span style="font-size: 8px;font-weight: bold">卡口名称：${this.Info.warn.kkmc}</span>`
        );
        _marker.setPopup(_popup).togglePopup();
        var el2 = document.createElement("img");
        el2.style.zIndex = 120;
        el2["src"] = zfz;
        // el2.style["background-size"] = "cover";
        el2.style.width = "27px";
        el2.style.height = "27px";
        // el2.style["border-radius"] = "50%";
        var _zfz = new minemap.Marker({
          draggable: false, //可以在初始化的时候决定是否可以拖拽
          element: el2, //可以将自定义的DOM元素给element字段
          offset: [-13, -50],
          color: "red"
        })
          .setLngLat([this.Info.zfz.zfzjd, this.Info.zfz.zfzwd])
          .addTo(self.bjMap);
        var _popupz = new minemap.Popup({
          closeOnClick: false,
          closeButton: false,
          offset: [0, -50],
        }).setHTML(
          `<span style="font-size: 8px;font-weight: bold">执法站名称：${this.Info.zfz.zfzmc}</span>`
        );
        _zfz.setPopup(_popupz).togglePopup();

        if (this.Info.current) {
          const point = this.Info.current.lonlat.split(",");
          this.warnPointData = {
            warnPoint: {
              clon: parseFloat(point[0]),
              clat: parseFloat(point[1]),
            },
            carPlate: this.Info.current.num,
            time: this.Info.current.timeStr,
            address: this.Info.current.address,
            road: this.Info.current.roads[0],
          };

          var el3 = document.createElement("div");
          el3.style.zIndex = 120;
          var zpp = document.createElement("div");
          zpp.className = "ring-point-marker";
          var zpp1 = document.createElement("div");
          zpp1.className = "ring-point-inner1";
          var zpp2 = document.createElement("div");
          zpp2.className = "ring-point-inner2";
          var zpp3 = document.createElement("div");
          zpp3.className = "ring-point-inner3";
          zpp.appendChild(zpp1);
          zpp.appendChild(zpp2);
          zpp.appendChild(zpp3);
          el3.appendChild(zpp);
          var _current = new minemap.Marker({
            draggable: false, //可以在初始化的时候决定是否可以拖拽
            element: el3, //可以将自定义的DOM元素给element字段
            offset: [-25, -50],
          })
            .setLngLat([
              this.warnPointData.warnPoint.clon,
              this.warnPointData.warnPoint.clat,
            ])
            .addTo(self.bjMap);
          let _currentTxt;
          if (this.warnPointData.road) {
            _currentTxt = new minemap.Popup({
              closeOnClick: false,
              closeButton: false,
              offset: [0, -50],
            }).setHTML(
              `<span style="font-size: 16px;font-weight: bold">车牌号：${this.warnPointData.carPlate}<br/>当前日期：${this.warnPointData.time}<br/>当前地址：${this.warnPointData.address}<br/></span> 
                  <span v-if="${this.warnPointData.road} != null" style="font-size: 16px;font-weight: bold">当前地点：${this.warnPointData.road.rnm}朝${this.warnPointData.road.dir}${this.warnPointData.road.dis}米</span>`
            );
          } else {
            _currentTxt = new minemap.Popup({
              closeOnClick: false,
              closeButton: false,
              offset: [0, -50],
            }).setHTML(
              `<span style="font-size: 16px;font-weight: bold">车牌号：${this.warnPointData.carPlate}<br/>当前日期：${this.warnPointData.time}<br/>当前地址：${this.warnPointData.address}<br/></span>`
            );
          }
          _current.setPopup(_currentTxt).togglePopup();
        }
      } else {
        if (this.Info.current == null) {
          return;
        }
        const point = this.Info.current.lonlat.split(",");
        this.warnPointData = {
          warnPoint: {
            clon: parseFloat(point[0]),
            clat: parseFloat(point[1]),
          },
          carPlate: this.Info.num,
          time: this.Info.timeStr,
          address: this.Info.address,
          road: this.Info.roads[0],
        };
        let _marker = new minemap.Marker({
          draggable: false, //可以在初始化的时候决定是否可以拖拽
          element: el, //可以将自定义的DOM元素给element字段
          offset: [-25, -50],
        })
          .setLngLat([
            this.Info.warnPointData.clon,
            this.Info.warnPointData.clat,
          ])
          .addTo(self.bjMap);
        let _popup = new minemap.Popup({
          closeOnClick: false,
          closeButton: false,
          offset: [0, -50],
        }).setHTML(
          `<span style="font-size: 16px;font-weight: bold">车牌号：${this.warnPointData.carPlate}<br/>预警日期：${this.warnPointData.time}<br/>预警地址：${this.warnPointData.address}<br/></span>
            <span v-if="${this.warnPointData.road} != null" style="font-size: 16px;font-weight: bold">预警地点：${this.warnPointData.road.rnm}朝${this.warnPointData.road.dir}${this.warnPointData.road.dis}米</span>`
        );
        _marker.setPopup(_popup).togglePopup();
      }
      //<span style="font-size: 16px;font-weight: bold">车牌号：${this.Info.carPlate}<br/>预警日期：${this.Info.time}<br/>预警地址：${this.Info.address}<br/></span>
      //       <span v-if="${this.Info.road} != null" style="font-size: 16px;font-weight: bold">预警地点：${this.Info.road.rnm}朝${this.Info.road.dir}${this.Info.road.dis}米</span>
      // var _marker_1 = new minemap.Marker({
      //   draggable: false, //可以在初始化的时候决定是否可以拖拽
      //   element: el, //可以将自定义的DOM元素给element字段
      //   offset: [-25, -50],
      // })
      //   .setLngLat([125.4606, 43.860927])
      //   .addTo(self.bjMap);
      // var _popup_1 = new minemap.Popup({
      //   closeOnClick: false,
      //   closeButton: false,
      //   offset: [0, -50],
      // }).setHTML(
      //   `<span style="font-size: 16px;font-weight: bold">车牌号：${this.Info.carPlate}<br/>预警日期：${this.Info.time}<br/>预警地址：${this.Info.address}<br/></span>
      //   <span v-if="${this.Info.road} != null" style="font-size: 16px;font-weight: bold">预警地点：${this.Info.road.rnm}朝${this.Info.road.dir}${this.Info.road.dis}米</span>`
      // );
      // _marker_1.setPopup(_popup_1).togglePopup();
      // });
      //热力图
      //创建地图对象后，开始加载地图资源，地图资源加载完成后触发load事件
      self.bjMap.on("load", function () {
        // 增加自定义数据源、自定义图层
        addSources();
        addLayers();
      });
      function addSources() {
        //添加数据源,该热力图效果，数据源类型支持geojson或vector两种形式
        self.bjMap.addSource("heatmapSource", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [116.518189, 43.823959],
                },
                properties: {
                  mag: 1,
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [116.484547, 43.890054],
                },
                properties: {
                  mag: 3,
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [116.341913, 39.730316],
                },
                properties: {
                  mag: 1,
                },
              },
            ],
          } /*可以是具体的服务*/,
        });
      }
      function addLayers() {
        self.bjMap.addLayer({
          id: "heatmapLayer",
          type: "heatmap",
          source: "heatmapSource",
          layout: {
            visibility: "visible",
          },
          paint: {
            // 一个热力图数据点的模糊范围，单位是像素，默认值30；要求：值大于等于1，可根据zoom level进行插值设置
            "heatmap-radius": 30,
            //一个热力图单个数据点的热力程度，默认值为1；要求：值大于等于0，支持使用property中某个的热力值
            "heatmap-weight": {
              property: "mag",
              stops: [
                [0, 0],
                [10, 1],
              ],
            },
            // 用于统一控制热力值的强度，默认值1；要求：值大于等于0，可根据zoom level进行插值设置
            "heatmap-intensity": 1,
            // 表示热力图颜色阶梯，阶梯的值域范围为0-1，默认值为["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0, 0, 255, 0)",
              0.1,
              "royalblue",
              0.3,
              "cyan",
              0.5,
              "lime",
              0.7,
              "yellow",
              1,
              "red",
            ],
            // 表示热力图的不透明度，默认值1；值域范围0-1，可根据zoom level进行插值设置
            "heatmap-opacity": 1,
          },
        });
      }
      //渐变线效果
      this.showLines();
    },
    async showLines() {
      //  var start = document.getElementById("start-input").value;
      //   var end = document.getElementById("end-input").value;
      // const start = "125.326834,43.83584";
      // const end = "125.325124,43.849941";
      // let data = {
      //   origin: start,
      //   destination: end,
      //   key: "e1ef37c2a24e42f7910a5436b2f24d54", //暂时
      // };
      // await this.$axios.post(api.showStreet(), data).then((res) => {
      //   res.data.data.result.routes[0].steps.forEach((element) => {
      //     element.polyline.split(";").forEach((ele) => {
      //       this.pointLineList.push(ele.split(","));
      //     });
      //   });
      // });
      // this.showJianbian();
    },
    showJianbian() {
      this.bjMap.on("load", () => {
        // 实现线渐变的数据源必须满足两点：
        // 1. type: 'geojson'
        // 2. lineMetrics: true
        this.bjMap.addSource("lineSource", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: this.pointLineList,
                },
                properties: {
                  title: "路线一",
                  kind: 1,
                },
              },
            ],
          },
          lineMetrics: true,
        });
        this.bjMap.addLayer({
          id: "lineLayer",
          type: "line",
          source: "lineSource",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-width": 12,
            //添加渐变线属性line-gradient.下面设置色带根据色带进行渲染
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              // 0, "rgba(0, 0, 255, 0)",
              // 0.1, "royalblue",
              // 0.3, "cyan",
              // 0.5, "lime",
              0.7,
              "yellow",
              1,
              "yellow",
            ],
          },
          minzoom: 7,
          maxzoom: 17.5,
        });
      });
    },
  },
};
</script>
<style>
#map {
  width: 96%;
  height: 100%;
  margin: auto;
  margin-top: -40px;
}
@keyframes ring_bound3 {
  from {
    left: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
  }
  to {
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
  }
}
@keyframes ring_bound2 {
  from {
    left: 25px;
    top: 25px;
    width: 10px;
    height: 10px;
  }
  to {
    left: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
  }
}
.ring-point-marker {
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
}
.ring-point-inner3 {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff0000;
  background-color: transparent;
  background-image: radial-gradient(
    circle at center,
    transparent,
    rgba(255, 0, 0, 0.5)
  );
  border: solid 1px rgba(255, 0, 0, 0.6);
  animation: ring_bound3 2s infinite linear;
  z-index: 3;
}
.ring-point-inner2 {
  position: absolute;
  left: 25px;
  top: 25px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff0000;
  background-color: transparent;
  background-image: radial-gradient(
    circle at center,
    transparent,
    rgba(255, 0, 0, 0.5)
  );
  border: solid 1px rgba(255, 0, 0, 0.6);
  animation: ring_bound2 2s infinite linear;
  z-index: 3;
}
.ring-point-inner1 {
  position: absolute;
  left: 25px;
  top: 25px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px #ff0000;
  background-image: radial-gradient(
    circle at center,
    rgba(255, 0, 0, 0.8),
    rgba(255, 0, 0, 0.3)
  );
  z-index: 1;
}
</style>