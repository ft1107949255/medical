<template>
  <div id="hello">
    <h1>vue-kindedtior demo</h1>
    <editor id="editor_id" height="500px" width="700px" :content="editorText"
            :afterChange="afterChange()"
            pluginsPath="/static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"></editor>
 
    <!-- <editor id="editor_id2" height="500px" width="700px" :content="editorText"
            :afterChange="afterChange()"
            pluginsPath="/static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange2"></editor> -->
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "",
      editorText:'',
      editorText2:''
    };
  },
  created() {},
  methods: {
    onContentChange(val) {
        console.log(val)
    //   this.editorText = val;
    },
    onContentChange2(val) {
    //   this.editorText2 = val;
    },
    afterChange() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/styleus/index.styl';
#hello {
  float: left;
}
</style>