<template>
  <div class="container ">
    <div class="name">姓名</div>
    <div class="input_wrap">
      <input type="text" v-model='name' placeholder="请输入您的姓名">
    </div>
    <div class="phone">联系方式</div>
    <div class="input_wrap">
      <input type="tel" v-model='phone' placeholder="请输入联系方式">
    </div>
    <div class="jianli wrap">
      <van-uploader
        style="width:100%;"
        :after-read="jianliAfterRead"
        :before-read="jianliBeforeRead"
        accept="*"
      >
        <div class="upload_btn bbox" v-if='!jianliFile && !jianliUrl'><van-icon color="#393939" name="plus" />上传简历</div>
        <div class="upload_btn bbox" v-else>{{jianliUrl.split('/').slice(-1)[0] || jianliFile.name}}</div>
      </van-uploader>
      <p class="tip"><span class="red">*</span>支持pdf、PPT、JPG、Word等格式</p>
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
    <div class="fujian wrap">
      <van-uploader
        style="width:100%;"
        :after-read="fujianAfterRead"
        :before-read="fujianBeforeRead"
        accept="*"
      >
        <div class="upload_btn bbox"  v-if='!fujianFile && !fujianUrl'><van-icon color="#393939" name="plus" />上传附件</div>
        <div class="upload_btn bbox" v-else>{{fujianUrl.split('/').slice(-1)[0] || fujianFile.name}}</div>
      </van-uploader>
      <p class="tip">所有附件大小总合<50M</p>
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
            if (type == "jianli") {
              that.jianliProgress = parseInt((e.loaded / e.total) * 100);
            }
            if (type == "video") {
              that.videoProgress = parseInt((e.loaded / e.total) * 100);
            }
            if (type == "fujian") {
              that.fujianProgress = parseInt((e.loaded / e.total) * 100);
            }
            if (that.fujianFile) {
              that.toastMask.message = `简历上传中\n${that.jianliProgress}%\n视频上传中\n${that.videoProgress}%\n附件上传中\n${that.fujianProgress}%`;
            } else {
              that.toastMask.message = `简历上传中\n${that.jianliProgress}%\n视频上传中\n${that.videoProgress}%`;
            }
          }
        })
        .then(res => {
          if (type == "jianli") {
            this.jianliUrl = params.url;
          }
          if (type == "video") {
            this.videoUrl = params.url;
          }
          if (type == "fujian") {
            this.fujianUrl = params.url;
          }
          if (this.fujianFile) {
            if (++this.uploadCount >= 3) {
              this.create_resume();
            }
          } else {
            if (++this.uploadCount >= 2) {
              this.create_resume();
            }
          }
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
        resume: this.jianliUrl,
        video: this.videoUrl,
        attachment: this.fujianUrl,
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
        // this.jianliUrl = res.data.resume;
        // this.videoUrl = res.data.video;
        // this.fujianUrl = res.data.attachment;
      }
    },
    onSubmit() {
      // if (
      //   this.name &&
      //   this.phone &&
      //   this.jianliUrl &&
      //   this.videoUrl &&
      //   !this.jianliFile &&
      //   !this.videoFile
      // ) {
      //   this.toastShow();
      //   this.create_resume();
      //   return;
      // }
      if (!this.name) {
        this.$toast.fail("请填写姓名");
        return;
      }
      if (!this.phone) {
        this.$toast.fail("请填写联系方式");
        return;
      }
      if (!this.jianliFile) {
        this.$toast.fail("请上传简历");
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
      if (this.fujianFile && this.fujianFile.size > 50 * 1024 * 1024) {
        this.$toast.fail("附件需要小于50MB");
        return;
      }
      this.toastShow();
      if (this.jianliFile) {
        this.get_oss_info(this.jianliFile, this.jianliSuffix, "jianli");
      }
      if (this.videoFile) {
        this.get_oss_info(this.videoFile, this.videoSuffix, "video");
      }
      if (this.fujianFile) {
        this.get_oss_info(this.jianliFile, this.fujianSuffix, "fujian");
      }
    },
    toastShow() {
      if (this.fujianFile) {
        this.toastMask = this.$toast.loading({
          duration: 0,
          mask: true,
          className: "tc",
          message: `简历上传中${this.jianliProgress}%\n视频上传中${this.videoProgress}%\n附件上传中\n${this.fujianProgress}%`
        });
      } else {
        this.toastMask = this.$toast.loading({
          duration: 0,
          mask: true,
          className: "tc",
          message: `简历上传中${this.jianliProgress}%\n视频上传中${this.videoProgress}%`
        });
      }
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
