<template>
  <svg
    class="svg-icon"
    :style="{
      width: props.width + 'px',
      height: props.height + 'px',
      color: props.color
    }"
  >
    <use :xlink:href="`#icon-${props.name}`" :fill="props.color" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
      default: 'email'
    },
    width: {
      type: Number,
      default: 32
    },
    height: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  setup(props) {
    return {
      props
    }
  }
})
</script>
