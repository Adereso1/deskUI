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
        {{ shortName(tag) }},
      </span>
    </slot>
    <span v-if="tags.length > tagsLimit"> +{{ tags.length - tagsLimit }} </span>
  </div>
</template>
