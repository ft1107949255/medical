<template>
    <!-- menu-params -->
    <div class="menu-params" v-if="isShowMenu">
        <div class="menu-params_title">{{currentMode.title}}</div>
        <div class="menu-params_cont">
          <!-- magnify -->
          <div class="magnify" v-if="currentMode.mode === 'enlarge'">
            <el-form ref="form" :model="magnify" label-width="100px" label-position="left">
              <el-form-item label="放大比例:">
                <el-slider v-model="magnify.magnificationLevel" :min="1" :max="5" :step="0.1" @change="changeMagnify" ></el-slider>
              </el-form-item>
              <el-form-item label="放大镜大小:">
                <el-slider v-model="magnify.magnifySize" :min="100" :max="300" @change="changeMagnify"></el-slider>
              </el-form-item>
            </el-form>
          </div>
          <!-- wwwc -->
          <div class="wwwc" v-if="currentMode.mode === 'wwwc'">
            <el-form ref="form" :model="wwwc" label-width="70px" label-position="left">
              <el-form-item label="窗位模板:">
                <el-select v-model="wwwc.template" @change="selectWwwcTemplate">
                  <el-option v-for="item in wwwcTemplateList" :label="item.name" :value="item.id" :key="item.id">
                    <span>{{item.name}}</span>
                    <span style="float: right;">{{item.width}} * {{ item.height }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手动设置:">
                <el-input v-model="wwwc.ww" class="wwwc-input" @blur="changeWwwc" placeholder="窗宽" /> x <el-input v-model="wwwc.wc" class="wwwc-input" @blur="changeWwwc" placeholder="窗位" />
              </el-form-item>
            </el-form>
          </div>
          <!-- play -->
          <div class="wwwc" v-if="currentMode.mode === 'play'">
            <el-form ref="form" :model="wwwc" label-width="70px" label-position="left">
              <el-form-item label="播放速度:">
                <el-slider v-model="play.speed" :format-tooltip="palyFormatTooltip" :min="1" :max="100" :step="1" @change="setPlaySpeed" ></el-slider>
              </el-form-item>
              <el-form-item label="是否播放:">
                <el-switch
                  v-model="play.isPlay"
                  active-text="播放"
                  inactive-text="暂停"
                  @change="setPlayStatus"
                  >
                </el-switch>
              </el-form-item>
            </el-form>
          </div>

          <!-- print -->
          <div class="print" v-if="currentMode.mode === 'print'">
            <el-form ref="form" :model="print" label-width="70px" label-position="left">
              <el-form-item label="胶片大小:">
                <el-select v-model="print.size" @change="changePrintSize">
                  <el-option v-for="item in printSizeList" :label="item.name" :value="item.name" :key="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="纸张方向:">
                <el-radio-group v-model="print.direction">
                  <el-radio label="LANDSCAPE">水平</el-radio>
                  <el-radio label="PORTRAIT">垂直</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="打印设备:">
                <el-select v-model="print.device" @change="changePrintSize">
                  <el-option v-for="item in deviceList" :label="item.name" :value="item.id" :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模式切换:">
                <el-switch
                  v-model="print.open"
                  active-text="启用打印"
                  inactive-text="退出打印"
                  @change="setPrintMode"
                  >
                </el-switch>
              </el-form-item>
              <el-form-item label="打印预览:">
                <el-button type="primary" size="mini" @click="previewPrint">预览</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!-- lengthHeart -->
          <div class="length-heart" v-if="currentMode.mode === 'lengthHeart'">
            <el-form ref="form" :model="lengthHeart" label-width="60px" label-position="right">
              <el-form-item label="T0:">
                <el-input v-model.number="lengthHeart.T0" >
                  <el-button slot="append" size="mini" @click="addHeart(0)">+</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="T1:">
                <el-input v-model.number="lengthHeart.T1" >
                  <el-button slot="append" size="mini" @click="addHeart(1)">+</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="T2:">
                <el-input v-model.number="lengthHeart.T2" >
                  <el-button slot="append" size="mini" @click="addHeart(2)">+</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="心胸比:">
                <el-input v-model="lengthHeartScalc" disabled ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
</template>

<script>
import {isArray, isObject} from 'lodash'
export default {
  name: 'menuParams',
  props: {
    // 当前模式
    currentMode: {
      type: Object,
      default () {
        return {
          title: '',
          mode: ''
        }
      }
    },
    currentImage: {
      type: Object | Array
    }
  },
  data () {
    return {
      magnify: {
        magnifySize: 100,
        magnificationLevel: 1
      },
      wwwc: {
        template: '',
        ww: '',
        wc: ''
      },
      wwwcTemplateList: [],
      // 心胸比测量
      lengthHeart: {
        T0: 0,
        T1: 0,
        T2: 0
      },
      // 播放参数
      play: {
        speed: 60,
        isPlay: false
      },
      // 可允许使用的mode
      allowMode: [
        'enlarge',
        'wwwc',
        'play',
        'print',
        'lengthHeart'
      ],
      // 打印参数
      print: {
        size: '',
        direction: 'PORTRAIT',
        device: '',
        open: false
      },
      printSizeList: [   //尺寸列表
        {
          name: '8INX10IN',
        },
        {
          name: '10INX12IN',
        },
        {
          name: '10INX14IN',
        },
        {
          name: '11INX14IN',
        },
        {
          name: '14INX14IN',
        },
        {
          name: '14INX17IN',
        },
        {
          name: '24CMX24CM',
        },
        {
          name: '24CMX30CM',
        },
      ],
      deviceList: []
    }
  },
  mounted () {
    this.getWwwcTemplateList()
    this.getCameraList()
  },
  computed: {
    isShowMenu () {
      return this.currentMode.mode && this.allowMode.includes(this.currentMode.mode)
    },
    // 心胸比
    lengthHeartScalc () {
      let scalc = (this.lengthHeart.T1 + this.lengthHeart.T2) / this.lengthHeart.T
      return isNaN(scalc) ? 0 : scalc
    }
  },
  methods: {
    /**
     * 处理dicom文件操作
     * @param {string} methodsName 处理方法名称
    */
    batchDicom () {
      let [methodsName, ...args] = arguments
      // 如果是数组则批量执行
      if (isArray(this.currentImage)) {
        this.currentImage.forEach(item => {
          item[methodsName](...args)
        })
      } else if (isObject(this.currentImage)) {
        this.currentImage[methodsName](...args)
      }
    },
    // 切换放大镜参数
    changeMagnify () {
      this.batchDicom('initMagnify', Object.assign({}, this.magnify))
      // this.currentImage.initMagnify(Object.assign({}, this.magnify))
    },
    // 切换窗宽窗位
    changeWwwc () {
      this.batchDicom('setWwwc', this.wwwc)
    },
    // 切换窗宽窗位
    selectWwwcTemplate (val) {
      let current = this.wwwcTemplateList.find(item => item.id === val)
      this.wwwc.ww = current.width
      this.wwwc.wc = current.height
      this.changeWwwc()
    },
    // 获取窗位模板列表
    getWwwcTemplateList () {
      this.$api.getWwwcTemplateList().then(res => {
        this.wwwcTemplateList = res.data
      })
    },
    // 设置播放速度格式化显示tooltip
    palyFormatTooltip (val) {
      return `${val}次/秒`
    },
    /**
     * 设置播放速度
    */
    setPlaySpeed () {
      this.currentImage.setPlaySpeed(this.play.speed)
    },
    /**
     * 操作播放和暂停
    */
    setPlayStatus () {
      let status = this.play.isPlay ? 'play' : 'pause'
      this.currentImage.playClip(status)
    },
    /**
     * 切换胶片大小
    */
    changePrintSize () {
      this.$emit('getPrintParam', this.print)
    },
    /**
     * 设置打印模式
    */
    setPrintMode () {
      console.log(this.print.open)
      this.$emit('getPrintParam', this.print)
    },
    /**
     * 预览打印效果
    */
    previewPrint () {
      this.$emit('previewPrint')
    },
    // 选择处理哪一个T值
    addHeart (index) {
      let data = {
        value: this.lengthHeart[`T${index}`]
      }
      this.currentImage.setHeartT(data)
    },
    getCameraList () {
      this.$api.cameraSettingsGetlist().then(res => {
        this.deviceList = res.data
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
// menu-params
.menu-params {
  background: #333;
  margin-top: 20px;
  color: #fff;
  font-size: 12px;
  .menu-params_title {
    height: 24px;
    line-height: 24px;
    text-indent: 5px;
  }
  .menu-params_cont {
    background: #444;
    padding: 5px;
  }
}

// rest
>>> .el-form-item {
  margin-bottom: 0;
  .el-form-item__label {
    color: #fff;
    font-size: 12px;
  }
}
>>> .el-input__inner {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  background: #666;
  border: 1px solid #333;
}
input::-webkit-input-placeholder {
  color: #fff;
}
.wwwc-input {
  width: 80px;
  >>> input {
    text-align: center;
  }
}
>>> .el-switch__label {
  color: #fff;
  * {
    font-size: 12px;
  }
}
</style>
