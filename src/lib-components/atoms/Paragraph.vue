<script>
export default {
  name: "Paragraph",
  props: {
    align: {
      type: String,
      default: 'inherit',
      validator: val => ['inherit', 'left', 'right', 'justify'].includes(val)
    },
    ellipsis: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    textAlign() {
      return {'text-align': this.align}
    }
  }
}
</script>
<template>
  <p class="paragraph" :class="{'ellipsis': ellipsis}" :style="{...textAlign}">
    <slot />
  </p>
</template>
<style lang="scss" scoped>
.paragraph {
  &.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
