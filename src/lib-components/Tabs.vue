<script>
// import  from '.'
export default {
  name: "Tabs",
  props: {
    disabled: { type: Boolean, default: false },
    paddingTabs: {
      type: Number,
      default: null,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    padding() {
      return this.paddingTabs ? `px-${this.paddingTabs}` : "";
    },
  },
  methods: {
    selectTab(index) {
      return this.tabs.map((tab, tabIndex) => {
        tab.active = tabIndex === index;
        return tab;
      });
    },
  }
}
</script>
<template>
  <div class="tabs">
    <ul class="tabs--list list-unstyled d-flex" :class="[padding]">
      <li
        v-for="(tab, index) in tabs"
        class="tab"
        :class="{ tab__active: tab.active }"
        :key="tab.index"
      >
        <button
          type="button"
          @click="selectTab(index)"
          :disabled="disabled"
          class="btn btn-link"
        >
          {{ tab.name }}
        </button>
      </li>
    </ul>

    <div class="tabs--details scrollable scrollable-y">
      <slot></slot>
    </div>
  </div>
</template>