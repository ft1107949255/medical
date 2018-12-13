<template>
  <div class="level-tree">
      <!-- <el-button-group slot="btn">
        <el-button type="default" size="mini" icon="el-icon-refresh" @click="getLevelList"></el-button>
      </el-button-group> -->

      <el-tree
        :props="props"
        :data="treeData"
        highlight-current
        default-expand-all
        @node-click="handleNodeClick">
      </el-tree>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'levelTree',
  components: {
  },
  data() {
    return {
      // tree
      props: {
        label: 'departname',
        value: 'orgCode',
        children: 'list'
      },
      // 树形数据
      treeData: [],

      // 当前等级id
      levelid: '',
      // 当前等级
      level: '',
      // 当前树数据
      currentNode: null,

      // 会员等级表单显示状态
      isShowLevel: false,
      // 当前会员等级表单操作状态 edit/add
      isOperateStatus: 'add',
      // 当前可选上级等级列表
      currentPrevLevelList: [],
      // 会员等级表单
      userLevel: {
        name: ''
      },

      ip: this.CONSTANT.CONSTANT.WEB_URL
    }
  },
  mounted () {
    this.getLevelList()
  },
  computed: {
    ...mapState(['currentSite'])
  },
  methods: {
    // 获取等级结构树
    getLevelList() {
      // this.$http
      //   .post(this.ip + '/xhhms/rest/interHospitalController/v1/getTree', { headers: { "X-AUTH-TOKEN": this.token } })
        this.$api.basicGetTree().then(res => {
          var data = res;
          if (data.status == 1) {
              console.log(data)
            this.treeData = data.data;
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 树节点被点击时
    async handleNodeClick(data, node) {
      // 获取当前点击等级
      this.level = node.level
      // 获取当前点击树
      this.currentNode = node

      // 操作等级叶子节点
      if (node.isLeaf) {
        this.id = data.orgCode
        this.$emit('handleLeafNode', { id: this.id, site_code: data.site_code })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.level-tree {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #eee;
  height: 90%;
}

/deep .el-card__body {
  padding: 10px 0!important;
}

/deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #999;
}

/deep/ .el-tree {
  height: 100%;
  overflow-y: auto;
}

/deep/ .el-tree-node__content {
  height: 40px;

  &:hover {
    background-color: $color-theme;
  }
}
// level-form --start
.level-form {
  padding: 20px;
}
// level-form  --end
</style>
