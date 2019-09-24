<template>
  <div class="cont_spinner">
    <div class="lds-hourglass"></div>
    <h6>Buscando...</h6>
  </div>
</template>
<script>
export default {
  name: "Spinner"
};
</script>
<style lang="scss" scoped>
.cont_spinner{
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 6px;
  box-sizing: border-box;
  border: 26px solid rgb(26, 26, 26);
  border-color:  rgb(26, 26, 26) transparent  rgb(26, 26, 26) transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>