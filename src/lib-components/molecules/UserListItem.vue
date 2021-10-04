<script>
export default {
  name:"UserListItem",
  props:{
    user: {
      type: Object,
      required: true
    }
  },
  computed:{
    getName(){
      console.log(this.user.label)
      return this.user.label
    }
  }
}
</script>
<template>
<div class="user-list">
  <span class="user-list--line" />
  <span class="user-list--avatar">
    <UserAvatar :profile="user" />
  </span>
  <span class="user-list--name">
    {{ getName }}
  </span>
</div>
</template>
<style lang="scss" scoped>

@use "../../scss/colors" as color;

$itemWidth: 264px;
$itemHeight: 50px;

.user-list {
  cursor: pointer;
  background: #fff;
  width: $itemWidth;
  height: $itemHeight;
  display: flex;
  align-items: center;
  padding: 0 16px 0 0;
  &--line {
    width: 4px;
    height: 100%;
    margin-right: 16px;
  }
  &--avatar {
    margin-right: 15px;
  }
  &--name {
    font-weight: 700;
    color: color.$gris-tlille;
  }
}
</style>
