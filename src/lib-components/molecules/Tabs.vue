<script>
export default {
  name: "Tabs",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Array,
      required: true,
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
    <ul class="tabs--list">
      <li
        v-for="(tab, index) in tabs"
        class="tab"
        :class="{ 'tab__active': tab.active }"
        :key="tab.index">
        <button
          type="button"
          @click="selectTab(index)"
          :disabled="disabled">
          {{ tab.name }}
        </button>
      </li>
    </ul>

    <div class="tabs--details scrollable scrollable-y">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '../../scss/colors' as color;
@use '../../scss/variables';
.tabs {
  &--list {
    list-style: none;
    padding: 0;
    display:flex;
    .tab {
      user-select: none;
      outline: none;
      button {
        text-transform: uppercase;
        font: variables.$font;
        border: none;
        padding: 10px 25px;
        background: none;
        cursor:pointer;
      }
      &__active {
        border-bottom: 4px solid color.$verde-maya;
        button {
          font-weight: 700;
        }
      }
    }
  }
  &--details {
    max-height: 100%;
  }
}
</style>
