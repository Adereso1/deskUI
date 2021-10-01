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
      })),
      longText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      labels: {
        more: 'Ver más contenido',
        less: 'Ver menos'
      }
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
      <ExpandableText :text="longText" :max-length="100" :labels="{...labels}"/>
  </div>
</template>
