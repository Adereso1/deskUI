<script>
export default {
  name: "Avatar",
  props: {
    size: {
      type: Number,
      default: 22
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: 0 
    }
  },
  computed: {
    getRounded(){
      return {
        borderRadius: `${this.rounded}%`
      }
    },
    getSize() {
      return `${this.size}px`;
    },
    image() {
      return this.src
        ? this.src
        : 'https://assets.postcenter.io/img/generic_avatar.png';
    }
  },
  methods: {
    imageError(event) {
      event.target.src = 'https://assets.postcenter.io/img/generic_avatar.png';
    }
  }
}
</script>
<template>
  <img :style="{...getRounded}"
    :src="image" :alt="alt" :width="getSize" :height="getSize" @error="imageError" />
</template>

