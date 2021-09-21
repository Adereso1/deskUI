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
<style>

.ads-avatar--user-status {
  position: relative;
  width: 44px;
}
.ads-avatar--user-status .status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
}
.ads-avatar--group {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-bottom: 0;
  margin-left: 7px;
  padding: 0;
}
.ads-avatar--group li {
  margin-left: -7px;
  border: 2px solid #62d2be;
  border-radius: 50%;
}
.ads-avatar--group li button {
  border: none;
  padding: 0;
  outline: none;
  background: transparent;
}
.ad-avatar {
  position: relative;
  display: inline-block;
}
.ad-avatar--star {
  position: absolute;
  right: 15%;
  bottom: 30%;
  font-size: 14px;
  color: white;
  background: gold;
  border-radius: 50%;
  padding: 3px;
}
.ad-avatar--border {
  border: 2px solid;
}
.ad-avatar__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
}
.ad-avatar__avatar.ad-avatar__with-channel {
  overflow: visible;
}
.ad-avatar__avatar.ad-avatar--size-small {
  height: 36px;
  width: 36px;
}
.ad-avatar__avatar.ad-avatar--size-medium {
  height: 48px;
  width: 48px;
}
.ad-avatar__avatar.ad-avatar--size-big {
  height: 120px;
  width: 120px;
}
.ad-avatar__avatar .ad-avatar--chanel {
  position: absolute;
  bottom: 0;
  left: 65%;
  padding: 3px;
  background: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  border: 1px solid;
}
.ad-avatar__avatar .ad-avatar--image {
  width: 100%;
}
.ad-avatar__avatar .ad-email-avatar {
  width: 100%;
  height: 100%;
}
.ad-avatar__klout-score {
  position: absolute;
  background-color: #ec4848;
  color: white;
  font-size: 9px;
  text-align: center;
  border: solid 2px;
  position: absolute;
  width: 22px;
  line-height: 18px;
  border-radius: 50%;
  right: -9px;
  bottom: -6px;
}
.ad-avatar__sn {
  position: absolute;
  color: #fff;
  background: #03a9f4;
  margin-left: -17px;
  border-radius: 50%;
  padding-top: 4px;
  top: 18px;
  width: 25px;
  height: 25px;
  text-align: center;
  border: 2px solid #fff;
  vertical-align: middle;
}
.ad-avatar__sn_smaller {
  font-size: 80%;
  padding-top: 5px;
}
.ad-avatar__influencer {
  position: absolute;
  color: #039be5;
  font-size: 23px;
  right: -8px;
  top: -4px;
  text-shadow: -2px 0 0 white;
}
.ad-avatar_small-msg .ad-avatar__avatar {
  width: 25px;
  height: 25px;
  border-radius: 4px;
}
.ad-avatar_small-msg .ad-avatar__klout-score {
  right: initial;
  right: -13px;
	bottom: -15px;
}
.ad-avatar_small-msg .ad-avatar__influencer {
  font-size: 18px;
  right: -10px;
  top: -8px;
}
.ad-avatar_big .ad-avatar__avatar {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
  margin-bottom: 10px;
}
.ad-avatar_big .ad-avatar__klout-score {
  font-size: 14px;
  width: 28px;
  height: 28px;
  line-height: 24px;
  right: -5px;
  bottom: 3px;
}
.ad-avatar_big .ad-avatar__influencer {
  font-size: 30px;
  right: -4px;
  top: -4px;
  text-shadow: -4px 0 0 #eceff1;
}
.ad-avatar_admin .ad-avatar__avatar {
  border-radius: 50%;
  max-width: 45px;
  max-height: 45px;
  border: solid 1px #cfd8dc;
}
.ad-avatar_selector .ad-avatar__avatar {
  vertical-align: middle;
  width: 48px;
  height: 48px;
  border: solid 1px #b0bec5;
  border-radius: 50%;
}
.ad-avatar_establishment-user .ad-avatar__avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.ad-avatar_selected-reply-account {
  display: block;
}
.ad-avatar_selected-reply-account .ad-avatar {
  display: block;
}
.ad-avatar_selected-reply-account .ad-avatar__avatar {
  display: block;
  height: 1em;
  width: 1em;
  border-radius: 50%;
}
.ad-avatar_ad-reply-account-result .ad-avatar__avatar {
  background: #03a9f4;
  border-radius: 4px;
  width: 23px;
  height: 23px;
  float: left;
}
.ad-avatar_chat-logo-account-option .ad-avatar__avatar {
  width: 62px;
  height: 62px;
}

</style>
