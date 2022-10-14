<template>
  <div class="chart_container" style="height: 100%">
    <div id="ageChart" style="width: 33%; height: 100%"></div>
    <div id="genderChart" style="width: 33%; height: 100%"></div>
    <!-- <div id="licenseType" style="width: 40%; height: 100%"></div> -->
  </div>
</template>
<script>
export default {
  name: 'DriverCategory',
  data () {
    return {
      sumValue: null
    }
  },
  mounted () {
    this.agePie();
    this.genderPie();
    this.licensePie()
  },
  methods: {
    agePie () {
      let ageChart = this.$echarts.init(document.getElementById("ageChart"));
      let data = [{
        name: "6-10年",
        value: 30
      },
      {
        name: "11-15年",
        value: 20
      },
      {
        name: "1-3年",
        value: 15
      },
      {
        name: "超过20年",
        value: 10
      },
      {
        name: "16-20年",
        value: 6
      },
      {
        name: "4-5年",
        value: 6
      },
      {
        name: "不满一年",
        value: 6
      },
      ];
      let arrName = this.getArrayValue(data, "name");
      let arrValue = this.getArrayValue(data, "value");
      this.sumValue = eval(arrValue.join('+'));
      let num = this.sumValue;
      let objData = this.array2obj(data, "name");
      let optionData = this.getData(data)
      ageChart.setOption(

        {
          title: {
            text: '驾龄(岁)占比',
            textStyle: {
              color: "#0ff",
              fontSize: 14
            },
            x: "center",
            y: "5"
          },
          legend: {
            backgroundColor: '#0C2956',
            show: true,
            icon: "circle",
            // top: "center",
            top: "15%",
            // bottom: '53%',
            left: "41%",
            orient: 'vertical',
            data: arrName,

            itemWidth: 10,
            itemHeight: 10,
            // width: 50,
            // padding: [0, 18],
            // itemGap: 36,
            formatter: function (name) {
              return (
                "{title|" +
                name +
                "} {value|" +
                ((objData[name].value / num) * 100).toFixed(2) +
                "}  {title|%}"
              );
            },
            textStyle: {
              rich: {
                title: {
                  fontSize: 14,
                  lineHeight: 30,
                  color: "#fff",
                },
                value: {
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#0ff",
                },
              },
            },
          },
          tooltip: {
            show: true,
            trigger: "item",
            formatter: "{a}<br>{b}:{c}({d}%)",
          },
          color: [
            "rgb(9,187,247)",
            "rgb(184,254,165)",
            "rgb(253,218,23)",
            "rgb(252,152,12)",
          ],
          xAxis: [
            {
              show: false,
            },
          ],
          series: optionData.series,
        }
      )

    },
    getArrayValue (array, key) {
      var newkey = key || "value";
      var res = [];
      if (array) {
        array.forEach(function (t) {
          res.push(t[newkey]);
        });
      }
      return res;
    },
    array2obj (array, key) {
      var resObj = {};
      for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
      }
      return resObj;
    },
    getData (data) {
      var res = {
        series: [],
        yAxis: []
      };
      for (let i = 0; i < data.length; i++) {
        res.series.push({
          name: '驾龄',
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [85 - i * 15 + '%', 80 - i * 15 + '%'],
          center: ["40%", "60%"],
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            borderWidth: 5,
          },
          data: [{
            value: data[i].value,
            name: data[i].name
          }, {
            value: this.sumValue - data[i].value,
            name: '',
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
        });
        res.series.push({
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [85 - i * 15 + '%', 80 - i * 15 + '%'],
          center: ["40%", "60%"],
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            borderWidth: 5,
          },
          data: [{
            value: 7.5,
            itemStyle: {
              color: "rgb(3, 31, 62)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
        });
        res.yAxis.push((data[i].value / this.sumValue * 100).toFixed(2) + "%");
      }
      return res;
    },
    genderPie () {
      let genderChart = this.$echarts.init(document.getElementById("genderChart"));
      let arr = [{
        name: '男',
        value: 20
      }, {
        name: '女',
        value: 10
      },];
      var data = [];
      var color = ['#00ffff', '#FC71FA',]
      for (var i = 0; i < arr.length; i++) {
        data.push({
          value: arr[i].value,
          name: arr[i].name,
          itemStyle: {
            label: {
              normal: {
                show: false
              }
            },
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: color[i],
              shadowColor: color[i]
            }
          }
        }, {
          value: 2,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        });
      }
      var seriesOption = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [85, 80],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'outside',
              color: '#ddd',
              formatter: function (params) {
                var percent = 0;
                var total = 0;
                for (var i = 0; i < arr.length; i++) {
                  total += arr[i].value;
                }
                percent = ((params.value / total) * 100).toFixed(0);
                if (params.name !== '') {
                  return params.name + '\n' + '\n' + '占百分比：' + percent + '%';
                } else {
                  return '';
                }
              },
            },
            labelLine: {
              length: 30,
              length2: 100,
              show: true,
              color: '#00ffff'
            }
          }
        },
        data: data
      }];
      genderChart.setOption(
        {
          color: color,
          title:{
          text: '性别(男/女)占比',
            textStyle: {
              color: "#0ff",
              fontSize: 14
            },
            x: "center",
            y: "5"
          },
          graphic: {
            elements: [
              {
                type: "text",
                z: 4,
                style: {
                  text: '男',
                  fill: '#00ffff',
                  font: '1.5em "STHeiti", sans-serif'
                },
                left: '38%',
                top: '45%'

              },
              {
                type: "text",
                z: 4,
                style: {
                  text: '67%',
                  fill: '#fff',
                  font: '1.2em "STHeiti", sans-serif'
                },
                left: '35%',
                top: '55%'
              },
              {
                type: "text",
                z: 4,
                style: {
                  text: '女',
                  fill: '#00ffff',
                  font: '1.5em "STHeiti", sans-serif'
                },
                right: '38%',
                top: '45%'

              },
              {
                type: "text",
                z: 4,
                style: {
                  text: '33%',
                  fill: '#fff',
                  font: '1.2em "STHeiti", sans-serif'
                },
                right: '35%',
                top: '55%'
              },
            ]
          },
          tooltip: {
            show: true
          },

          toolbox: {
            show: false
          },
          series: seriesOption
        }
      )
    },
    licensePie(){
      let licenseType = this.$echarts.init(document.getElementById("licenseType"));
      let data = [
          {
              value: 100,
              name: 'A1',
          },
          {
              value: 100,
              name: 'A2',
          },
          {
              value: 90,
              name: 'B1',
          },
          {
              value: 90,
              name: 'B2',
          },
      ]
      licenseType.setOption({
        color: ['#1fe5ea', '#1daeff', '#f4e051', '#06C955'],
        tooltip:{
          show:true
        },
        legend: {
            top: '10%',
            left: '5%',
            icon: 'rect',
            orient: 'vertical',
            itemGap: 30,
            textStyle: {
               color:"#fff"
            },
            data: data,
        },
        title:{
          text: '驾照类型占比',
            textStyle: {
              color: "#0ff",
              fontSize: 14
            },
            x: "center",
            y: "5"
          },
          graphic: {
            elements: [
              {
                type: "text",
                z: 4,
                style: {
                  text: '驾照类型',
                  fill: '#00ffff',
                  font: '1.5em "STHeiti", sans-serif'
                },
                left: '50%',
                top: '46%'

              },
            ]
          },
        series: [
            //环形
            {
                name: '驾照类型',
                type: 'pie',
                radius: ['60%', '72%'],
                center: ['60%', '50%'],
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    },
                },
                zlevel: 1,
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: data,
            },
            //环形分割线
            {
                name: '',
                type: 'gauge',
                radius: '80%',
                clockwise: true,
                startAngle: '90',
                center: ['60%', '50%'],
                endAngle: '-269.9999',
                splitNumber: 22,
                zlevel: 2,
                detail: {
                    offsetCenter: [10, 20],
                    formatter: ' ',
                },
                axisLine: {
                    lineStyle: {
                        width: 0,
                        opacity: 0,
                    },
                },
                axisTick: {
                    show: false,
                },
                markArea: {
                    itemStyle: {
                        color: '#0f0',
                    },
                },
                splitLine: {
                    show: true,
                    length: 32,
                    padding: [0, 0, 0],
                    lineStyle: {
                        color: '#022457',
                        width: 3,
                    },
                },
                axisLabel: {
                    show: false,
                },
            },
            {
                type: 'pie',
                name: '',
                tooltip:{
                  show:false
                },
                radius: ['50%', '52%'],
                center: ['60%', '50%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                    normal: {
                        color: '#fff',
                    },
                },
                label: {
                    show: false,
                },
                data: [100],
            },
        ],
    }
      )
    }
  }
}
</script>