<template>
  <div>
    <div v-for="totalizer in computedTotalizers" :key="totalizer.id"
      class="flex flex-col justify-between px-1 border rounded border-gray-600 mb-2">
      <div @click="expand(totalizer)" class="flex justify-between border-gray-600 p-2 cursor-pointer">
        <span>{{ totalizer.category }}</span>
        <span>{{ convertToCurrency(totalizer.totalSpent) }}</span>
      </div>
      <TransitionGroup tag="ul" @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
        <li v-if="totalizer.expanded" v-for="spent in totalizer.spents" :key="spent.id"
          class="overflow-hidden flex justify-between gap-2 text-xs text-gray-400 border-gray-600">
          <span class="flex justify-between p-4 items-center w-full">
            <span>{{ spent.description }}</span>
            <span>{{ convertToCurrency(spent.spentValue) }}</span>
          </span>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'TotalizerCard',
  props: {
    totalizers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      height: 0
    }
  },
  methods: {
    getHeight(el) {
      return el.scrollHeight
    },
    convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    ...mapMutations({
      expand: 'summary/expand',
    }),
    onBeforeEnter(el) {
      const { style } = el;
      // const { transitionDuration, height } = style;
      const styles = {
        transitionDuration: '200ms',
        height: '0',
        opacity: '0'
      };
      Object.assign(style, styles);
    },
    onEnter(el) {
      el.style.height = el.scrollHeight + 'px';
      setTimeout(() => {
        el.style.opacity = '1'
      }, 100)
    },
    onBeforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    onLeave(el) {
      const { style } = el;
      const styles = {
        transitionDuration: '200ms',
        opacity: '0',
        height: '0'
      };
      Object.assign(style, styles);
    }
  },
  computed: {
    computedTotalizers() {
      return this.totalizers
    }
  }
}
</script>