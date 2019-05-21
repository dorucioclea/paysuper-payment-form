<template>
<div :class="container">
  <input
    v-bind="{ required, disabled }"
    :class="inputClasses"
    :value="value"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
    @input="$emit('input', $event.target.value)"
  >
  <label
    :class="labelClass"
    :title="label"
  >
    {{ label }}
  </label>
  <span
    v-if="isVisibleError"
    :class="$style.error"
    :title="errorText"
  >
    {{ errorText }}
  </span>
</div>
</template>

<script>
import { includes } from 'lodash-es';

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    errorText: {
      default: '',
      type: String,
    },
    hasError: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    type: {
      default: 'text',
      type: String,
      validator(val) {
        return includes(['text'], val);
      },
    },
    value: {
      default: '',
      type: [String, Number],
    },
  },
  computed: {
    container() {
      return this.$style.container;
    },
    input() {
      return this.$style.input;
    },
    labelClass() {
      return this.$style.label;
    },
    isEmpty() {
      return !this.value && this.value !== 0;
    },
    /**
     * Error is visible if it exists and error text isn't empty
     * @return {boolean}
     */
    isVisibleError() {
      return !!(this.hasError && this.errorText);
    },
    /**
     * Classes for input
     * @return {Array<string>}
     */
    inputClasses() {
      return [
        this.input,
        `_${this.type}`,
        this.isEmpty ? '_empty' : '',
        this.isVisibleError ? '_error' : '',
        this.disabled ? '_disabled' : '',
        this.required ? '_required' : '',
      ];
    },
  },
  mounted() {
    const selectors = {
      container: this.container,
      input: this.input,
      label: this.labelClass,
    };
    const states = ['default', 'checked'];

    this.$addCssRules('textField', selectors, states);
  },
};
</script>

<style module lang="scss">
@import url('https://fonts.googleapis.com/css?family=Comfortaa:300,400|Quicksand&subset=cyrillic,cyrillic-ext');

$common-font-family: 'Quicksand', 'Comfortaa', sans-serif;

$error-box-color: #fc7e57;
$error-font-color: #fff;
$error-font-size: 10px;
$error-font-weight: 600;
$error-height: 17px;

$focus-border-color: #06eaa7;

$input-border-color: rgba(#fff, 0.2);
$input-box-color: transparent;
$input-font-color: #fff;
$input-font-weight: 300;
$input-transition: border-color 0.2s ease-out;

$label-color: rgba(#fff, 0.5);
$label-transition: transform 0.2s ease-out, color 0.2s linear;

$main-font-size: 15px;
$main-height: 24px;
$main-additional-height: 18px;

.container {
  display: inline-block;
  padding: $main-additional-height 0;
  position: relative;
  width: 100%;
  font-family: $common-font-family;
  font-style: normal;
  font-weight: $input-font-weight;
  text-align: left;
  vertical-align: top;
}

.input {
  background-color: $input-box-color;
  border-width: 0;
  border-bottom-width: 1px;
  border-color: $input-border-color;
  box-sizing: border-box;
  color: $input-font-color;
  display: block;
  font-family: $common-font-family;
  font-weight: $input-font-weight;
  font-size: $main-font-size;
  height: $main-height;
  line-height: $main-height;
  outline: none;
  padding: 0;
  transition: $input-transition;
  width: 100%;

  &:hover {
    border-color: scale-color($input-border-color, $alpha: 37.5%);
  }

  &:focus {
    border-color: $focus-border-color;
  }

  &:focus ~ .label,
  &:not(:focus):not(._empty) ~ .label {
    transform: translateY(-$main-additional-height) scale(0.75, 0.75);
  }

  &:focus ~ .label {
    pointer-events: auto;
    color: scale-color($label-color, $alpha: -40%);
  }

  &:not(:focus):not(._empty) ~ .label {
    color: scale-color($label-color, $alpha: -40%);
  }

  &._error {
    border-color: $error-box-color;
  }

  &:disabled {
    color: scale-color($label-color, $alpha: -50%);
    border-color: scale-color($input-border-color, $alpha: -50%);
    pointer-events: none;

    & ~ .label {
      color: scale-color($label-color, $alpha: -50%);
    }
  }
}

.label {
  color: $label-color;
  line-height: $main-height;
  margin: 0;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: $main-font-size;
  left: 0;
  pointer-events: none;
  top: $main-additional-height;
  transform-origin: left;
  transition: $label-transition;
  width: 100%;
}

.error {
  background-color: $error-box-color;
  top: $main-height + $main-additional-height + 2px;
  color: $error-font-color;
  display: block;
  font-size: $error-font-size;
  font-weight: $error-font-weight;
  line-height: $error-height;
  position: absolute;
  padding: 0 5px;
  border-radius: 0 3px 3px 3px;
}
</style>