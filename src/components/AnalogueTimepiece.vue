<template>
  <div style="height: 100%; width: 100%;">
    <canvas
      id="clock-canvas"
      ref="clock"
      :width="width"
      :height="width"
      style="background-color:#333"
    ></canvas>
  </div>
</template>

<script>
export default {
  computed: {
    radius() {
      let radius = this.width / 2;
      radius = radius * 0.9;
      return radius;
    }
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      win: {
        x: 0,
        y: 0
      },
      width: 0,
      time: null,
      timer: 0
    };
  },
  watch: {
    width() {
      this.$nextTick(() => {
        this.drawClock();
      });
    }
  },
  mounted() {
    this.canvas = this.$refs.clock;
    this.ctx = this.$refs.clock.getContext("2d");
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.setDimensions();
        window.addEventListener("resize", this.setDimensions);
      });
    },
    drawClock() {
      this.ctx.moveTo(0, 0);
      this.ctx.clearRect(0, 0, this.width, this.width);
      this.ctx.translate(this.width / 2, this.width / 2);
      this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "white";
      this.ctx.fill();
      this.drawFace();
    },
    drawFace() {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "white";
      this.ctx.fill();

      let grad = this.ctx.createRadialGradient(
        0,
        0,
        this.radius * 0.95,
        0,
        0,
        this.radius * 1.05
      );
      grad.addColorStop(0, "#333");
      grad.addColorStop(0.5, "white");
      grad.addColorStop(1, "#333");
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = this.radius * 0.1;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius * 0.1, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#333";
      this.ctx.fill();
      this.drawNumbers();
    },
    drawNumbers() {
      var ang;
      var num;
      this.ctx.font = this.radius * 0.15 + "px arial";
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6;
        this.ctx.rotate(ang);
        this.ctx.translate(0, -this.radius * 0.85);
        this.ctx.rotate(-ang);
        this.ctx.fillText(num.toString(), 0, 0);
        this.ctx.rotate(ang);
        this.ctx.translate(0, this.radius * 0.85);
        this.ctx.rotate(-ang);
      }
      this.drawTime();
    },
    createFace() {
      this.ctx = this.$refs.clock.getContext("2d");
      this.ctx.translate(this.width / 2, this.width / 2);
      this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fill();
      this.$nextTick(() => {
        this.createNumbers();
      });
    },
    createNumbers() {
      var ang;
      var num;
      this.ctx.font = this.radius * 0.15 + "px arial";
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "#000000";
      for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6;
        this.ctx.rotate(ang);
        this.ctx.translate(0, -this.radius * 0.85);
        this.ctx.rotate(-ang);
        this.ctx.fillText(num.toString(), 0, 0);
        this.ctx.rotate(ang);
        this.ctx.translate(0, this.radius * 0.85);
        this.ctx.rotate(-ang);
      }
      this.drawTime();
    },
    drawTime() {
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      //hour
      hour = hour % 12;
      hour =
        (hour * Math.PI) / 6 +
        (minute * Math.PI) / (6 * 60) +
        (second * Math.PI) / (360 * 60);
      this.drawHand(hour, this.radius * 0.5, this.radius * 0.07);
      //minute
      minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
      this.drawHand(minute, this.radius * 0.8, this.radius * 0.07);
      // second
      second = (second * Math.PI) / 30;
      this.drawHand(second, this.radius * 0.9, this.radius * 0.02);
      this.ctx.translate(this.radius, this.radius);
    },
    drawHand(pos, length, width) {
      this.ctx.beginPath();
      this.ctx.lineWidth = width;
      this.ctx.lineCap = "round";
      this.ctx.moveTo(0, 0);
      this.ctx.rotate(pos);
      this.ctx.lineTo(0, -length);
      this.ctx.stroke();
      this.ctx.rotate(-pos);
    },
    setDimensions() {
      this.width = 0;
      this.win.x = window.innerWidth;
      this.win.y = window.innerHeight;
      this.width = Math.min(this.$el.clientWidth, this.win.x, this.win.y);
    }
  }
};
</script>

<style lang="scss"></style>
