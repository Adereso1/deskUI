<script>
import SimpleAvatar from '../molecules/SimpleAvatar';
import { tippy } from "vue-tippy";

export default {
  name: "UserAvatar",
  components: {
    SimpleAvatar,
    tippy
  },
  props: {
    profile: {
      type: Object,
      required: true,
      default: {
        cmid: null,
        avatar_url: null,
        online_status: null
      }
    },
    showTippy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    status() {
      const {online_status = 'offline'} = this.profile || {};
      const statusColor = this.statuses.find(
        status => status.name === online_status
      );
      return {
        backgroundColor: statusColor.color
      };
    }
  },
  methods: {
    tooltip() {
      const {online_status = 'offline', is_assignable = false} =
        this.profile || {};
      const status = this.statuses.find(
        status => status.name === online_status
      );
      const isAssignable = is_assignable ? 1 : 2;
      const userStatus =
        online_status === 'online' ? 0 : online_status === 'idle' ? 1 : 2;
      return `<div class="d-flex">
              <span class="fa fa-circle"
                style="margin-right:10px;color:${status.color}"></span>
              <div>
                <strong>${this.$tc('statuses', userStatus)}</strong>
                <br/>
                <small
                  style="color:'#CDCDCD'">
                  ${this.$tc('assignable', isAssignable)}
                </small>
              </div></div>`;
    }
  }
}
</script>
<template>
  <div class="ads-avatar--user-status" :name="profile.cmid">
    <tippy
      :to="profile.cmid"
      arrow
      :content="tooltip()"
      v-if="showTippy" /> 
    <SimpleAvatar
      :size="'40px'"
      :src="profile.avatar_url"
      :alt="profile.online_status" />
    <span class="status" :style="status" />
  </div>
</template>