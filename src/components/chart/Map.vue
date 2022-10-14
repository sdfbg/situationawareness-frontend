<template>
  <div
    ref="mapTu"
    style="width: 98%; float: right; height: calc(100% - 0.5rem);overflow:visible"
    class="map-tu"
  ></div>
</template>
<script>
import api from "@/api";
import features from "./json/index.js";
import * as echarts from "echarts";
const provinceCode = "220000"
const dev = false
export default {
  name: "MapInfo",
  data() {
    return {
      currentCode: provinceCode,
      chartInstance: undefined,
      endPoints:[],
      pointLoading: true,
    };
  },
  props: {
    stat:{
      type: Array,
      required: true
    },
    loading:{
      type: Boolean,
      required: true
    },
    showMonth:{
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    province(){
      return this.currentCode.endsWith("0000")
    }
  },
  watch: {
    loading() {
      this.drawMap()
    },
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.mapTu);
    this.chartInstance.on("click", (params) => {
      if(this.province){
        const district = features[this.currentCode].find(f=>f.name==params.name)
        this.currentCode = district.code
      }else {
        this.currentCode = provinceCode
      }
      this.drawMap();
    });
    this.$axios.get(api.coords()).then(res=>{
      this.endPoints = res.data
      this.pointLoading = false
      this.drawMap()
    })
  },
  methods: {
    drawMap() {
      if(this.loading||this.pointLoading){
        this.chartInstance.showLoading({
          text: "正在加载...",
          textColor: "#fff",
          color: "#fff",
          maskColor: "transparent",
          X: "center",
          y: "center",
          effect: "spin"
        });
        return
      }
      this.chartInstance.clear()
      this.chartInstance.hideLoading();
      const scale = 1;
      const map = this.currentCode
      const stat = this.stat.filter(s=>!s.code.endsWith('00')).filter(s=>s.code)
      const data = features[this.currentCode].map(f=>{
        const {code,name,center,parentCode} = f
        const endPoint = this.endPoints.find(p=>p.code==code)
        const coords=[center,endPoint?[endPoint.x,endPoint.y]:center]
        let thisStat
        if(this.province){
          thisStat = stat.filter(s=>s.code.slice(0,4)==code.slice(0,4))
        }else {
          thisStat = stat.filter(s=>s.code==code)
        }
        return {code,name,stat:{
          total:thisStat.map(d=>d.total).reduce((d1, d2) => d1 + d2, 0),
          month:thisStat.map(d=>d.month).reduce((d1, d2) => d1 + d2, 0)
        },coords,parentCode}
      })
      const option = {
        geo: [
          {
            map,
            zoom: 1.25,
            aspectScale: 1,
            label: {
              show: false,
            },
            itemStyle: {
              shadowColor: "#00d2ff", // #044B4D
              shadowOffsetY: 9,
              shadowOffsetX: 9,
              opacity: 0.6,
              shadowBlur: 6,
            },
          },
        ],
        series: [
          {
            type: "map",
            map,
            aspectScale: 1, // 地图比例
            zoom: 1.25, // 地图缩放倍数
            label: {
              // 地图字体，通常状态
              normal: {
                show: true,
                color: "#fff",
                fontSize: 12 * scale,
              },
              // 地图字体，选中状态
              emphasis: {
                show: true,
                fontSize: 12 * scale,
                color: "#fff",
              },
            },
            itemStyle: {
              areaColor: "#083288",
              borderColor: "rgba(0, 210, 255, 1)", // #00d2ff
              borderWidth: 2,
              color: "#fff",
              // 地图区块样式，选中状态
              emphasis: {
                areaColor: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#084DBC",
                    },
                    {
                      offset: 1,
                      color: "#092F5E",
                    },
                  ],
                },
              },
            },
          },
           {
            type: 'lines',
            z: 3,
            coordinateSystem: 'geo',
            symbol: "circle",
            symbolSize: [10, 0], //只保留地图端标记
            opacity: 1,
            label: {
              show: true,
              backgroundColor: '#07277E',
              borderColor: '#2BD8FB',
              position: 'end',
              formatter: (params) => {
                const label = '{title|' +
                    params.name +
                    '}\n{value| 总数：' +
                    params.data.stat.total +
                    '}'
                if(!this.showMonth) return label
                return label+'\n{value| 月增量：'+params.data.stat.month +'}'
              },
              borderWidth: 1,
              borderRadius: 4,
              align: 'center',
              width: 100,
              rich: {
                //标题样式
                title: {
                  align: 'center',
                  lineHeight: 20,
                  fontSize: 12,
                  color: '#fff',
                  backgroundColor: '#00A1E9',
                  width: 100,
                  height: 20,
                  borderRadius: [4, 4, 0, 0],
                },
                value: {
                  //内容样式
                  height: 25,
                  width: 100,
                  color: '#fff',
                  // backgroundColor: '#fff',
                  borderRadius: [0, 0, 4, 4],
                },
                title_active: {
                  align: 'center',
                  lineHeight: 17,
                  fontSize: 12,
                  color: '#fff',
                  backgroundColor: '#0745EC',
                  width: 100,
                  height: 25,
                  borderRadius: [4, 4, 0, 0],
                },
                value_active: {
                  height: 25,
                  width: 100,
                  color: '#fff',
                  backgroundColor: '#fff',
                  borderRadius: [0, 0, 4, 4],
                },
              },
            },
            labelLayout: ()=>{
              return {
                draggable: true
              }
            },
            lineStyle: {
              //视觉引导线属性
              type: 'dashed',
              opacity: 1,
              color: '#34A0FF', //引导线颜色
              curveness: 0.1,
            },
            data,
          },
        ],
      };
      this.chartInstance.setOption(option, true);
      if(dev){
        this.setDraggableCircle(data)
      }
      this.chartInstance.resize();
    },
    setDraggableCircle(data){
      this.chartInstance.setOption({
        graphic: {
          elements:data.map(d=>{
            const {code, coords, name} = d
            const [x,y] = this.chartInstance.convertToPixel({ seriesIndex: 0 }, coords[1])
            return {
              type:"circle",x,y,z:100,
              shape:{
                r: 25,
              },
              draggable: true,
              ondragend: (event)=>{
                const [x,y]=this.chartInstance.convertFromPixel({ seriesIndex: 0 }, [event.offsetX, event.offsetY])
                const index = this.endPoints.findIndex(p=>p.code==code)
                const endPoint = {code, x: x.toFixed(1),y: y.toFixed(1), name}
                this.$axios.put(api.coords(),endPoint).then(()=>{
                  if(index>-1){
                    this.endPoints.splice(index,1,endPoint)
                  }else {
                    this.endPoints.push(endPoint)
                  }
                  this.drawMap();
                  this.$message.success("成功")
                })
              }
            }
          })
        }
      });
    }
  },
};
</script>

<style lang='less' scoped>
.map-tu {
  width: 100%;
  height: 100%;
}
</style>
