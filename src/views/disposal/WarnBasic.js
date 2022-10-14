import redWarnCion from "../../assets/images/warn/modal/warn_icon.png";
const WarnBasic = {
  name: "WarnBasic",
  props: {
    editable: Boolean,
    task: Object,
    spans: Array,
  },
  render() {
    const label = this.$store.state.dispoal.fromWarn?"预警":"任务"
    let index = 0;
    const spans = Array.from({length:4})
    this.spans.forEach(ss => ss.forEach(s=>spans[index++]=s));
    const elements = [
      <a-col span={spans[0]}>
        <label>{label}级别：</label>
        {
          this.editable?
            <a-input vModel={this.task.level}/>:
            <span>
              {this.task.level}
              <img src={redWarnCion} />
            </span>
        }
      </a-col>,
      <a-col span={spans[1]}>
        <label>{label}来源：</label>
        {
          this.editable?
            <a-input vModel={this.task.source}/>:
            <span class="blue">{this.task.source}</span>
        }
      </a-col>,
      <a-col span={spans[2]}>
        <label>{label}信息：</label>
        {
          this.editable?
            <a-input vModel={this.task.warnContent}/>:
            <span>{this.task.warnContent}</span>
        }
      </a-col>,
      <a-col span={spans[3]}>
        <label>{label}时间：</label>
        {
          this.editable?
            <a-input vModel={this.task.time}/>:
            <span>{this.task.time}</span>
        }
      </a-col>
    ];
    index = 0;
    return (
      <div>
        <h4>预警基本信息</h4>
        <hr class="line" />
        <div class="warn_item">
          {this.spans.map((ss) => (
            <a-row>
              {ss.map(()=>(elements[index++]))}
            </a-row>
          ))}
        </div>
      </div>
    );
  }
};

export default WarnBasic;
