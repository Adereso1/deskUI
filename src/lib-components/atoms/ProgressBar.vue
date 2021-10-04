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
    width: {
      type: Number,
      default: 100
    },
    pixelWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getHeight() {
      return {
        height: `${this.height}px`
      };
    },
    getWidth() {
      return {
        width: this.pixelWidth ? `${this.width}px` : `${this.width}%`
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
  <div class="ads-progress" :style="{...getHeight, ...getWidth}">
    <div class="ads-progress--bar" role="progressbar" :style="getProgress" />
  </div>
</template>
<style lang="scss" scoped>
@use '../../scss/colors' as color;
.ads-progress {
  display: flex;
  background: color.$gris-piedra;
  border-radius: 5px;
  &--bar {
    height: 100%;
    background: color.$azul-matla;
    border-radius: 5px;
  }
}
</style>
