let portalpBase = process.env.VUE_APP_PORTAL_SERVICE_BASE_URL
let staticBase = "statics"
export default {

  portalpBase,staticBase,
  Login() {
    return `${portalpBase}/user/login`
  },
  logOut() {
    return `${portalpBase}/user/logout`
  },
  netLogin() {
    return `${portalpBase}/user/login_net`
  },
  user(id){
    if (id == undefined) return `${portalpBase}/user`
    return `${portalpBase}/user/${id}`
  },
  loginUser(){
    return `${portalpBase}/auth/current_user`
  },
  userStatus(){
    return `${portalpBase}/user/updataStatus`
  },
  users() {
    return `${portalpBase}/user/getUsers`
  },
  departments() {
    return `${portalpBase}/user/getDepartment`
  },
  roless() {
    return `${portalpBase}/user/getRole`
  },
  batchDelete() {
    return `${portalpBase}/user/batchDelete`
  },
  exportExcel() {
    return `${portalpBase}/user/export`
  },
  importExcel() {
    return `${portalpBase}/user/file`
  },
  // **********************
  applicationGroups(groupId) {
    if (groupId == undefined) return `${portalpBase}/admin/groups`
    return `${portalpBase}/admin/groups/${groupId}`
  },
  organizations(orgId){
    if (orgId == undefined) return `${portalpBase}/admin/orgs/getAllOrg`
    return `${portalpBase}/admin/orgs/getAllOrg/${orgId}`
  },
  polices(orgId,name,number){
    return `${portalpBase}/admin/polices?orgId=${orgId}&name=${name}&number=${number}`
  },
  police(orgId){
    return `${portalpBase}/admin/polices/${orgId}`
  },
  policei(orgId){
    return `${portalpBase}/admin/polices/fileImport/${orgId}`
  },
  policee(orgId,name,number){
    return `${portalpBase}/admin/polices/fileExport?orgId=${orgId}&name=${name}&number=${number}`
  },
  groupApplications() {
    return `${portalpBase}/admin/groups/applications`
  },
  groupRelateApplications(groupId) {
    return `${portalpBase}/admin/groups/${groupId}/applications`
  },
  applications(applicationId) {
    if (applicationId == undefined) return `${portalpBase}/admin/applications`
    return `${portalpBase}/admin/applications/${applicationId}`
  },
  applicationMenus() {
    return `${portalpBase}/admin/applications/menus`
  },
  applicationsBatch() {
    return `${portalpBase}/admin/applications/batch`
  },
  roles(roleId) {
    if (roleId == undefined) return `${portalpBase}/admin/roles`
    return `${portalpBase}/admin/roles/${roleId}`
  },
  myApplicationGroup() {
    return `${portalpBase}/PortalManagement/MyApplicationGroup`
  },
  applicationLogo(applicationId) {
    return `${portalpBase}/PortalManagement/applications/${applicationId}/logo.png`
  },
  myApplication(group_id) {
    return `${portalpBase}/PortalManagement/MyApplication?group_id=${group_id}`
  },
  InsertApp_group_app(group_id,appids) {
    return `${portalpBase}/PortalManagement/App_group_app?group_id=${group_id}&appids=${appids}`
  },
  addApplicationGroup(group_name,remark) {
    return `${portalpBase}/PortalManagement/ApplicationGroup?group_name=${group_name}&remark=${remark}`
  },
  editApplicationGroup(group_id,group_name,) {
    return `${portalpBase}/PortalManagement/ApplicationGroup?group_id=${group_id}&group_name=${group_name}`
  },
  deleteApplicationGroup(group_id) {
    return `${portalpBase}/PortalManagement/ApplicationGroup?group_id=${group_id}`
  },
  userApps(){
    return `${portalpBase}/users/apps`
  },
  userAppsWithoutLogo(){
    return `${portalpBase}/users/appsWithoutLogo`
  },
  accessToken(){
    return `${portalpBase}/users/accessToken`
  },
  loginlognum(searchValue){
    return `${portalpBase}/user/lognum?searchkey=${searchValue}`
  },
  loginlogtable(searchValue,pagenum,pagesize){
    return `${portalpBase}/user/loglist?searchkey=${searchValue}&pagenum=${pagenum}&pagesize=${pagesize}`
  },
  //地图打点，查坐标的集合点
  showLan() {
    return `${portalpBase}/test/getInfo`
  },
  //散点道路高亮
  showStreet() {
    return `${portalpBase}/test/getRoadInfo`
  },
  //获取模型列表的全部模型名称
  getModelName(){
    return `${portalpBase}/model/getModelInfo`
  },
  //获取单个模型信息
  getModelList(){
    return `${portalpBase}/model/getModelList`
  },
  //车辆预警
  getCarWarn(){
    return `${portalpBase}/Analyse/carWarnList`
  },
  //驾驶人预警等级占比
  getWarnAreaLevel() {
      return `${portalpBase}/Analyse/PCRCWarnCount`
  },
  //驾驶人预警等级分析
  getWarningLevelAna() {
    return `${portalpBase}/Analyse/warningLevelAna`
  },
  //重点企业驾驶人占比
  getcompanyPerson() {
    return `${portalpBase}/Analyse/numChartByAlermLevel`
  },
  //代办预警
  getDaibanWarnning() {
    return `${portalpBase}/Analyse/getAllToDo`
  },
  //处理代办
  doTodo() {
    return `${portalpBase}/Analyse/doTodo`
  },
  //实时预警数量
  toDoCount() {
    return `${portalpBase}/Analyse/toDoCount`
  },
  //预警任务
  warnTasks() {
    return `${portalpBase}/warn_tasks`
  },
  warnImages(id,suffix){
    if(id) return `${portalpBase}/upload_files/${id}.${suffix}`
    return `${portalpBase}/upload_files`
  },
  warnDetails(){
    return `${portalpBase}/warnBase/getWarnBaseInfo`
  },
  updateWarnStatus(){
    return `${portalpBase}/warnBase/upDeal`
  },
  //首页---------------------------------------------------------------//
  //交通事故
  getHomeAccidentCount() {
    return `${portalpBase}/sw/home/accidentCount`
  },
  //交通违法
  getHomeIllegalCount() {
    return `${portalpBase}/sw/home/illegalCount`
  },
  //交通警情
  getPoliceCount() {
    return `${portalpBase}/sw/home/policeCount`
  },
  //态势感知-管理---------------------------------------------------------------//
  //中间地图
  getMangeAccidentCountByArea() {
    return `${portalpBase}/sw/mange/accident/midTop`
  },
  //驾驶人未换证，未审验数量
  getManageLeftTop() {
    return `${portalpBase}/sw/mange/leftTop`
  },
  //农村交通违法数据统计
  getManageLeftMid() {
    return `${portalpBase}/sw/mange/midDown`
  },
  //近三年道路隐患时间分布
  getManageLeftDown() {
    return `${portalpBase}/sw/mange/leftDown`
  },
  //车辆未检验未报费违法未处理数量
  getManageMidDown() {
    return `${portalpBase}/sw/mange/midDown`
  },
  //重点企业备案数量
  getManageRightTop() {
    return `${portalpBase}/sw/mange/rightTop`
  },
  //近三年驾校违法数事故数
  getManageRightDown() {
    return `${portalpBase}/sw/mange/rightMid`
  },
  //各地市患有妨碍安全驾驶人员信息统计
  getManageRightMid() {
    return `${portalpBase}/sw/mange/rightDown`
  },
  //态势感知-人------------------------------------------------------//
  //地图各市地图人数
  getPersonCountByArea() {
    return `${portalpBase}/sw/person/personCountByArea`
  },
  //全省驾驶人驾照类型占比
  getDriverLicense() {
    return `${portalpBase}/sw/person/licenseType`
  },
  //全省驾驶人驾龄（岁）占比
  getDriverAge() {
    return `${portalpBase}/sw/person/age`
  },
  //全省驾驶人未换证/未审验数量
  getUpdateLicense() {
    return `${portalpBase}/sw/person/updateLicense`
  },
  //驾驶人违法行为分析
  getIllegalType() {
    return `${portalpBase}/sw/person/illegalType`
  },
  //各地市近三年驾驶人交通事故数
  getAccidentByArea3Year() {
    return `${portalpBase}/sw/person/accidentByArea3Year`
  },
  //各地市近三年驾驶人交通违法数
  getIllegalByArea3Year() {
    return `${portalpBase}/sw/person/illegalByArea3Year`
  },
  //驾驶人预警等级分析
  getPersonLeftTop() {
    return `${portalpBase}/sw/person/leftTop`
  },
  //驾驶人预警等级占比
  getWarnByArea() {
    return `${portalpBase}/sw/person/warnByArea`
  },
  //驾驶人保有量变化情况
  getPersonLeftMid() {
    return `${portalpBase}/sw/person/leftMid`
  },
  //红色预警重点驾驶人top10
  getPersonLeftDown() {
    return `${portalpBase}/sw/person/leftDown`
  },
  //重点驾驶人积分类别
  getPersonMidTop() {
    return `${portalpBase}/sw/person/midTop`
  },
  //重点驾驶人类别分析
  getPersonMidDown() {
    return `${portalpBase}/sw/person/midDown`
  },
  //各地市驾驶人交通事故数量
  getPersonRightTop() {
    return `${portalpBase}/sw/person/rightTop`
  },
  //各地市驾驶人交通违法数量
  getPersonRightMid() {
    return `${portalpBase}/sw/person/rightMid`
  },
  getPersonRightDown() {
    return `${portalpBase}/sw/person/rightDown`
  },
  //态势感知-车====================================================================
  //地图各市地图机动车数
  getCarCountByArea() {
    return `${portalpBase}/sw/car/carCountByArea`
  },
  //全省重点车辆数量分析
  getCarType() {
    return `${portalpBase}/sw/car/carType`
  },
  //全省重点车辆亡人事故数
  getAccidentCount() {
    return `${portalpBase}/sw/car/accidentCount`
  },
  //各地市重点车辆事故数（起/万辆）
  getAccidentCountByArea() {
    return `${portalpBase}/sw/car/accidentCountByArea`
  },
  //全省车辆未检验/违法未处理数量
  getUpdateCard() {
    return `${portalpBase}/sw/car/updateCard`
  },
  //各地市拖拉机、联合收割机分布情况
  getVillageCar() {
    return `${portalpBase}/sw/car/villageCar`
  },
  //左上-重点车辆预警等级分析 
  getCarLeftTop() {
    return `${portalpBase}/sw/car/leftTop`
  },
  //左中-重中型货车违法情况分析 
  getCarLeftMid() {
    return `${portalpBase}/sw/car/leftMid`
  },
  //左下-红色预警重点车辆top10
  getCarLeftDown() {
    return `${portalpBase}/sw/car/leftDown`
  },
  //中上-省界卡口基本情况
  getCarMidTop() {
    return `${portalpBase}/sw/car/midTop`
  },
  //中下-重点车辆辖区预警等级分析
  getCarMidDown() {
    return `${portalpBase}/sw/car/midDown`
  },
  //右上-各地市重点车辆预警分析 
  getCarRightTop() {
    return `${portalpBase}/sw/car/rightTop`
  },
  //右中-各地市车辆保有量分析 
  getCarRightMid() {
    return `${portalpBase}/sw/car/rightMid`
  },
  //右下-各地市车辆类别数量分析 
  getCarRightDown() {
    return `${portalpBase}/sw/car/rightDown`
  },
  //态势感知-路==================================================================
  //全省近三年道路亡人事故数
  getAccidentCountBy3Year() {
    return `${portalpBase}/sw/road/accidentCountBy3Year`
  },
  //各地市近三年百公里亡人事故数
  getDeadCountBy3Year() {
    return `${portalpBase}/sw/road/deadCountBy3Year`
  },
  //各地市事故多发点段和道路隐患分析
  getAccidentAndWarn() {
    return `${portalpBase}/sw/road/accidentAndWarn`
  },
    //左上-亡人事故数量分析 
  getRoadLeftTop() {
    return `${portalpBase}/sw/road/leftTop`
  },
  //左中-普通国省道交通安全违法分析 
  getRoadLeftMid() {
    return `${portalpBase}/sw/road/leftMid`
  },
  //左下-高速公路交通安全违法分析
  getRoadLeftDown() {
    return `${portalpBase}/sw/road/leftDown`
  },
  //中上-省界卡口基本情况
  getRoadrMidTop() {
    return `${portalpBase}/sw/road/midTop`
  },
  //中下-公路风险隐患/事故多发点段top10
  getRoadMidDown() {
    return `${portalpBase}/sw/road/midDown`
  },
  //右上-公路风险隐患数量事故多发点段数量 
  getRoadRightTop() {
    return `${portalpBase}/sw/road/rightTop`
  },
  //右中-全省路段流量情况 
  getRoadRightMid() {
    return `${portalpBase}/sw/road/rightMid`
  },
  //右下-各地区道路里程数 
  getRoadRightDown() {
    return `${portalpBase}/sw/road/rightDown`
  },
  getRoadInfo() {
    return `${portalpBase}/Analyse/roadInfo`
  },
  //态势感知-企业==================================================================
  //全省重点车辆数量分析
  getCompanyCarType() {
    return `${portalpBase}/sw/company/carType`
  },
  //各地市重点企业所属车辆违法分析
  getIllegalCar() {
    return `${portalpBase}/sw/company/illegalCar`
  },
  //各地市重点运输企业备案数量
  getCompanyRecode() {
    return `${portalpBase}/sw/company/companyRecode`
  },
  //各地市重点企业所属车辆事故率（百辆）
  getAccidentCar() {
    return `${portalpBase}/sw/company/accidentCar`
  },
  //左上-重点企业预警等级分析 
  getCompanyLeftTop() {
    return `${portalpBase}/sw/company/leftTop`
  },
    //中间地图
  getCompanyCountByArea() {
    return `${portalpBase}/sw/company/countByArea`
  },
  //左中-重点企业类型预警分析 
  getCompanyLeftMid() {
    return `${portalpBase}/sw/company/leftMid`
  },
  //左下-重点客货运企业top 10
  getCompanyLeftDown() {
    return `${portalpBase}/sw/company/leftDown`
  },
  //中上-省界卡口基本情况
  getCompanyrMidTop() {
    return `${portalpBase}/sw/company/midTop`
  },
  //中下-各地市道路运输企业数据分析
  getCompanyMidDown() {
    return `${portalpBase}/sw/company/midDown`
  },
  //右上-各地市重点企业预警等级分析 
  getCompanyRightTop() {
    return `${portalpBase}/sw/company/rightTop`
  },
  //各地市近三年驾校违法数/事故数（起/万人）
  getCompanyRightMid() {
    return `${portalpBase}/sw/mange/rightMid`
  },
  //右下-重点企业所属车辆违法分析 
  getCompanyRightDown() {
    return `${portalpBase}/sw/company/rightDown`
  },
  //
  options(url) {
    return `${portalpBase}/options/${url}`
  },
  emergency() {
    return `${portalpBase}/warn_tasks/emergency`
  },
  personInfo() {
    return `${portalpBase}/Analyse/personInfo`
  },
  carInfo() {
    return `${portalpBase}/Analyse/carInfo`
  },
  companyInfo() {
    return `${portalpBase}/Analyse/companyInfo`
  },
  manageAccident(type){
    return `${portalpBase}/sw/mange/accident/${type}`
  },
  manageIllegal(type){
    return `${portalpBase}/sw/mange/illegal/${type}`
  },
  accidentCount() {
    return `${portalpBase}/sw/mange/accident/accidentMapTopCount`
  },
  illegalCount() {
    return `${portalpBase}/sw/mange/illegal/illegalMapTopCount`
  },
  coords(){
    return `${portalpBase}/coords`
  },
  warnModels(id){
    if(id) return `${portalpBase}/warn_model/${id}`
    return `${portalpBase}/warn_model`
  },
  warnStat(){
    return `${portalpBase}/WarnDisposal/getOrgWarnSum`
  },
  warnCountByOrgId(){
    return `${portalpBase}/WarnDisposal/getWarnCountByOrgId`
  },
  warnListOrgId(){
    return `${portalpBase}/WarnDisposal/getWarnList`
  },
  //获取当前用户信息
  getUserInfo() {
    return `${portalpBase}/auth/user`
  },
  //获取预警坐标
  getWarnPoint() {
    return `${portalpBase}/Analyse/queryTriedPath`
  },
  getWarnPointCloseGps(){
    return `${portalpBase}/Analyse/queryPathByKK`
  },
  export(name){
    return `${portalpBase}/warn_tasks/exportExcel/${name}`
  },
  warnTaskStat(){
    return `${portalpBase}/warn_tasks/stat`
  },
  getDepartmentWithoutStation(){
    return `${portalpBase}/user/getDepartmentWithoutStation`
  },
  vehicleApplys(){
    return `${portalpBase}/vehicle_applys`
  },
  villages(){
    return `${portalpBase}/city_codes/jl/villages`
  }

}
