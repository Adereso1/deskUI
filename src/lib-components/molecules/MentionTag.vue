<script>
import { Mentionable } from 'vue-mention';

export default {
  components: {
    Mentionable,
  },
  name: "MentionTag",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Type here...'
    },
    limit: {
      type: Number,
      default: 20
    },
    currentUser: {
      type: String,
      required: true
    },
    offset: {
      type: String,
      default: "6"
    },
    rows: {
      type: Number,
      default: 4
    },
    placement: {
      type: String,
      default: 'top-start'
    },
    showNoResult: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: 'Loading'
    },
    noResultText: {
      type: String,
      default: 'No result'
    },
    selectedTags: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      tags: []
    }
  },
  mounted() {
    this.checkElements();
  },
  watch: {
    html() {
      this.$nextTick(() => {
        this.syncScroll();
      });
    }
  },
  methods: {
    checkElements() {
      const input = this.$refs.input;
      if (!input) {
        return;
      }
      const background = this.$refs.background;
      if (!background) {
        return;
      }
      let st = background.offsetTop;
      if (st >= input.scrollTop && st <= input.scrollTop + input.clientHeight) {
        return;
      }
      st = Math.max(0, Math.min(st, input.scrollHeight - input.clientHeight));
      input.scrollTop = st;
    },
    syncScroll() {
      this.$nextTick(() => {
        const s = this.$refs.input;
        const d = this.$refs.background;
        d.scrollTop = s.scrollTop;
      });
    },
    loadItems (searchText = null) {
      this.loading = true
      this.list = this.fetchItems(searchText);
      this.loading = false
    },
    fetchItems (searchText = null) {
      if (!searchText) {
        return this.values;
      } else {
        const reg = new RegExp(searchText, 'i')
        return this.values.filter(item => reg.test(item.label));
      }
    },
    highlightText(text = '') {
      let newText = text || '';
      this.tags = [];
      const tags = this.items.map(item => ({
        ...item,
        name: item.name.trim()
      }));
      tags.forEach(tag => {
        const {name} = tag;
        newText = newText.replace(`@${name}`, () => {
          this.tags.push(tag);
          if (name.toLowerCase() === this.currentUser.toLowerCase().trim()) {
            return `<span class="highlight-text current-user">@${name}</span>`;
          }
          return `<span class="highlight-text">@${name}</span>`;
        });
      });
      this.onSelectedTags();
      return newText;
    },
    onSelectedTags() {
      if (this.tags.length) {
        this.selectedTags(this.tags);
      }
    },
    onTextInput(event) {
      this.$emit('input', event.target.value);
    }
  },
  computed: {
    html() {
      return this.highlightText(this.value);
    },
    values() {
      return this.items.map(item => ({
        ...item,
        value: `${item.value.trim()}`
      }));
    },
  }
}
</script>

<template>
  <div class="container-mentionable">
    <Mentionable
      :keys="['@']"
      :items="list"
      :limit="limit"
      insert-space
      :placement="placement"
      :offset="offset"
      @open="loadItems()"
      @search="loadItems($event)"
    >
      <textarea
        ref="input"
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="onTextInput"
        :rows="rows"
        class="input hta-text"
        autocomplete="off"
        :placeholder="placeholder"
        @scroll="syncScroll"
      />
      <template #no-result>
        <div class="no-result" :class="{'hide': !showNoResult}">
          {{ loading ? loadingText : noResultText }}
        </div>
      </template>

      <template class="v-popover-custom" #item-@="{ item }">
        <div class="list">
          <span class="line"></span>
          <span class="avatar">
            <UserAvatar :profile="item" />
          </span>
          <span class="name">
            {{ item.label }}
          </span>
        </div>
      </template>

      <div ref="background" class="hta-background" id="hta-background">
        <span class="hta-highlights hta-text" v-html="html"></span>
      </div>
    </Mentionable>
  </div>
</template>

<style lang="scss">
@use '../../scss/colors' as color;

.container-mentionable {
  width: 100%;
  height: 100%;
}
.tooltip {
  &.popover {
    &.vue-popover-theme {
      &.open {
        opacity: 1;
        font-style: normal;
        box-shadow: 0px 4px 16px rgba(168, 199, 217, 0.4);
        display: block;
        z-index: 2000 !important;
        border: 1px solid color.$gris-ceniza;
        max-height: 302px;
        background: #fff;
        overflow-y: auto;
        position: fixed !important;
        top: 0 !important;
      }
    }
  }
}
.list {
  cursor: pointer;
  background: #fff;
  width: 264px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 0;
}
.mention-selected {
    .list {
      background: color.$blanco-plomo;
    .line {
      background: color.$interactive;
    }
  }
}
.list {
  .line {
    width: 4px;
    height: 100%;
    margin-right: 16px;
  }
  .avatar {
    margin-right: 15px;
  }
  .name {
    font-weight: 700;
    color: color.$gris-tlille;
  }
}
.no-result {
  cursor: default;
  width: 264px !important;
  height: 50px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  color: color.$gris-tlille;
}

.hide {
	display: none;
}

.hta-background {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  padding: 5px;
  margin: 0 !important;
  line-height: 1.428571429 !important;
  box-sizing: border-box;
}
.hta-highlights {
  width: auto !important;
  height: auto !important;
  border-style: none !important;
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
  overflow: hidden !important;
}
.hta-text {
  text-align: left;
  font: inherit;
  margin: 0;
  padding: 0;
}
.input {
  width: 100%;
  min-height: 42px;
  box-sizing: border-box;
  line-height: 1.428571429 !important;
  outline: none;
  padding: 5px;
  display: block !important;
  position: relative !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  background: none transparent !important;
  width: 100% !important;
  height: 100% !important;
  resize: none !important;
  caret-color: #333;
  color: transparent !important;
  z-index: 1;

  &::selection {
    color: #333 !important;
    background: #58a2fc !important;
  }
}
.highlight-text {
  color: color.$gris-tlille;
  background: color.$gris-piedra;
  border-radius: 4px;
  padding: 1px 0;
  margin-top: 10px;
  &.current-user {
    color: color.$interactive;
    background: #81D4F9;
    border-radius: 4px;
    padding: 1px 0;
  }
}

</style>