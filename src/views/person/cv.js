
        if (this.duration == "2") {
            let other = this.illegalType["%%_1"] - this.illegalType["%酒%_1"] - this.illegalType["%速%_1"] - this.illegalType["%证%_1"] - this.illegalType["%线%_1"];
            this.driverIllegalType.push({name: "酒驾醉驾", value: this.illegalType["%酒%_1"] == null ? 0 : this.illegalType["%酒%_1"], rate: this.illegalType["%酒%_1"] == null ? 0 : Math.round(this.illegalType["%酒%_1"] / this.illegalType["%%_1"] * 100)});
            this.driverIllegalType.push({name: "限速违规", value: this.illegalType["%速%_1"] == null ? 0 : this.illegalType["%线%_1"], rate: this.illegalType["%线%_1"] == null ? 0 : Math.round(this.illegalType["%线%_1"] / this.illegalType["%%_1"] * 100)});
            this.driverIllegalType.push({name: "涉证违规", value: this.illegalType["%证%_1"] == null ? 0 : this.illegalType["%证%_1"], rate: this.illegalType["%证%_1"] == null ? 0 : Math.round(this.illegalType["%证%_1"] / this.illegalType["%%_1"] * 100)});
            this.driverIllegalType.push({name: "标识标线违规", value: this.illegalType["%线%_1"] == null ? 0 : this.illegalType["%线%_1"], rate: this.illegalType["%线%_1"] == null ? 0 : Math.round(this.illegalType["%线%_1"] / this.illegalType["%%_1"] * 100)});
            this.driverIllegalType.push({name: "其他违规", value: other == null ? 0 : other, rate: other == 0 ? 0 : Math.round(other / this.illegalType["%%_1"] * 100)});
          }
          if (this.duration == "1") {
            let other = this.illegalType["%%_2"] - this.illegalType["%酒%_2"] - this.illegalType["%速%_2"] - this.illegalType["%证%_2"] - this.illegalType["%线%_2"];
            this.driverIllegalType.push({name: "酒驾醉驾", value: this.illegalType["%酒%_2"] == null ? 0 : this.illegalType["%酒%_2"], rate: this.illegalType["%酒%_2"] == null ? 0 : Math.round(this.illegalType["%酒%_2"] / this.illegalType["%%_2"] * 100)});
            this.driverIllegalType.push({name: "限速违规", value: this.illegalType["%速%_2"] == null ? 0 : this.illegalType["%线%_2"], rate: this.illegalType["%线%_2"] == null ? 0 : Math.round(this.illegalType["%线%_2"] / this.illegalType["%%_2"] * 100)});
            this.driverIllegalType.push({name: "涉证违规", value: this.illegalType["%证%_2"] == null ? 0 : this.illegalType["%证%_2"], rate: this.illegalType["%证%_2"] == null ? 0 : Math.round(this.illegalType["%证%_2"] / this.illegalType["%%_2"] * 100)});
            this.driverIllegalType.push({name: "标识标线违规", value: this.illegalType["%线%_2"] == null ? 0 : this.illegalType["%线%_2"], rate: this.illegalType["%线%_2"] == null ? 0 : Math.round(this.illegalType["%线%_2"] / this.illegalType["%%_2"] * 100)});
            this.driverIllegalType.push({name: "其他违规", value: other == null ? 0 : other, rate: other == 0 ? 0 : Math.round(other / this.illegalType["%%_2"] * 100)});
          }
          if (this.duration == "0") {
            let other = this.illegalType["%%_3"] - this.illegalType["%酒%_3"] - this.illegalType["%速%_3"] - this.illegalType["%证%_3"] - this.illegalType["%线%_3"];
            this.driverIllegalType.push({name: "酒驾醉驾", value: this.illegalType["%酒%_3"] == null ? 0 : this.illegalType["%酒%_3"], rate: this.illegalType["%酒%_3"] == null ? 0 : Math.round(this.illegalType["%酒%_3"] / this.illegalType["%%_3"] * 100)});
            this.driverIllegalType.push({name: "限速违规", value: this.illegalType["%速%_3"] == null ? 0 : this.illegalType["%线%_3"], rate: this.illegalType["%线%_3"] == null ? 0 : Math.round(this.illegalType["%线%_3"] / this.illegalType["%%_3"] * 100)});
            this.driverIllegalType.push({name: "涉证违规", value: this.illegalType["%证%_3"] == null ? 0 : this.illegalType["%证%_3"], rate: this.illegalType["%证%_3"] == null ? 0 : Math.round(this.illegalType["%证%_3"] / this.illegalType["%%_3"] * 100)});
            this.driverIllegalType.push({name: "标识标线违规", value: this.illegalType["%线%_3"] == null ? 0 : this.illegalType["%线%_3"], rate: this.illegalType["%线%_3"] == null ? 0 : Math.round(this.illegalType["%线%_3"] / this.illegalType["%%_3"] * 100)});
            this.driverIllegalType.push({name: "其他违规", value: other == null ? 0 : other, rate: other == 0 ? 0 : Math.round(other / this.illegalType["%%_3"] * 100)});
          }