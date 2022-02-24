<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :limit="1"
      :file-list="fileList"
      :on-remove="remove"
      :class="{ selectDisabled: fileComputed }"
      :on-change="change"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
      style="width: 180px"
      v-if="showPercent"
      :percentage="percent"
    ></el-progress>

    <el-dialog title="图片预览" :visible.sync="showDialog">
      <template>
        <img class="img-preview" :src="imgUrl" />
      </template>
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDQfeMo0vZv1pMccKlvpSothFWYJn0wb08",
  SecretKey: "sTmvpSnud5GBpCI9k35qKcePt62h6E6h",
});
export default {
  data() {
    return {
      showPercent: false,
      percent: 0,
      imgUrl: "",
      showDialog: false,
      fileList: [],
      currentFileUid: "", // 用一个变量 记住当前上传的图片id
    };
  },
  methods: {
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: "ruby0618-1302706479", // 存储桶
            Region: "ap-nanjing", // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: "STANDARD", // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
            onProgress: function (params1) {
              this.percent = params1.percent * 100;
              console.log(object);
            },
          },
          function (err, data) {
            // data返回数据之后 应该如何处理
            // if (!err && data.statusCode === 200) {
            //   此时说明文件上传成功  要获取成功的返回地址
            // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地址
            // 目前虽然是一张图片 但是请注意 我们的fileList是一个数组
            // 需要知道当前上传成功的是哪一张图片
            this.fileList = this.fileList.map((item) => {
              // 去找谁的uid等于刚刚记录下来的id
              if (item.uid === this.currentFileUid) {
                // 将成功的地址赋值给原来的url属性
                return { url: "http://" + data.Location, upload: true };
                // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
              }
              return item;
            });
            setTimeout(() => {
              this.showPercent = false; // 隐藏进度条
              this.percent = 0; // 进度归0
            }, 2000);
            // 将上传成功的地址 回写到了fileList中 fileList变化  =》 upload组件 就会根据fileList的变化而去渲染视图
            // }
          }
        );
      }
    },
    preview(file) {
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    remove(file) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    beforeUpload(file) {
      // 定义允许的文件类型
      const types = [
        "image/jpeg",
        "image/gif",
        "image/bmp",
        "image/png",
        "image/jpg",
      ];
      // 检查文件类型
      if (!types.includes(file.type)) {
        this.$notify.warning("只允许jpg,gif,bmp,png格式");
        return false;
      }

      if (file.size / 1024 >= 5000000 / 1024) {
        this.$notify.warning("图片大小只允许5M以内");
        return false;
      }
      this.currentFileUid = file.uid; // 记住当前的uid
      this.showPercent = true;
      return true;
    },
    change(file) {
      if (!this.fileList.some((item) => item.uid === file.uid)) {
        this.fileList.push(file);
      }
    },
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
};
</script>

<style  lang="scss">
.selectDisabled {
  .el-upload--picture-card {
    display: none;
  }
}

.img-preview {
  width: 100%;
}
</style>