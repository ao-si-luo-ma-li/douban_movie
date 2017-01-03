<template>
  <transition name="load">
    <svg width="40px" height="40px" viewBox="0 0 40 40" class="spinner" :class="{ myshow : show }" v-show="show">
      <circle cx="20" cy="20" r="17" class="path"></circle>
    </svg>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  // 组建中需要通信
  props: [
    // 1、当父组件向loading传值为true时，loading表示显示状态，动画运行
    // 2、当父组件加载完毕，show的值就变成flase，表示loading隐藏，并且动画停止
    'show'
  ],
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$offset: 125px;
$duration: 1.4s;
.loading{

}
.spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 99;
  transition: opacity 0.3s ease;
  margin-left: -20px;
  animation: rotater $duration linear infinite;
  animation-play-state: paused; // 动画状态为停止
  .path {
      stroke-width: 3px;
      stroke: #0DBC8E;
      fill: none;
      stroke-dasharray: $offset;
      animation: dash $duration ease-in-out infinite;
  }
  &.myshow {
    animation-play-state: running; // 动画状态为运行
  }
  &.load-enter,&.load-leave-active {
    opacity: 0;
  }
  &.load-enter-active {
    opacity: 1;
  }
}

@keyframes rotater {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: ($offset/2) transform rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset transform rotate(3600deg);
  }
}

</style>
