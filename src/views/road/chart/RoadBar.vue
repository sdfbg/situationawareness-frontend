<template>
  <div :id="id" style="100%;flex:1;"></div>
</template>
<script>
import {barChart} from "./barChart"
export default {
  name:'RoadBar',
  props:{
    value:Array,
    id:String,
    color:Array
  },
  mounted(){
    barChart(this.id,this.value,this.color)
  }
}
</script>