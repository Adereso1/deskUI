<script>
import { Mentionable } from 'vue-mention'

export default {
  components: {
    Mentionable,
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Type here...'
    }
  },
  data () {
    return {
      text: '',
      list: [],
      loading: false,
    }
  },
  methods: {
    loadIssues (searchText = null) {
      this.loading = true
      this.list = this.fetchIssues(searchText)
      this.loading = false
    },
    fetchIssues (searchText = null) {
      if (!searchText) {
        return this.items;
      } else {
        const reg = new RegExp(searchText, 'i')
        return this.items.filter(item => reg.test(item.label));
      }
    }
  },
}
</script>

<template>
  <div
    class="demo"
  >
    <Mentionable
      :keys="['@']"
      :items="list"
      :limit="20"
      insert-space
      offset="1"
      @open="loadIssues()"
      @search="loadIssues($event)"
    >
      <textarea
        v-model="text"
        rows="6"
        class="input"
        :placeholder="placeholder"
      />

      <template #no-result>
        <div class="no-result">
          {{ loading ? 'Loading...' : 'No result' }}
        </div>
      </template>

      <template #item-@="{ item }">
        <div class="list">
          <span class="avatar">
            <UserAvatar :profile="item" />
          </span>
          <span class="name">
            {{ item.value }}
          </span>
        </div>
      </template>
    </Mentionable>

    <div class="preview">{{ text }}</div>
  </div>
</template>

<style>
.demo {
  margin: 24px 200px;
}

.input {
  width: 100%;
  border: #ccc 1px solid;
  border-radius: 6px;
  resize: vertical;
  min-height: 42px;
  padding: 12px;
  box-sizing: border-box;
  line-height: 1.2em;
  font-size: inherit;
}

.tooltip.popover.vue-popover-theme.open {
  left: 264px !important;
  box-shadow: 0px 4px 16px rgba(168, 199, 217, 0.4);
  z-index: 1000;
}

.list, .no-result {
  cursor: pointer;
  background: #fff;
  width: 264px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.mention-selected .list {
  background: #F2F7F9;
  border-left: 4px solid #026997;
}

.mention {
  border: 1px solid red;
}

.list .name {
  font-weight: 700;
  color: #455A64;
}

.no-result {
  cursor: default;
}

.dim {
  color: #455A64;
  font-weight: 400;
}

.preview {
  font-family: monospace;
  white-space: pre-wrap;
  margin-top: 12px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 6px;
}
</style>