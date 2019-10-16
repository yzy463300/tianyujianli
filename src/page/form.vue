<template>
  <div class="container">
    <van-cell-group>
        <van-field
          v-model="name"
          required
          label="姓名"
          clearable
          placeholder="请输入姓名"
        />
        <van-field
          v-model="phone"
          required
          type="tel"
          clearable
          label="联系方式"
          placeholder="请输入联系方式"
        />
        <van-field
          v-model="school"
          required
          center
          clearable
          label="毕业院校"
          placeholder="请输入毕业院校"
        >
        </van-field>
        <van-field
          v-model="years"
          required
          center
          clearable
          label="毕业年份"
          placeholder="请输入毕业年份"
        >
        </van-field>
        <van-field
          v-model="profession"
          required
          center
          clearable
          label="专业名称"
          placeholder="请输入专业名称"
        >
        </van-field>
        <van-field
          v-model="education"
          @click="popShow = true"
          required
          center
          clearable
          is-link
          readonly
          label="学历"
          placeholder="请选择您的学历"
        >
        </van-field>
        <van-field
          v-model="like"
          required
          type="textarea"
          clearable
          label="爱好及特长:"
          placeholder="请填写爱好及特长"
        >
        </van-field>
        <van-field
          v-model=" experience"
          required
          type="textarea"
          clearable
          label="实习经历:"
          placeholder="请填写实习经历"
        >
        </van-field>
        <van-field
          v-model="desc"
          required
          type="textarea"
          clearable
          label="自我描述:"
          placeholder="请填写自我描述"
        >
        </van-field>
        
      </van-cell-group>
      <van-popup v-model="popShow"  position="bottom">
        <van-picker
          show-toolbar
          title="选择学历"
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      school: "",
      years: "",
      profession: "",
      education: "",
      like: "",
      experience: "",
      desc: "",
      columns: ["博士及以上", "硕士", "本科", "专科", "高中及以下"],
      popShow: false
    };
  },
  mounted() {},
  activated() {},
  methods: {
    onConfirm(value) {
      this.education = value;
      this.popShow = false;
    },
    onCancel() {
      this.popShow = false;
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
</style>
