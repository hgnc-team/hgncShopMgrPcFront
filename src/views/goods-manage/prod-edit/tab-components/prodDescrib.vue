<template>
  <div>
    <v-ueditor
      id="ueditor"
      :config="config"
      :content="content"
      :use-custom-upload="true"
      @ready="ueditorReady"
      @change="ueditorChange"
    />
  </div>
</template>

<script>
export default {
  name: 'ProdDescrib',
  data() {
    return {
      ue: '',
      content: '',
      config: {
        imageUrl: '//localhost:3000/server-test/upload', // 图片上传提交地址
        imagePath: '', //
        imageFieldName: 'file'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.content = '初始化内容'
    }, 0)
  },
  methods: {
    ueditorReady(ue) {
      // console.log('Ready')
      this.ue = ue
      // this.ue.setContent('v-ueditor')
    },
    ueditorChange(ue) {
      // console.log(ue.getContent())
    },
    getContent() {
      // console.log(this.ue.getContent())
      // console.log(window.UM.getEditor('ueditor').getContent())
    }
  }
}
</script>

<style lang="scss">
</style>
