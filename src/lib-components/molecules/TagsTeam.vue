<script>
export default {
  name: 'TagsTeam',
  props: {
    isList: { 
      type: Boolean 
    },
    tags: {
      type: Array,
      required: true,
    },
    tagsLimit: {
      type: Number,
      default: 3
    },
    textLimit: {
      type: Number,
      default: 10
    }
  },
  methods: {
    truncateText(text) {
      if (text.length > this.textLimit) {
        const textTemp = `${text.substring(0, this.textLimit)}...`;
        return this.isList ? `${textTemp},` : textTemp;
      } else {
        return this.isList ? `${text},` : text;
      }
    }
  },
};
</script>
<template>
  <div class="ads-tags-team">
    <slot v-for="(tag, index) in tags">
      <span v-if="tags.length > 0 && index < tagsLimit" :key="index">
        {{ truncateText(tag) }},
      </span>
    </slot>
    <span v-if="tags.length > tagsLimit"> +{{ tags.length - tagsLimit }} </span>
  </div>
</template>
<style lang="scss" scoped>
@use '../../scss/colors' as color;
@use '../../scss/variables' as variable;
.ads-tags-team{
  display: flex;
  min-width: 130px;
  span {
    background: color.$blanco-arcilla;
    color: color.$interactive !important;
    font-family: variable.$font;
    border-radius: 4px;
    font-size: 1.2rem;
    padding: 2px 4px;
    &:not(:first-child) {
      margin-left: 5px;
    }
  }
}

</style>
