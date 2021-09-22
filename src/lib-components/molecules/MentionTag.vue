<script>
import { Mentionable } from 'vue-mention';

export default {
  components: {
    Mentionable,
  },
  name: "MentionTag",
  props: {
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
      default: 3
    },
    keys: {
      type: Array,
      default: () => ['@']
    },
    insertSpace: {
      type: Boolean,
      default: true
    },
    rows: {
      type: Number,
      default: 4
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
    loadItems (searchText = null) {
      this.loading = true
      this.list = this.fetchItems(searchText);
      this.loading = false
    },
    fetchItems (searchText = null) {
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
  <div class="container-mentionable">
    <Mentionable
      :keys="keys"
      :items="list"
      :limit="limit"
      :insert-space="insertSpace"
      offset="20"
      @open="loadItems()"
      @search="loadItems($event)"
    >
      <textarea
        v-model="text"
        :rows="rows"
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
          <span class="line"></span>
          <span class="avatar">
            <UserAvatar :profile="item" />
          </span>
          <span class="name">
            {{ item.value }}
          </span>
        </div>
      </template>
    </Mentionable>
  </div>
</template>

<style>
.container-mentionable {
  width: 100%;
  height: 100%;
}
.input {
  width: 100%;
  resize: vertical;
  min-height: 42px;
  box-sizing: border-box;
  line-height: 1.2em;
  font-size: inherit;
  outline: none;
  padding: 5px;
}

.tooltip.popover.vue-popover-theme.open {
  box-shadow: 0px 4px 16px rgba(168, 199, 217, 0.4);
  display: block;
  z-index: 2000 !important;
  border: 1px solid #DFE5E8;
}

.list, .no-result {
  cursor: pointer;
  background: #fff;
  width: 264px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px 0 0;
}

.mention-selected .list {
  background: #F2F7F9;
}

.list .line {
  width: 4px;
  height: 100%;
  margin-right: 16px;
}

.mention-selected .list .line {
  background: #026997;
}

.list .avatar {
  margin-right: 15px;
}

.list .name {
  font-weight: 700;
  color: #455A64;
}

.no-result {
  cursor: default;
}
</style>