<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { DeskUiSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  data() {
    return {
      tabs: new Array(4).fill(1).map((tab, index) =>({
        name: `Tab ${index + 1}`,
        active: index === 0
      }))
    }
  },
  computed:{
    getTags() {
      return this.tabs.map(tab => tab.name)
    }
  }
  // components: {
  //  DeskUiSample,
  // }
});
</script>

<template>
  <div id="app">
    <desk-ui-sample />
      <Avatar :rounded="50" :size="50" />
      <TagsTeam :tags="getTags" />
      <Tabs :tabs="tabs">
        <div v-for="tab in tabs">
          <slot v-if="tab.active">{{ tab.name }}</slot>
        </div>
      </tabs>
  </div>
</template>
