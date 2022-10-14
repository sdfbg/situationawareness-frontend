import provinceJson from "./province.json";
import changchunJson from "./changchun.json";
import baichengJson from "./baicheng.json";
import songyuanJson from "./songyuan.json";
import sipingJson from "./siping.json";
import jilinJson from "./jilin.json";
import liaoyuanJson from "./liaoyuan.json";
import tonghuaJson from "./tonghua.json";
import baishanJson from "./baishan.json";
import yanbianJson from "./yanbian.json";
import * as echarts from "echarts";

const features={}
const nameFilter = name=>{
  return name
}
const handle = (mapJson)=>{
  const subs = mapJson.features.map( ({properties:p})=>{
    const center = p.centroid?p.centroid:p.center
    return {
      code: p.adcode.toString(),
      name: nameFilter(p.name),
      center: [...center],
      level: p.level,
      parentCode: p.parent.adcode,
    }
  })
  const code = subs[0].parentCode
  features[code]=subs
  echarts.registerMap(code, mapJson);
}
handle(provinceJson)
handle(changchunJson)
handle(baichengJson)
handle(songyuanJson)
handle(sipingJson)
handle(jilinJson)
handle(liaoyuanJson)
handle(tonghuaJson)
handle(baishanJson)
handle(yanbianJson)

export default features