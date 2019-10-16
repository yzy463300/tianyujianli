<template>
  <div class="container ">
    <div class="title_wrap">
      <div class="title"><div class="text">创建微简历</div><div class="bg"></div></div>
    </div>
    <div class="name"><span class="red">*</span>姓名</div>
    <div class="input_wrap">
      <input type="text" v-model='name' placeholder="请输入您的姓名">
    </div>
    <div class="phone"><span class="red">*</span>联系方式</div>
    <div class="input_wrap">
      <input type="tel" v-model='phone' placeholder="请输入联系方式">
    </div>
    <div class="name"><span class="red">*</span>邮箱</div>
    <div class="input_wrap">
      <input type="text" v-model='email' placeholder="请输入您的邮箱">
    </div>
    <div class="name"><span class="red">*</span>紧急联系人姓名</div>
    <div class="input_wrap">
      <input type="text" v-model='name2' placeholder="请输入紧急联系人姓名">
    </div>
    <div class="name"><span class="red">*</span>紧急联系人电话</div>
    <div class="input_wrap">
      <input type="text" v-model='phone2' placeholder="请输入紧急联系人电话">
    </div>
    
    <div class="phone"><span class="red">*</span>毕业学校</div>
    <div class="input_wrap">
      <input type="text" v-model='schoole' placeholder="请输入毕业学校">
    </div>
    <div class="phone"><span class="red">*</span>毕业年份</div>
    <div class="input_wrap">
      <input type="tel" v-model='graduate_year' placeholder="请输入毕业年份">
    </div>
    <div class="phone"><span class="red">*</span>专业名称</div>
    <div class="input_wrap">
      <input type="text" v-model='major' placeholder="请输入专业名称">
    </div>
    <div class="phone"><span class="red">*</span>您的学历</div>
    <div class="input_wrap">
      <input type="text" v-model='xueli' placeholder="请输入您的学历">
    </div>
    <div class="phone"><span class="red">*</span>请填写您的实习经历：</div>
    （实习经历需提供<span class="red">时间、单位、工作内容</span>三项信息）
    <div class="input_wrap">
      <textarea  maxlength="500" v-model='shixi' placeholder="最多输入500字"></textarea>
      <div class="num">{{shixi.length}}/500</div>
    </div>
    <div class="phone"><span class="red">*</span>自我描述：</div>
    <div class="input_wrap">
      <textarea  maxlength="500" v-model='self_introduction' placeholder="最多输入500字"></textarea>
      <div class="num">{{self_introduction.length}}/500</div>
    </div>
    <div class="video wrap">
      <van-uploader
        style="width:100%;"
        :after-read="videoAfterRead"
        :before-read="videoBeforeRead"
        accept="*"
      >
        <div class="upload_btn bbox" v-if='!videoFile && !videoUrl'><van-icon color="#393939" name="plus" />上传视频</div>
        <div class="upload_btn bbox" v-else>{{videoUrl.split('/').slice(-1)[0] || videoFile.name}}</div>
      </van-uploader>
      <p class="tip"><span class="red">*</span>请上传一分钟以内<span class="red">自我介绍</span>视频，支持MP4等格式<50M</br><span class="red">（不限形式，可手机直接录制）</span></p>
    </div>
    <div class="button" @click="onSubmit">确认提交</div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/index.js";
