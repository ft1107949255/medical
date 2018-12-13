<template>
    <!-- menu-group -->
    <div class="menu-group">
        <div class="menu-list">
          <!-- layout group -->
          <ul>
            <li v-for="(item, index) in layoutList" :key="index" @click="changeLayout(item, index)">
              <el-tooltip class="item" effect="light" :content="item.title" placement="top" v-show="item.mode !== 'custom'" >
                <img :src="item.icon" />
              </el-tooltip>
              <el-popover
                v-show="item.mode === 'custom'"
                placement="right"
                trigger="hover">
                <!-- layout -->
                <div class="layout">
                  <div class="layout-col" v-for="col in 3" :key="col">
                    <div class="layout-row" v-for="row in 3" :key="row" :class="{'layout-item_active': row <= currentLayoutRow && col <= currentLayoutCol}" @click="selectLayout" @mouseover="overLayout(col, row)"></div>
                  </div>
                </div>
                <img :src="item.icon" slot="reference" />
              </el-popover>
            </li>
          </ul>
          <!-- animation group -->
          <ul>
            <li v-for="(item, index) in animateList" :key="index" @click="changeMode(item, index)">
              <el-tooltip class="item" effect="light" :content="item.title" placement="top" >
                <i class="icon iconfont" :class="item.icon"></i>
              </el-tooltip>
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in buttomList" :key="index" @click="changeMode(item, index)">
              <el-tooltip class="item" effect="light" :content="item.title" placement="top" >
                <i class="icon iconfont" :class="item.icon"></i>
              </el-tooltip>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      currentIndex: -1,
      currentLayoutIndex: -1,
      // Layout list
      layoutList: [
        {
          title: '1*1',
          icon: require('./images/0.png'),
          mode: 'standard\\1,1'
        },
        {
          title: '1*2',
          icon: require('./images/1.png'),
          mode: 'standard\\1,2'
        },
        {
          title: '2*1',
          icon: require('./images/2.png'),
          mode: 'standard\\2,1'
        },
        {
          title: '2*2',
          icon: require('./images/3.png'),
          mode: 'standard\\2,2'
        },
        {
          title: '1/2',
          icon: require('./images/4.png'),
          mode: 'col\\1,2'
        },
        {
          title: '2/1',
          icon: require('./images/5.png'),
          mode: 'row\\2,1'
        },
        {
          title: '1/3',
          icon: require('./images/6.png'),
          mode: 'col\\1,3'
        },
        {
          title: '自定义',
          icon: require('./images/7.png'),
          mode: 'custom'
        }
      ],
      // animate group
      animateList: [
        {
          title: '上一张',
          icon: 'icon-shangyitiao',
          mode: 'prev'
        },
        {
          title: '下一张',
          icon: 'icon-xiayitiao',
          mode: 'next'
        },
        {
          title: '播放',
          icon: 'icon-bofang',
          mode: 'play'
        }
        // {
        //   title: '暂停',
        //   icon: 'icon-pause',
        //   mode: 'pause'
        // },
      ],
      // 
      buttomList: [
        {
          title: '调窗',
          icon: 'icon-duibi',
          mode: 'wwwc'
        },
        {
          title: '反片',
          icon: 'icon-duibi1',
          mode: 'invert'
        },
        {
          title: '缩放',
          icon: 'icon-iconset0442',
          mode: 'zoom'
        },
        {
          title: '移动',
          icon: 'icon-yidong',
          mode: 'pan'
        },
        {
          title: '测量',
          icon: 'icon-celiang',
          mode: 'length'
        },
        // {
        //   title: '测量心胸比',
        //   icon: 'icon-celiang',
        //   mode: 'lengthHeart'
        // },
        {
          title: '测角度',
          icon: 'icon-ziyuan',
          mode: 'angle'
        },
        {
          title: '标记',
          icon: 'icon-biaoji',
          mode: 'probe'
        },
        {
          title: '椭圆面积',
          icon: 'icon-yuanxingweixuanzhong',
          mode: 'ellipticalRoi'
        },
        {
          title: '矩形面积',
          icon: 'icon-graphical',
          mode: 'rectangleRoi'
        },
        {
          title: '不规则面积',
          icon: 'icon-icon-dianjiduobianxing',
          mode: 'freehand'
        },
        // {
        //   title: '分屏',
        //   icon: 'icon-fenpingshezhi',
        //   mode: 'splitScreen'
        // },
        {
          title: '旋转',
          icon: 'icon-yulanxuanzhuan',
          mode: 'rotate'
        },
        {
          title: '放大',
          icon: 'icon-fangda',
          mode: 'enlarge'
        },
        {
          title: '顺时针旋转',
          icon: 'icon-xuanzhuan',
          mode: 'Lrotate'
        },
        {
          title: '逆时针旋转',
          icon: 'icon-xuanzhuan1',
          mode: 'Rrotate'
        },
        {
          title: '垂直旋转',
          icon: 'icon-chuizhifanzhuan',
          mode: 'flipVertical'
        },
        {
          title: '水平旋转',
          icon: 'icon-shuipingfanzhuan',
          mode: 'flipHorizontal'
        },
        {
          title: '突出显示',
          icon: 'icon-xuxian',
          mode: 'highlight'
        },
        {
          title: '清除',
          icon: 'icon-Eliminate',
          mode: 'eraser'
        },
        {
          title: '保存',
          icon: 'icon-baocun',
          mode: 'save'
        },
        {
          title: '备注',
          icon: 'icon-beizhu',
          mode: 'remark'
        },
        {
          title: '打印',
          icon: 'icon-dayin',
          mode: 'print'
        }
      ],

      // layout
      currentLayoutRow: -1,
      currentLayoutCol: -1
    }
  },
  mounted () {
    if (this.$route.query.studyinsta) {
      this.buttomList = this.buttomList.filter(item => item.mode !== 'print')
    }
  },
  methods: {
    // Change mode
    changeMode (item, index) {
      this.currentIndex = index
      this.$emit('changeMode', item)
    },
    // Change layout
    changeLayout (item, index) {
      this.currentLayoutIndex = index
      this.$emit('changeLayout', item)
    },
    // 切换自定义视图框
    overLayout (col, row) {
      this.currentLayoutRow = row
      this.currentLayoutCol = col
      // console.log(col, row)
    },
    // 确认选中自定义视图框
    selectLayout () {
      let data = {
        mode: `standard\\${this.currentLayoutCol},${this.currentLayoutRow}`,
        name: 'custom'
      }
      this.changeLayout(data, -1)
    },
    returnPrev () {
      history.go(-1)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import './font/iconfont.css';
.menu-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .menu-list {
    flex: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  ul {
    display flex;
    // width: calc(100% - 0.8rem);
    flex-wrap: wrap;
    width: 100%;
    align-items center;
    font-size: 12px;
    padding: 5px;
    border-bottom: 1px solid #999;
  }
  li {
    box-sizing: border-box;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 20px;
    cursor pointer
  }
  i, img {
    display block
    width: 20px;
    height: 20px;
    margin: 0 auto;
    margin-top: 5px;
    font-size: 20px;
    // background: #fff;
  }
  .isActive {
    transition all 0.5s;
    background: #000;
  }
}

// layout
.layout {
}
.layout-col {
  display: flex;
}
.layout-row {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  cursor: pointer;
}
.layout-row + .layout-row {
  margin-left: 5px;
}
.layout-item_active {
  background: #333;
}

// reset
/deep/ .el-popover {
  background: #333;
}
</style>
