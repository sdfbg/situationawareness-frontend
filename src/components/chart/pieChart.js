export const genOption = (data, title) => {
  let option = {};
  option = getPie3D(data, 0, title);
  // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
  option.series.push({
    name: "pie2d",
    type: "pie",
    tooltip: {
      formatter: "{b}:{c}\n{d}%",
      opacity: 1
    },
    labelLine: {
      show: true,
      length: 30,
      length2: 10
    },
    label: {
      opacity: 1,
      color: "#fff",
      formatter: "{b}:{c}\n{d}%",
    },
    startAngle: -20, // 起始角度，支持范围[0, 360]。
    clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ["0", "60%"],
    center: ["50%", "50%"],
    data,
    itemStyle: {
      opacity: 0
    },
    zIndex: 0
  });
  return option;
};
function getPie3D(pieData, internalDiameterRatio, title) {
  //internalDiameterRatio:透明的空心占比
  const sumValue = pieData.map(d=>d.value).reduce((d1,d2)=>d1+d2,0);
  // const legendData = pieData.map(d=>({name:d.name,value:fomatFloat(d.value / sumValue, 4)}))
  let k = 1 - internalDiameterRatio;
  let startValue = 0;
  let endValue = 0;
  const series = pieData.map((d,i)=>{
    endValue = startValue + d.value;
    const parametricEquation = getParametricEquation(
      startValue / sumValue,
      endValue / sumValue,
      d.selected,
      d.hovered,
      k,
      d.value
    );
    startValue = endValue;
    const name = d.name ? d.name : `series${i}`
    const itemStyle = d.itemStyle?{...d.itemStyle}:undefined
    return {
      name,
      itemStyle,
      parametricEquation,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false
      },
    }
  })
  let max=0
  pieData.forEach(({value}) => {
    if(value>max)max=value
  });
  
  let boxHeight = (26 * 25) / max; //通过传参设定3d饼/环的高度，26代表26px
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    title: {
      text: title,
      textStyle: {
        color: "#fff",
        fontSize: 14
      },
      x: "center",
      top: 5
    },
    legend: {
      show: false
    },
    labelLine: {
      show: true,
      lineStyle: {
        color: "#7BC0CB"
      }
    },
    label: {
      show: true,
      position: "outside",
      rich: {
        b: {
          color: "#7BC0CB",
          fontSize: 12,
          lineHeight: 20
        },
        c: {
          fontSize: 16
        }
      },
      formatter: "{b|{b} \n}{c|{c}}{b|  }"
    },
    tooltip: {
      formatter: params => {
        if (
          params.seriesName !== "mouseoutSeries" &&
          params.seriesName !== "pie2d"
        ) {
          let bfb = (
            (pieData[params.seriesIndex].value)/sumValue *
            100
          ).toFixed(2);
          return (
            `${params.seriesName}<br/>` +
            `${
              pieData[params.seriesIndex].value
            }<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
              params.color
            };"></span>` +
            `${bfb}%`
          );
        }
      }
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight, //圆环的高度
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 45, //角度
        distance: 300, //调整视角到主体的距离，类似调整zoom
        rotateSensitivity: 0, //设置为0无法旋转
        zoomSensitivity: 0, //设置为0无法缩放
        panSensitivity: 0, //设置为0无法平移
        autoRotate: false //自动旋转
      }
    },
    series: series
  };
  return option;
}

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h
) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function(u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function(u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function(u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    }
  };
}