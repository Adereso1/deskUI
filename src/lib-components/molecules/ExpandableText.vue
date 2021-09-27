<script>
export default {
  name: 'ExpandableText',
  props: {
    paragraph: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: 90
    },
    maxHeight: {
      type: Number,
      default: null
    },
    labels: {
      type: Object,
      default: {
        less: 'See less',
        more: 'See more'
      },
      validator: obj =>
        Object.prototype.hasOwnProperty.call(obj, 'more') &&
        Object.prototype.hasOwnProperty.call(obj, 'less')
    }
  },
  data () {
    return {
      showAll: false
    }
  },
  computed: {
    lessOrMore() {
      if (this.paragraph.length > this.maxLength && !this.showAll) {
        return `${this.paragraph.substring(0, this.maxLength)}...`;
      } else {
        return this.paragraph;
      }
    },
    scrolling() {
      if (this.maxHeight) {
        return {
          maxHeight: `${this.maxHeight}px`,
          overflow: 'auto'
        };
      }
      return {};
    },
    toggleLabel() {
      return this.showAll ? this.labels.less : this.labels.more;
    }
  },
  methods: {
    moreOrLess() {
      this.showAll = !this.showAll;
    }
  }
};
</script>
<template>
  <div class="ads-expandable-text" :style="scrolling">
    <p>{{ lessOrMore }}
      <button
        v-if="paragraph.length > maxLength"
        @click="moreOrLess"
        class="ads-button ads-button--link">{{ toggleLabel }}
      </button>
    </p>
  </div>
</template>
<style lang="scss" scoped>
@use '../../scss/colors' as color;
@use '../../scss/variables' as variable;

.ads-expandable-text {
  white-space: normal;
  p {
    margin: 0;
    font-size: 1rem;
  }
}
.ads-button {
  max-height: 36px;
  border: 0;
  outline: none;
  &--link{
    background-color: transparent;
    color: color.$azul-matla;
    font-weight: 700;
    font-family: variable.$font;
    font-size: inherit;
    &:hover {
      color: color.$azul-matla;
    }
  }
}
</style>