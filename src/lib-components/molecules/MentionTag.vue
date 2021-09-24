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
      default: 3
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
    noResult: {
      type: Boolean,
      default: true
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
  methods: {
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
    }
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
      />

      <template #no-result>
        <div class="no-result" :class="{'hide': !noResult}">
          {{ loading ? loadingText : noResultText }}
        </div>
      </template>

      <template #item-@="{ item }">
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
      
      <div ref="background" class="hta-background">
        <span class="hta-highlights hta-text" v-html="html"></span>
      </div>
    </Mentionable>
  </div>
</template>

<style lang="scss">

.container-mentionable {
	width: 100%;
	height: 100%;
}
.tooltip {
	&.popover {
		&.vue-popover-theme {
			&.open {
				box-shadow: 0px 4px 16px rgba(168, 199, 217, 0.4);
				display: block;
				z-index: 2000 !important;
				border: 1px solid #DFE5E8;
				max-height: 304px;
				overflow-y: auto;
				position: fixed !important;
				top: 0 !important;
			}
		}
	}
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
.mention-selected {
	.list {
		background: #F2F7F9;
		.line {
			background: #026997;
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
		color: #455A64;
	}
}
.no-result {
	cursor: default;
	padding-left: 16px;
	color: #455A64;
}
.hide {
	display: none;
}
.hta-background {
	position: absolute !important;
	top: 0 !important;
	left: 0 !important;
	overflow-x: hidden !important;
	overflow-y: auto !important;
	padding: 5px;
	margin: 0 !important;
	line-height: 1.428571429 !important;
	box-sizing: border-box;
	z-index: 1;
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
	&:hover {
		z-index: 2;
		color: transparent !important;
		background: #58a2fc;
		&::selection {
			color: #333 !important;
			background: #58a2fc;
		}
	}
	&::selection {
		color: transparent !important;
		background: #58a2fc;
	}
}
.highlight-text {
	color: #455A64;
	background: #ECEFF1;
	border-radius: 4px;
	padding: 1px 0;
	margin-top: 10px;
	&.current-user {
		color: #026997;
		background: #81D4F9;
		border-radius: 4px;
		padding: 1px 0;
	}
}

</style>