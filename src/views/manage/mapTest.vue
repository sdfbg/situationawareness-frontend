<template>
  <div id="map">
    <div id="bjmap" style="height: 926px"></div>
  </div>
</template>
<script>
// import mapstyle from '../../assets/mapjs/styleMap'
import api from '../../api/index'
export default {
  name: 'Map',
  data() {
    return {
      zuobiao:{},
      zuobiaoList:[],
      pointLineList:[]
    };
  },
  props: ["road"],
  mounted () {
    // this.initMap()
    this.showPoint()
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
    async showPoint () {
      const minemap = minemap || window.minemap; // 划重点
      const self = this;
      if (this.road) {
        self.bjMap = new minemap.Map({
          container: 'bjmap',
          // style: '//32.183.102.110:21009/service/solu/style/id/12874', /*底图样式*/
          style: '//32.183.102.110:21009/service/solu/style/id/12887',
          // style: mapstyle, /*底图样式*/
          zoom: 9, //初始化地图层级
          center: [125.326834,43.835838], //初始化地图中心点,
          pitch: 0, /*地图俯仰角度*/
          maxZoom: 17, /*地图最大缩放等级*/
          minZoom: 3,  /*地图最小缩放等级*/
          projection: 'MERCATOR'
        });
      } else {
        self.bjMap = new minemap.Map({
          container: 'bjmap',
          style: '//32.183.102.110:21009/service/solu/style/id/12874', /*底图样式*/
          // style: '//32.183.102.110:21009/service/solu/style/id/12887',
          // style: mapstyle, /*底图样式*/
          zoom: 9, //初始化地图层级
          center: [125.326834,43.835838], //初始化地图中心点,
          pitch: 0, /*地图俯仰角度*/
          maxZoom: 17, /*地图最大缩放等级*/
          minZoom: 3,  /*地图最小缩放等级*/
          projection: 'MERCATOR'
        });
      }
      
      //默认marker
      const zuobiaoList = []
      await this.$axios.post(api.showLan()).then(res=>{
      res.data.forEach(element => {
        zuobiaoList.push({lng: element.lng, lat: element.lat})
      });
    })
    // const lnglatArray = [
    //     {lng: 113.814359, lat: 22.693554},
    //     {lng: 114.11053, lat: 22.543196},
    //     {lng: 113.88604, lat: 22.55653}
    // ];
    // lnglatArray.forEach(element => {
    //   console.log(typeof(element.lng))
    // });
    // lnglatArray.push(lnglat)
    // lnglatArray.forEach(element => {
    //     var marker = new minemap.Marker().setLngLat(element).addTo(self.bjMap);
    //     marker.setDraggable(true); //此方法可以设置marker的拖拽属性，true为可以拖拽，false为不可以拖拽
    //     var draggable = marker.isDraggable()
    //     var popup = new minemap.Popup({closeOnClick: false, closeButton: false, offset: [0, -40]}).setText(`我是默认marker，我的拖拽属性是${draggable}`)
    //     marker.setPopup(popup).togglePopup();
    // });
    // 自定义marker，显示坐标标点
    zuobiaoList.forEach(ele => {
        var el = document.createElement('div');
        el.id = 'marker';
        el.style["background-image"] = "url(//32.183.102.110:21009/api/static/demo/js-api/zh/images/park.png)";
        el.style["background-size"] = "cover";
        el.style.width = "50px";
        el.style.height = "50px";
        el.style["border-radius"] = "50%";
        var _marker = new minemap.Marker({
            draggable: false, //可以在初始化的时候决定是否可以拖拽
            element: el, //可以将自定义的DOM元素给element字段
            offset: [-25, -50]
        }).setLngLat([ele.lng, ele.lat - 0.07]).addTo(self.bjMap);
        var _draggable = _marker.isDraggable()
        var _popup = new minemap.Popup({closeOnClick: false, closeButton: false, offset: [0, -50]}).setText(`我是自定义marker，我的拖拽属性是${_draggable}`)
        _marker.setPopup(_popup).togglePopup();
    });
    //热力图
    //创建地图对象后，开始加载地图资源，地图资源加载完成后触发load事件
    self.bjMap.on('load', function () {
        // 增加自定义数据源、自定义图层
        addSources();
        addLayers();
    });
    function addSources() {
        //添加数据源,该热力图效果，数据源类型支持geojson或vector两种形式
        self.bjMap.addSource("heatmapSource", {
            type: "geojson",
            data: {
            "type": "FeatureCollection",
            "features": [
            {
               "type": "Feature",
               "geometry": {
                  "type": "Point",
                  "coordinates": [
                    116.518189,
                    43.823959
                  ]
               },
                "properties": {
                  "mag": 1
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    116.484547,
                    43.890054
                  ]
                },
                "properties": {
                  "mag": 3
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    116.341913,
                    39.730316
                  ]
                },
                "properties": {
                  "mag": 1
                }
              }]}/*可以是具体的服务*/
        });
    }
    function addLayers() {
        self.bjMap.addLayer({
            "id": "heatmapLayer",
            "type": "heatmap",
            "source": "heatmapSource",
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                // 一个热力图数据点的模糊范围，单位是像素，默认值30；要求：值大于等于1，可根据zoom level进行插值设置
                "heatmap-radius": 30,
                //一个热力图单个数据点的热力程度，默认值为1；要求：值大于等于0，支持使用property中某个的热力值
                "heatmap-weight": {
                    "property": "mag",
                    "stops": [[0, 0], [10, 1]]
                },
                // 用于统一控制热力值的强度，默认值1；要求：值大于等于0，可根据zoom level进行插值设置
                "heatmap-intensity": 1,
                // 表示热力图颜色阶梯，阶梯的值域范围为0-1，默认值为["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
                "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0, "rgba(0, 0, 255, 0)", 0.1, "royalblue", 0.3, "cyan", 0.5, "lime", 0.7, "yellow", 1, "red"
                ],
                // 表示热力图的不透明度，默认值1；值域范围0-1，可根据zoom level进行插值设置
                "heatmap-opacity": 1,
            }
        });
    }
    //渐变线效果
    this.showLines();
    },
    async showLines(){
      //  var start = document.getElementById("start-input").value;
      //   var end = document.getElementById("end-input").value;
      const start = '125.326834,43.83584'
      const end = '125.325124,43.849941'
      let data = {
        origin:start,
        destination:end,
        key:'e1ef37c2a24e42f7910a5436b2f24d54'//暂时
      }
      await this.$axios.post(api.showStreet(),data).then(res=>{
        res.data.data.result.routes[0].steps.forEach(element => {
          element.polyline.split(';').forEach(ele => {
            this.pointLineList.push(ele.split(','))
          });
          
        });
      })

      this.showJianbian();
    },
    showJianbian(){
       this.bjMap.on('load', () => {
        // 实现线渐变的数据源必须满足两点：
        // 1. type: 'geojson'
        // 2. lineMetrics: true
        this.bjMap.addSource('lineSource', {
            type: 'geojson',
            data: {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": 
                        this.pointLineList
                    },
                    "properties": {
                        "title": "路线一",
                        "kind": 1
                    }
                }]
            },
            "lineMetrics": true
        });

        this.bjMap.addLayer({
            "id": "lineLayer",
            "type": "line",
            "source": "lineSource",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
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
                    0.7, "yellow",
                    1, "yellow"
                ]
            },
            "minzoom": 7,
            "maxzoom": 17.5
        });
      })

    }


  }
}
</script>
<style>
#map {
  width: 100%;
  height: 100%;
}
</style>