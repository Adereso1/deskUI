<script>
export default {
  name: "ProgressBar",
  props: {
    progress: {
      type: [String, Number],
      default: 0
    },
    total: {
      type: [String, Number],
      default: 100
    },
    height: {
      type: Number,
      default: 8
    },
    absoluteWidth: {
      type: Number,
      default: 100
    },
    relativeWidth: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    getHeight() {
      return {
        height: `${this.height}px`
      };
    },
    getAbsoluteWidth() {
      return {
        width: `${this.absoluteWidth}px`
      };
    },
    getRelativeWidth() {
      return !this.relativeWidth ? '' : {
        width: `${this.relativeWidth}%`
      };
    },
    getProgress() {
      return {
        width: `${this.progress}%`
      };
    }
  }
}
</script>
<template>
  <div class="desk-progress" :style="{...getHeight, ...getAbsoluteWidth, ...getRelativeWidth}">
    <div class="progress-bar" role="progressbar" :style="getProgress" />
  </div>
</template>
<style lang="scss" scoped>
@use '../../scss/colors' as color;
.desk-progress {
  display: flex;
  background: color.$gris-piedra;
  border-radius: 5px;
  .progress-bar {
    height: 100%;
    background: color.$azul-matla;
    border-radius: 5px;
  }
}
</style>
