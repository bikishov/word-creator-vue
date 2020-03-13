<template>
  <div class="loader">
    <p>
      Ищем слово
    </p>
    <img src="@/assets/search.gif" alt="loading" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.loader {
  border: 5px solid $red-light;
  margin: 0 auto;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background-color: $green-light;
  color: $red-light;
  font-weight: 900;
  border-radius: 5px;
  padding: 5px;
  img {
    width: 100%;
  }
}
</style>
