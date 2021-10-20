<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { DeskUiSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  data() {
    return {
      comment:null,
      bar:{
        height: 30,
        progress: 95,
        relativeWidth: 500
      },
      user:{
        image:'',
        status: 'online',
        assignable: false,
        label: 'username'
      },
      users:[{
        name:'rholo ahumada',
        label:'rholo ahumada',
        value: 'rholo ahumada',
        image:'',
        status:'online',
        cmid: 1
      },{
        name:'rholo ahumada chamorro',
        label:'rholo ahumada chamorro',
        value: 'rholo ahumada chamorro',
        image:'',
        status:'online',
        cmid:2
      }],
      current:{name:'rhockr'},
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
  },
  methods:{
    team(cms){
      console.log(cms)
    }
  }
  // components: {
  //  DeskUiSample,
  // }
});
</script>

<template>
  <div id="app">
      <div style="width:90vw">
      <ProgressBar :progress="bar.progress" :height="bar.height" />
      </div>
      <MentionTag :selected-tags="team" v-model="comment" :items="users" :current-user="current.name" /> 
      <Avatar :rounded="50" :size="50" />
      <UserAvatar :user="user" show-tippy />
      <UserListItem :user="user"/>
      <TagsTeam :tags="getTags" />
      <Tabs :tabs="tabs">
        <div v-for="tab in tabs">
          <slot v-if="tab.active">{{ tab.name }}</slot>
        </div>
      </tabs>
  </div>
</template>
