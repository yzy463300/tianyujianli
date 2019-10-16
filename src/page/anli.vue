<template>
  <div class="container">
    <div class="title"><img src="../assets/anli.png" alt=""></div>
    <div class="item bbox"><img src="../assets/01.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/03.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/05.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/06.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/07.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/08.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/09.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/10.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/11.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/12.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/13.jpg" alt=""></div>
    <div class="item bbox"><img src="../assets/043.jpg" alt=""></div>
  </div> 
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  activated() {},
  methods: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.container {
  padding: 0.7rem 0.5rem;
  .item {
    border-radius: 0.05rem;
    overflow: hidden;
    width: 6.5rem;
    margin-top: 0.3rem;
    border: 0.1rem solid #fff;
    box-shadow: 0px 0px 5px 0px #726b6b;
    img {
      width: 100%;
    }
  }
  .title {
    padding-bottom: 0.2rem;
    img {
      width: 2.15rem;
      height: 0.46rem;
    }
  }
}
</style>
