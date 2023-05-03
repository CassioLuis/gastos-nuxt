<template>
  <div>
    <div v-for="totalizer in computedTotalizers" :key="totalizer.id" class="accordion w-full">
      <div class="flex justify-between cursor-pointer p-2 w-full" @click="expand(totalizer)">
        <span name="header">{{ totalizer.category }}</span>
        <span name="header">{{ convertToCurrency(totalizer.totalSpent) }}</span>
      </div>
      <transition name="accordion" @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave"
        @leave="onLeave">
        <div class="body" v-show="totalizer.expanded" v-for="spent in totalizer.spents " :key="spent.id">
          <div class="body-inner">
            <span>{{ spent.description }}</span>
            <span>{{ convertToCurrency(spent.spentValue) }}</span>
          </div>
        </div>
      </transition>
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
      show: false
    };
  },
  methods: {
    convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    ...mapMutations({
      expand: 'summary/expand',
    }),
    toggle() {
      this.show = !this.show;
    },
    onBeforeEnter(el) {
      el.style.height = '0';
    },
    onEnter(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    onBeforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    onLeave(el) {
      el.style.height = '0';
    }
  },
  computed: {
    computedTotalizers() {
      return this.totalizers
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Lato');

.accordion {
  max-width: 400px;
  font-family: Lato;
  margin-bottom: 20px;

  background-color: #ec5366;
  border-radius: 6px;
}

.accordion .header {
  height: 40px;
  line-height: 40px;
  padding: 0 40px 0 8px;
  position: relative;
  color: #fff;
  cursor: pointer;
}

.accordion .header-icon {
  position: absolute;
  top: 5px;
  right: 8px;
  transform: rotate(0deg);
  transition-duration: 0.3s;
}

.accordion .body {
  /*   display: none; */
  overflow: hidden;
  background-color: #fff;
  border: 10px solid #ec5366;
  border-top: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transition: 100ms ease-out;
}

.accordion .body-inner {
  padding: 8px;
  overflow-wrap: break-word;
  /*   white-space: pre-wrap; */
}

.accordion .header-icon.rotate {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}

.accordion.purple {
  background-color: #8c618d;
}

.accordion.purple .body {
  border-color: #8c618d;
}
</style>