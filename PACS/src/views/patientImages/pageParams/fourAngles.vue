<template>
    <!-- 配置页面参数 -->
    <div class="page-params">
      <div :class="'titleGroup' + item.id" v-for="item in titleGroup" :key="item.id">
        <ul class="drop-list">
            <li v-for="(items, indexs) in item.list" :key="`item_${indexs}`" @drop="currentDrop" @dragover="currentDropOver">
              <input type="text" v-model="items.value" :data-position="`${item.position}${indexs + 1}`">
            </li>
        </ul>
      </div>
      <!-- tag字典 -->
      <div class="tags-list">
        <el-table :data="tableData" border height="280">
            <el-table-column prop="tag" label="Tag" width="100"></el-table-column>
            <el-table-column prop="name" label="Name" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="vr" label="VR" width="44"></el-table-column>
        </el-table>
      </div>
      <!-- 字体配置 -->
      <div class="text-config">
        <div class="search">
          <div class="text-title">查找</div>
          <el-form :inline="true" ref="search" :model="search" class="demo-form-inline" label-width="60px">
            <el-form-item label="Tag">
              <el-input v-model="search.tag" placeholder="" @blur="filterTags"></el-input>
            </el-form-item>
            <el-form-item label="Name">
              <el-input v-model="search.name" placeholder="" @blur="filterTags"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="text">
          <div class="text-title">文本</div>
          <el-form :inline="true" ref="text" :model="text" class="demo-form-inline" label-width="60px">
            <el-form-item label="字体">
              <el-input v-model="text.fontFamily" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="颜色">
              <el-input v-model="text.color" placeholder="">
                <el-color-picker slot="append" v-model="text.color"></el-color-picker>
              </el-input>
            </el-form-item>
            <el-form-item label="字号">
              <el-input v-model="text.fontSize" placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="other">
          <div class="text-title">其他</div>
        </div> -->
      </div>
      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button type="info" size="mini" icon="el-icon-edit" @click="handleSave">保存</el-button>
        <el-button type="info" size="mini" icon="el-icon-share" @click="handleReset">重置</el-button>
        <el-button type="info" size="mini" icon="el-icon-delete" @click="handleExit">退出</el-button>
      </div>
    </div>
</template>

<script>
import {isArray, isObject} from 'lodash'
import {mapMutations} from 'vuex'
import Sortable from 'sortablejs'
import dcmdict from './dcmdict'
import {_get} from 'Utils/storage'
export default {
  name: 'pageParams',
  props: {
  },
  data () {
    return {
      // 四角title对象
      titleGroup: [
        {
          id: 1,
          position: 'lt',
          list: []
        },
        {
          id: 2,
          position: 'rt',
          list: []
        },
        {
          id: 3,
          position: 'lb',
          list: []
        },
        {
          id: 4,
          position: 'rb',
          list: []
        }
      ],
      // 配置项列表
      tableData: [],
      // 所有配置项数据
      allTableData: [],
      // 默认四角参数
      defaultTitle: [
        {
          value: 'PatientsName',
          label: 'lt1'
        },
        {
          value: 'PatientID',
          label: 'lt2'
        },
        {
          value: 'PatientsSex',
          label: 'lt3'
        },
        {
          value: 'PatientsAge',
          label: 'lt4'
        },
        {
          value: 'Modality',
          label: 'rt1'
        },
        {
          value: 'Manufacturer',
          label: 'rt2'
        },
        {
          value: 'AcquisitionDate',
          label: 'rt3'
        },
        {
          value: 'AcquisitionTime',
          label: 'rt4'
        },
        {
          value: 'Columns',
          label: 'lb8'
        },
        {
          value: 'Rows',
          label: 'lb9'
        },
        {
          value: 'SeriesNumber',
          label: 'lb10'
        },
        {
          value: 'ZOOM',
          label: 'rb8'
        },
        {
          value: 'WindowWidth',
          label: 'rb9'
        },
        {
          value: 'WindowCenter',
          label: 'rb10'
        }
      ],
      // 查找模块
      search: {
        tag: '',
        name: ''
      },
      // 文本模块
      text: {
        fontFamily: '微软雅黑',
        color: '#FFFFFF',
        fontSize: '12px'
      }
    }
  },
  mounted () {
    this.init()
    this.getTagsList()
    this.rowDrop()
    console.log(0x00691740)
    console.log((6887232).toString(16))
  },
  computed: {
  },
  methods: {
    ...mapMutations('patientImage', [
      'SET_ANGLES_STYLE',
      'SET_ANGLES_LIST'
    ]),
    // 初始化
    init () {
      let titleGroup = [...this.titleGroup]
      titleGroup.forEach(group => {
        group.list.length = 10
        group.list.fill({})
        group.list = group.list.map((item, index) => {
          return {
            value: '',
            label: `${group.position}${index + 1}`
          }
        })
      })
      // console.log(titleGroup)
      this.titleGroup = titleGroup
      this.initAngles()
    },
    // 初始化四角参数
    initAngles (isReset = false) {
      // 重置
      if (isReset) {
        this.defaultTitle.forEach(item => {
          this.titleGroup.forEach(group => {
            group.list.forEach(list => {
              list.value = ''
            })
          })
        })
      }
      
      // 如果有默认值, 初始化默认值
      if (this.defaultTitle.length) {
        this.defaultTitle.forEach(item => {
          this.titleGroup.forEach(group => {
            group.list.forEach(list => {
              if (list.label === item.label) {
                list.value = item.value
              }
            })
          })
        })
      }

      // 获取本地参数配置
      if (!isReset) {
        let angleParams = _get('angleParams', 'l')
        if (angleParams) {
          this.titleGroup = angleParams.list
          this.text = angleParams.style
        }
      }
      
    },
    // 获取tags列表
    getTagsList () {
      let arr = []
      for (let i in dcmdict) {
        if (typeof +i === 'number' && !isNaN(+i)) {
          arr.push({
            tag: `0x${'0000000'.substr(0, 8 - (+i).toString(16).length)}${(+i).toString(16)}`,
            name: dcmdict[i][1],
            vr: dcmdict[i][0]
          })
        }
      }
      // this.tableData = arr.filter((item, index) => index < 100)
      this.tableData = arr
      this.allTableData = arr
    },
    // 过滤tags列表数据
    filterTags () {
      this.tableData = [...this.allTableData]
      if (this.search.tag) {
        this.tableData = this.tableData.filter(item => new RegExp(`^${this.search.tag}(.)*`, 'g').test(item.tag))
      }
      if (this.search.name) {
        this.tableData = this.tableData.filter(item => new RegExp(`^${this.search.name}(.)*`, 'g').test(item.name))
      }
    },
    // 按钮组
    // 退出
    handleExit () {
      this.$emit('input', '')
    },
    // 保存
    handleSave () {
      localStorage.setItem('angleParams', JSON.stringify({
        style: this.text,
        list: this.titleGroup
      }))
      this.SET_ANGLES_STYLE(this.text)
      this.SET_ANGLES_LIST(this.titleGroup)
    },
    // 重置
    handleReset () {
      // 重置四角参数
      this.initAngles(true)
      this.$refs['search'].resetFields();
      this.$refs['text'].resetFields();
    },
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        dataIdAttr: 'data-id',
        onChoose (e) {
          e.item.setAttribute('data-id', e.oldIndex)
        },
        setData (dataTransfer, dragEl) {
          let text = dragEl
          dataTransfer.setData('dataId', dragEl.dataset.id)
        },
        onRemove (e) {
          console.log(e)
        },
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
      // 四角列表拖拽
      // const list = document.querySelectorAll('.drop-list')
      // list.forEach((item, index) => {
      //   Sortable.create(item, {
      //     onEnd({ newIndex, oldIndex }) {
      //       const currRow = _this.titleGroup[index].list.splice(oldIndex, 1)[0]
      //       _this.titleGroup[index].list.splice(newIndex, 0, currRow)
      //     }
      //   })
      // })
    },
    // currentDrop
    currentDrop (e) {
      let index = e.dataTransfer.getData('dataId')
      if (index) {
        let value = this.tableData[index].name
        let label = e.target.dataset.position
        this.titleGroup.forEach(group => {
          group.list.forEach(list => {
            if (list.label === label) {
              list.value = value
            }
          })
        })
      }
    },
    // currentDropOver
    currentDropOver (e) {
      e.preventDefault()
    },
  }
}
</script>