import api from "../api/api";
import { querystring } from "vux";
const ajax = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  transformRequest: [
    function(data) {
      let ret = "";
      for (let it in data) {
        ret +=
          encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
      }
      return ret;
    }
  ]
});
export default {
  data() {
    return {
      id: "",
      openid: "",
      name: "",
      phone: "",
      schoole: "",
      graduate_year: "",
      major: "",
      xueli: "",
      shixi: "",
      email: "",
      name2: "",
      phone2: "",
      self_introduction: "",
      jianliFile: null,
      videoFile: null,
      fujianFile: null,
      jianliSuffix: "",
      videoSuffix: "",
      fujianffix: "",
      jianliUrl: "",
      fujianUrl: "",
      videoUrl: "",
      jianliProgress: 0,
      videoProgress: 0,
      fujianProgress: 0,
      fileList: [],
      uploadCount: 0,
      toastMask: null
    };
  },
  mounted() {},
  async activated() {
    this.openid = querystring.parse().openid || "";
    this.id = querystring.parse().postion_id || this.$route.query.id;
    this.fileList = [];
    this.uploadCount = 0;
    const res = await api.my_job_list();
    if (res.error_no == 0) {
      if (res.data.length > 0) {
        const job_id = res.data[res.data.length - 1]["job_id"];
        this.get_job_info(job_id);
      }
    }
    console.log(res);
  },
  methods: {
    async get_oss_info(file, suffix, type) {
      const res = await api.get_oss_info({ suffix });
      if (res.error_no == 0) {
        this.OSSupload(res.data, file, type, suffix);
      }
    },
    async OSSupload(params, file, type, suffix) {
      const that = this;
      const formData = new FormData();
      formData.append("key", params.key);
      formData.append("OSSAccessKeyId", params.OSSAccessKeyId);
      formData.append("policy", params.policy);
      formData.append("signature", params.Signature); //oss签名
      formData.append("success_action_status", "200"); //oss签名
      formData.append("file", file); //要上传的文件对象
      axios
        .post(params.host, formData, {
          onUploadProgress(e) {
            if (type == "video") {
              that.videoProgress = parseInt((e.loaded / e.total) * 100);
            }

            that.toastMask.message = `视频上传中\n${that.videoProgress}%`;
          }
        })
        .then(res => {
          if (type == "video") {
            this.videoUrl = params.url;
          }
          this.create_resume();
        })
        .catch(err => {
          return false;
        });
    },
    async create_resume() {
      const res = await api.create_resume({
        job_id: this.id,
        name: this.name,
        phone: this.phone,
        video: this.videoUrl,
        schoole: this.schoole,
        graduate_year: this.graduate_year,
        major: this.major,
        xueli: this.xueli,
        shixi: this.shixi,
        self_introduction: this.self_introduction,
        email: this.email,
        name2: this.name2,
        phone2: this.phone2,
        openid: this.openid
      });
      if (res.error_no == 0) {
        this.$toast.clear();
        this.$router.replace({ path: "success" });
      }
    },
    async get_job_info(job_id) {
      const res = await api.get_job_info({ job_id });
      if (res.error_no == 0) {
        this.name = res.data.name;
        this.phone = res.data.phone;
        this.schoole = res.data.schoole;
        this.graduate_year = res.data.graduate_year;
        this.major = res.data.major;
        this.xueli = res.data.xueli;
        this.shixi = res.data.shixi;
        this.self_introduction = res.data.self_introduction;
        this.email = res.data.email;
        this.name2 = res.data.name2;
        this.phone2 = res.data.phone2;
      }
    },
    onSubmit() {
      if (!this.name) {
        this.$toast.fail("请填写姓名");
        return;
      }
      if (!this.phone) {
        this.$toast.fail("请填写联系方式");
        return;
      }
      if (!this.email) {
        this.$toast.fail("请填写邮箱地址");
        return;
      }
      if (!this.name2) {
        this.$toast.fail("请填写紧急联系人姓名");
        return;
      }
      if (!this.phone2) {
        this.$toast.fail("请填写紧急联系人联系方式");
        return;
      }
      if (!this.schoole) {
        this.$toast.fail("请填写毕业学校");
        return;
      }
      if (!this.graduate_year) {
        this.$toast.fail("请填写毕业年份");
        return;
      }
      if (!this.major) {
        this.$toast.fail("请填写专业名称");
        return;
      }
      if (!this.xueli) {
        this.$toast.fail("请填写学历");
        return;
      }
      if (!this.shixi) {
        this.$toast.fail("请填写实习经历");
        return;
      }
      if (!this.self_introduction) {
        this.$toast.fail("请填写自我介绍");
        return;
      }

      if (!this.videoFile) {
        this.$toast.fail("请上传视频");
        return;
      }
      if (this.videoFile.size > 50 * 1024 * 1024) {
        this.$toast.fail("视频需要小于50MB");
        return;
      }
      this.toastShow();
      if (this.videoFile) {
        this.get_oss_info(this.videoFile, this.videoSuffix, "video");
      }
    },
    toastShow() {
      this.toastMask = this.$toast.loading({
        duration: 0,
        mask: true,
        className: "tc",
        message: `视频上传中${this.videoProgress}%`
      });
    },
    jianliBeforeRead(file) {
      let spl = file.name.split(".");
      const filename = spl[spl.length - 1];
      console.log(filename);
      if (
        filename == "jpg" ||
        filename == "jpeg" ||
        filename == "png" ||
        filename == "gif" ||
        filename == "pdf" ||
        filename == "doc" ||
        filename == "docx" ||
        filename == "ppt" ||
        filename == "pptx"
      ) {
        this.jianliSuffix = filename;
        return true;
      } else {
        this.$toast.fail(
          "请上传jpg,jpeg,png,gif,pdf,doc,docx,ppt,pptx格式文件"
        );
        return false;
      }
    },
    jianliAfterRead(file) {
      console.log(file);
      console.log(file["file"]);
      this.jianliFile = file["file"];
      this.fileList.push(1);
    },
    videoBeforeRead(file) {
      console.log(file);
      if (!/video/.test(file.type)) {
        this.$toast.fail("请上传视频文件");
        return false;
      } else {
        let spl = file.name.split(".");
        const filename = spl[spl.length - 1];
        this.videoSuffix = filename;
        return true;
      }
    },
    videoAfterRead(file) {
      this.videoFile = file["file"];
      this.fileList.push(1);
    },
    fujianBeforeRead(file) {
      let spl = file.name.split(".");
      const filename = spl[spl.length - 1];
      console.log(filename);
      if (
        filename == "zip" ||
        filename == "rar" ||
        filename == "html" ||
        filename == "txt"
      ) {
        this.fujianSuffix = filename;
        return true;
      } else {
        this.$toast.fail("请上传zip,rar,html,txt格式文件");
        return false;
      }
      return true;
    },
    fujianAfterRead(file) {
      this.fujianFile = file["file"];
      this.fileList.push(1);
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.title_wrap {
  position: relative;
  background-color: #fff;
  height: 1.2rem;
  .title {
    position: absolute;
    font-size: 0.48rem;
    font-weight: bold;
    color: #393939;
    .text {
      padding: 0 0.15rem;
      position: relative;
      z-index: 1;
    }
    .bg {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #ffdda8;
      width: 100%;
      height: 0.13rem;
    }
  }
}
.red {
  color: red;
}
.tip {
  font-size: 0.24rem;
  margin-top: 0.2rem;
}
.upload_btn {
  color: #393939;
  font-size: 0.34rem;
  width: 100%;
  height: 1.51rem;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.1rem;
  border: 0.02rem solid #d9d9d9;
  padding: 0 0.5rem;
  text-align: center;
  word-break: break-all;
}
.button {
  width: 6.38rem;
  height: 0.82rem;
  color: #fff;
  background-color: #ff702b;
  line-height: 0.82rem;
  font-size: 0.36rem;
  border-radius: 0.05rem;
  text-align: center;
}
.wrap {
  padding: 0.5rem 0;
  text-align: left;
}
.input_wrap {
  margin-top: 0.1rem;
  margin-bottom: 0.4rem;
  border-bottom: 0.02rem solid #cdcdcd;
  padding: 0.2rem 0;
  .num {
    text-align: right;
  }
  textarea {
    border: 0.02rem solid #cdcdcd;
    width: 100%;
    height: 3rem;
  }
  input {
    font-size: 0.34rem;
    width: 70%;
    border: none;
  }
}
.name {
  font-size: 0.27rem;
}
.phone {
  font-size: 0.27rem;
}
.container {
  padding: 0.7rem 0.5rem;
  color: #393939;
}
</style>
