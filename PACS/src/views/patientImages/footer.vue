<template>
    <!-- Edit-group -->
    <div class="footer-group">
       <!-- <div class="footer-title">
         模式选择
         <i></i>
         <i></i>
       </div> -->
        <ul>
            <li
              draggable="true"
              class="list"
              v-for="(item, index) in serialNumber"
              :key="item.icon"
              :data-id="index"
              @click="changeMode(item, index)"
              @dragstart="dragstart"
              :class="{isActive: currentIndex === index}">
              <preview-dicom class="preview-dicom" :imageId="item.instanceList[0].imageId" :isShowInfo="false"></preview-dicom>
              <div class="patient-info">
                <p>{{item.patientName}}<span>{{item.seriesNumber}}张</span></p>
                <p>{{item.patientAge}}</p>
                <p>{{item.locationName}}</p>
              </div>
            </li>
        </ul>
        <!-- <preview-dicom :imageId="imageid"></preview-dicom> -->
    </div>
</template>

<script>
import previewDicom from 'Components/src/previewDicom'
export default {
  name: 'editDicomFooter',
  props: {
    serialNumber: {
      type: Array
    }
  },
  components: {
    previewDicom
  },
  data () {
    return {
      currentIndex: 0,
      imageid: '/static/testDICOM/shidisanrenminyiyuan/0004674/1.5191KB.DCM'
    }
  },
  mounted () {
  },
  methods: {
    // Change mode
    changeMode (item, index) {
      this.currentIndex = index
      this.$emit('handleImageSelect', item)
    },
    // Drag start
    dragstart (e) {
      let index = e.target.dataset.id
      // console.log(e)
      console.log(this.serialNumber[index])
      e.dataTransfer.setData('data', JSON.stringify(this.serialNumber[index]))
    }
  }
}
</script>

<style scoped lang='stylus'>
.footer-group {
  width: 100%;
  height: 100%;
  overflow-x scroll
  ul {
    display flex;
    flex-direction: column;
    height: 100%;
  }
  li {
    flex: none;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    border: 2px solid transparent;
  }
  .list {
    display flex;
    color: #fff;
    padding: 10px 0;
    .preview-dicom {
      width: 80px;
      height: 80px;
      margin: 0 10px;
    }
    .patient-info {
      flex: auto;
      text-align: left;
      font-size: 12px;
      span {
        float: right;
        margin-right: 20px;
      }
    }
  }
  .isActive {
    transition all 0.5s;
    // background: #777;
    border: 2px solid #169bb9;
  }
}
</style>