<style scoped lang='stylus'>
/* 基础配置项 */
.page-params {
  display: grid;
  width: 700px;
  height: auto;
  padding: 10px;
  box-sizing border-box
  grid-template-rows: repeat(2, 1fr) 50px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 
  'lt tagsl rt' 'lb textConfig rb' 'btnGroup btnGroup btnGroup';
  input {
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    background: #666;
    color: #fff;
    box-shadow: 0 0 5px #333 inset;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 0 5px;
    margin: 2px 0;
    box-sizing: border-box;
  }
}
>>>.el-table td {
  padding: 0;
  border-bottom: 1px solid #999;
}
.el-table, >>>.el-table th, >>>.el-table tr {
  background: #666;
  color: #fff;
}
>>>.el-table th {
  padding: 0;
  background: #333;
}
>>>.el-table .el-table__row:hover > td {
  background: #333;
}
>>>.el-table--border td{
  border-right: 1px solid #999;
}
>>>.el-table--border th{
  border-bottom: 1px solid #999;
  border-right: 1px solid #999;
}
>>>::-webkit-scrollbar {
  // display none
}
.titleGroup1 {
  grid-area: lt
}
.titleGroup2 {
  grid-area: rt
}
.titleGroup3 {
  grid-area: lb
}
.titleGroup4 {
  grid-area: rb
}
.tags-list {
  grid-area: tagsl
  margin: 0 10px;
  padding-bottom: 20px;
}
.text-config {
  grid-area: textConfig
  margin: 0 10px;
  padding-bottom: 20px;
}
.btn-group {
  grid-area: btnGroup
  display: flex;
  align-items center;
  justify-content center;
}
/* --start text-config */
.text-config {
  background: #444;
  .text-title {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-indent: 10px;
    padding-top: 10px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  >>>.el-input-group__append {
    padding: 0;
    background: #666
    border: none;
    height: 24px;
    overflow hidden;
  }
  >>> .el-color-picker__trigger {
    width: 24px;
    height: 24px;
    padding: 0;
  }
  >>> .el-color-picker {
    height: 24px;
  }
  >>> input {
    width: 80px;
    height: 24px;
    line-height: 24px;
    background: #666;
    border: 1px solid #333;
    font-size: 12px;
    color: #fff;
  }
}
</style>
