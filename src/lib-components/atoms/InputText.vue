<script>
export default {
  name: "InputText",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: null,
    },
    inputError: {
      type: Boolean,
      default: false,
    },
    searchHandler: {
      type: Function,
      default: () => {},
    },
    errorMessage: {
      type: String,
      default: "an error occurred",
    },
  },
  data() {
    return {
      type: this.$attrs.type,
      toggleClass: "fa fa-eye",
      inputPassword: this.$attrs.type === "password",
    };
  },
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit("input", event.target.value);
        },
      });
    },
    hasData() {
      return !this.value ? "" : "ads-input--active";
    },
    hasError() {
      return this.inputError ? "ads-input--error" : "";
    },
    isDisabled() {
      return this.$attrs.disabled ? "ads-input--disabled" : "";
    },
  },
  methods: {
    togglePassword() {
      this.type = this.type === "password" ? "text" : "password";
      this.toggleClass =
        this.toggleClass === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye";
    },
  },
};
</script>
<template>
  <label class="ads-input" :class="[hasData, hasError, isDisabled]">
    <input v-bind="$attrs" v-on="inputListeners" :type="type" :value="value" />
    <span class="icon-input" v-if="inputPassword">
      <span @click="togglePassword()" :class="toggleClass" />
    </span>
    <span class="icon-input" v-if="type === 'search'">
      <span class="fa fa-search" @click="searchHandler" />
    </span>
    <span class="ads-input__label">{{ label }}</span>
    <p class="error-label" v-if="inputError">
      <span class="fa fa-exclamation-triangle pr-1" />
      {{ errorMessage }}
    </p>
  </label>
</template>
<style lang="scss" scoped>
@use '../../scss/colors' as color;

$input-height: 36px;

%active {
  border: 1px solid color.$azul-matla;
  color: color.$azul-matla;
  box-shadow: 0px 4px 8px rgba(69, 90, 100, 0.1);
}
%error {
  border: 1px solid color.$rojo-grana;
}
%focus-span {
  top: -10px !important;
  font-weight: 700 !important;
  &:after {
    content: '';
    display: block;
    margin: -8px -3px;
    top: 4px;
    border-top: 1px solid #ffffff;
    padding: 0 0px;
  }
}
%input-default {
  border: 1px solid color.$gris-grafito;
  color: color.$gris-grafito;
  border-radius: 4px;
  background-color: white;
  height: $input-height;
  width: 100%;
  outline: none;
}
.ads-textarea {
  @extend %input-default;
  padding: 5px;
  min-height: 150px;
}
.ads-select {
  @extend %input-default;
}
.ads-input {
  position: relative;
  margin: 0;
  transition: 0.2s ease all;
  display: block;
  &--number{
    @extend %input-default;
  }
  &--active {
    > input {
      @extend %active;
    }
    .ads-input__label {
      color: color.$gris-tlille !important;
      @extend %focus-span;
    }
  }
  &--disabled {
    > input {
      background-color: color.$blanco-plomo !important;
      &:hover {
        border: 1px solid color.$gris-grafito;
        box-shadow: none;
      }
    }
  }
  &--error {
    > input {
      border: 1px solid color.$rojo-grana !important;
      box-shadow: none;
      &:hover {
        color: color.$gris-grafito;
        box-shadow: none;
      }
      ~ .ads-input__label {
        color: color.$rojo-grana !important;
        @extend %focus-span;
      }
    }
    .error-label {
      color: color.$rojo-grana;
      font-weight: 500;
    }
  }
  &__label {
    position: absolute;
    top: 6px;
    left: 10px;
    transition: 0.2s ease all;
    color: color.$gris-grafito;
    font-weight: 400;
    pointer-events: none;
  }

  > input {
    @extend %input-default;
    padding: 5px 5px 5px 10px !important;
    height: $input-height;
    &:focus {
      border: 1px solid color.$verde-maya;
      color: color.$gris-grafito;
      ~ .ads-input__label {
        color: color.$gris-tlille;
        @extend %focus-span;
      }
    }
    &:hover {
      @extend %active;
    }
  }

  .icon-input {
    span {
      position: absolute;
      top: 9px;
      right: 15px;
      font-size: 1.8rem; //
      color: color.$azul-matla;
    }
  }
}

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>