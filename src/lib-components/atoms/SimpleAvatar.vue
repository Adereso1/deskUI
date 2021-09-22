<script>
export default {
  name: "SimpleAvatar",
  props: {
    size: {
      type: [Number, String],
      default: 22
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    getSize() {
      return this.size ? this.size : '22px';
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
  <img class="ads-circle"
    :src="image" :alt="alt" :width="getSize" :height="getSize" @error="imageError" />
</template>