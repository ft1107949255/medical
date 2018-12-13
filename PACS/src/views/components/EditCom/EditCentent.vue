<template>
  <div class="editCentent">
      <editBtns class="editBtns"/>
      <editTitle  class="editTitle"/>
  </div>
</template>

<script>
import editBtns from "./EditBtns.vue";
import editTitle from "./EditTitle.vue";
export default {
  components: {
    editBtns,
    editTitle
  },
  data() {
    return {
      msg: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">


.editCentent {
  background-color: $bgGray;
}

.editBtns {
  background-color: $gray;
}

.editTitle {
  width: 96%;
  margin: 0 2%;
  background-color: $colorWhite;
}
</style>