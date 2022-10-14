<template>
  <div id="FrequentAccidents" style="flex:1;height:100%"></div>
</template>
<script>
// import {pieChart} from "./pieChart"
export default {
  name:'FrequentAccidents',
  data() {
    return {
      value:[
        {name:'平交路口',value:97,itemStyle: {
                color: '#99D3F3',
            },},
        {name:'穿过村镇',value:32, itemStyle: {
                color: '#007AFF',
            },},
        {name:'标志际线',value:65, itemStyle: {
                color: '#1F9AA7',
            },},
        {name:'防护设施',value:54, itemStyle: {
                color: '#2563AE',
            },},
        {name:'其他隐患',value:24,itemStyle: {
                color: '#F5B64C',
            },},
      ]
    }
  },
  mounted(){
    // pieChart('FrequentAccidents',this.value)
  }
}
</script>