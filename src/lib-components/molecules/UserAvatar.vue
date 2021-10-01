<script>
import Avatar from '../atoms/Avatar.vue';
import { tippy } from "vue-tippy";

export default {
  name: "UserAvatar",
  components: {
    Avatar,
    tippy
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        avatar:'',
        status:'offline'
      })
    },
    showTippy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tooltipName: Date.now(),
      statuses: [
        {
          name: 'offline',
          color: '#C4C4C4'
        },
        {
          name: 'online',
          color: '#8BC34A'
        },
        {
          name: 'idle',
          color: '#FFC107'
        }
      ]
    };
  },
  computed: {
    statusColor() {
      const {status = 'offline'} = this.user || {};
      const statusColor = this.statuses.find(({name}) => name === status);
      return {
        backgroundColor: statusColor.color
      };
    },
    getStatus(){
      const {status} = this.user;
      return this.statuses.find(({name}) => name === status)
    },
  },
  methods: {
    tooltip() {
      return `<div class="d-flex">
              <span class="fa fa-circle"
                style="margin-right:10px;color:${status.color}"></span>
              <div>
                <strong>${this.getStatus}</strong>
                <br/>
                <small
                  style="color:'#CDCDCD'">
                  ${this.getStatus}
                </small>
              </div></div>`;
    }
  }
}
</script>
<template>
  <div class="ads-avatar--user-status" :name="tooltipName">
    <tippy
      :to="tooltipName"
      arrow
      :content="tooltip()"
      v-if="showTippy" /> 
    <Avatar
      :size="44"
      :rounded="50"
      :src="image"
      :alt="status" />
    <span class="status" :style="statusColor" />
  </div>
</template>
<style lang="scss" scoped>

@use "sass:math";

$avatarSize: 44px;

.ads-avatar {
  &--user-status {
    position: relative;
    width: $avatarSize;
    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: math.div($avatarSize, 3);
      height: math.div($avatarSize, 3);
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
