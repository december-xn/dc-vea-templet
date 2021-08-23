<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  appearance: none !important;
  margin: 0 !important;
}
/* 火狐 */
input {
  -moz-appearance: textfield !important;
}

/*滚动条样式 */
/*修改滚动条样式*/
section::-webkit-scrollbar,
div::-webkit-scrollbar,
ul::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}
section::-webkit-scrollbar-track,
div::-webkit-scrollbar-track,
ul::-webkit-scrollbar-track {
  background: transparent;
}

section::-webkit-scrollbar-thumb,
div::-webkit-scrollbar-thumb,
ul::-webkit-scrollbar-thumb {
  background-color: #333541;
  border-radius: 8px;
}

section::-webkit-scrollbar-corner,
div::-webkit-scrollbar-corner,
ul::-webkit-scrollbar-corner {
  width: 6px;
  height: 6px;
}

.el-dialog {
  margin-top: 5vh !important;
  width: 80vw;
}

/* 拖拽底色 */
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #c8ebfb !important;
}

/* 下拉刷新最后一页 */
.no-more {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 16px;
  color: #5e6d82;
  line-height: 1.5em;
  text-align: center;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
</style>
