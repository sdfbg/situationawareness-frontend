<template>
  <div id="trafficAlert" style="height: calc(100% - 0.8rem); bottom: 1.5em"></div>
</template>
<script>
import api from "@/api";
import cities from "../../../common/city";
export default {
  name: 'TrafficAlert',
  data() {
    return {
      cities,
      chart: undefined,
      policeCount: {},
    }
  },
  mounted () {
    this.chart = this.$echarts.init(document.getElementById('trafficAlert'));
    this.chart.showLoading({
      text: "正在加载...",
      textColor: "#fff",
      color: "#fff",
      maskColor: "transparent",
      X: "center",
      y: "center",
      effect: "spin"
    });
    this.getPoliceCount();
  },
  methods: {
    getPoliceCount() {
      this.$axios.post(api.getPoliceCount()).then((res) => {
        this.policeCount = res.data;
        this.sendPoliceCount();
        this.init();
      })
    },
    sendPoliceCount() {
      this.$emit("recivePoliceData", this.policeCount);
    },
    init () {
      let chartData = [];
      let la = [], ta = [];
      la = this.policeCount.lastYearTodayListByArea,
      la.splice(9, 1);
      ta = this.policeCount.todayListByArea;
      // chartData =  this.cities.map(c => ({name: c.name, value: ta.filter(t => t.CITY == c.code)[0].COUNT, compared: ((ta.filter(t => t.CITY == c.code)[0].COUNT - la.filter(l => l.CITY == c.code)[0].COUNT) / la.filter(l => l.CITY == c.code)[0].COUNT * 100).toFixed(2) }))
      ta.forEach((d, i) => {
        const lastYearCount = la[i]?la[i].COUNT:0
        const city = this.cities.find(c => c.code == d.CITY)
        if(!city){
          return
        }
        chartData.push({
          name: city.name,
          value: d.COUNT,
          compared: (((d.COUNT - lastYearCount) / lastYearCount) * 100).toFixed(2)
        });
      });
      // 红的
      let imgUp =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAexJREFUWEftlj9IG1Ecx7+/y1FBxcEjCQqC3t3kYGkuIDqIDh2cGhBxEsFFcNDN1XZ0KJRCl0JBnKRDN1F00EWKmD9QsVC400GJ3AMXB8Wo+ZVCFAm55L0LNIO59b6/7/fzvu8e7wgNfqjefLbtFnLd27A+dQEIxzoFYBDzx2j25EMYiNAApfDex1BmnohnT36oQoQCEI75HaDJ52EE5ItcHI9nT3+pQCgD+I75hUDzlUKIcQjWU9Hcn7wshBKASJqzYPpWzZzB24VXhVTPz/MbGQhpAP9N32to2g4BUQnjtVjGm5HQQQpA9Pe3o7WwAeYRGdOSZjGW8T7X0ssBONYqAKkVPQu80QlvO9PefjWImgB+wnxPRMu1VhLwPhfR8M449M6C5qsCiIQ1BcJ6yPDSGO3c4zrVnclfVzw5QeZ+om9AI22Tge76AAAmfI2nvTklAOFYuwBG6w1/nI/o1GMcuOflfoFbIBx7ksCfQjawVxZ0FMt4C0oNVBJfJO3RCPMWgJagZh6IxrrSbjlAYJE1T0H5pHAsD4DZSICq38b/aKAJ0Gyg2UCzgRfegJ+wVoiw1LC7wE/a08S8FnC1Hms6DRsH7pXsf4TybXg5aHfc32EI4AGA256CSBN6EXtGzv0tG/5PpwygYi6j/QuNY80hJ6JoYwAAAABJRU5ErkJggg==';
      // 绿的
      let imgDown =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAetJREFUWEftlTFo1GAUx/8vtLVFWkdHLRaUJgfCgZe2OLSgFAqCooKbLi7ieg4mdxe+tNCOIoKTjqUFETt0EKHQwS/oIDSpS4dOdq443ND7nuTKLcddLl/uzjpc1rz3//++f973Qjjjh3T954pXx0/ODS0R07Xm3mFVe7u78vNIR1MbwHat7wDyrU34vRTRk34DcHsDPpQimjxDAECKUCtVreL4ZLZrJSQwABgkMEhgkMB/kMCo8Wdsxzuspl3HWpuwUJ6aIDV6nCTOBpuBF+33BcB2px8DxrtkcVqTYu9F1wAFx9wgogdphRLrGBXph16rmrafwHatAwBXegHAzJuBHz3UApgpWXeZ8aEnAOBHgYjWtQBOf725VYCL3UAQ6PlXsfe6nUbiLcg/zQ+PXKx+YdDNTBAMT/phJam34zWcLU9fV8r4COCSJsSWFOGdTj0dAWKBG465YBDFEOOdBE/f0y821K00+yAVQCxZcMz7RLSZBoAThq65PzVAfShLlg/Gy8RNCH4WiOhNGtB6VmkLG3W2m9sGeLFlH8ORfriso6kNMOPmcgz1CaDLTUafpQhv65hnSiBumnXMBUW0DWCkYchG9ULgHfz+JwD1eXCseyC8YuC8qqn5byv7P3TNMyeQxSjTJuylUTutv8R3siHwOq4+AAAAAElFTkSuQmCC';
      this.chart.setOption(
        {
          color: ['#00B7EE', '#EFA281', '#A482DC', '#49C3A5', '#2DABE0', '#E3E276', "#F6A3D8",'#A0D4E3','#2DBE5C','#00FFFF'],
          tooltip: {
            show: true,
            backgroundColor: '#1B2D56',
            borderColor: '#2BD8FB',
            textStyle: {
                color: '#fff',
            },
            renderMode:'html',
            formatter:(params)=>{
              let str = ''
              let list =[]
              let img1
              if(params.data.compared>0){
                img1=imgUp
              }else{
                img1 = imgDown
              }
              list.push(
                '<p style="text-align:left;margin-bottom:5px">'+params.name+'：'+params.value+'起</p>'
                +'<p style="text-align:left;margin-bottom:5px">同比：<img src="'+img1+'" height="18" />'+Math.abs(params.data.compared)+'%'+'</p>'
              )
              str = list.join('')
              return str;
            },
          },
          legend: {
            orient: 'vertical',
            top: "10%",
            right: "0%",
            textStyle: {
              color: '#f2f2f2',
              fontSize: 14,
            },
            icon: 'roundRect',
            data: chartData,
          },
          series: [
            // 主要展示层的
            {
              radius: ['0%', '62%'],
              center: ['40%', '50%'],
              type: 'pie',
              label: {
                normal: {
                  show: true,
                  formatter: "{b}\n{d}%",
                  textStyle: {
                    fontSize: 15,
                    color: '#fff'
                  },
                  position: 'outside'
                },
                emphasis: {
                  show: true
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 10,
                  length2: 10
                },
                emphasis: {
                  show: true
                }
              },
              name: "警情",
              data: chartData,
              z: 9,
            },
          ]
        }
      )
      this.chart.hideLoading();
    }
  }
}
</script>
<style lang="less" scoped>
.red{
  background: url("../../../assets/images/right_arrow.png");
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>