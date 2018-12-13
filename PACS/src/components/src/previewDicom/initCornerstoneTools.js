
import dcmdict from './dcmdict'
import * as cornerstoneTools from 'cornerstone-tools/dist/cornerstoneTools.js' // cornerstone-tools dist/cornerstoneTools.js

import * as cornerstone from 'cornerstone-core/dist/cornerstone.js'

/* eslint-disable */
import Hammer from 'hammerjs'
import * as dicomParser from 'dicom-parser'
/* eslint-enable */
// 不建议 npm 安装 cornerstoneWADOImageLoader 如果你做了 会很头疼
import * as cornerstoneWADOImageLoader from '../../../../static/dist/cornerstoneWADOImageLoader.js'

// 自定义工具类
// import customTools from './customTools'

let cornerstoneMath = require('./math.js')

// 指定要注册加载程序的基石实例
cornerstoneWADOImageLoader.external.cornerstone = cornerstone

cornerstoneTools.external.cornerstone = cornerstone

cornerstoneTools.external.Hammer = Hammer
cornerstoneTools.external.cornerstoneMath = cornerstoneMath.cornerstoneMath

// const csTools = cornerstoneTools.init()
// console.log(cornerstoneTools)
// csTools.customTools = 

// 配置 webWorker (必须配置)
// 注意这里的路径问题  如果路径不对 cornerstoneWADOImageLoaderWebWorker 会报错 index.html Uncaught SyntaxError: Unexpected token
var configOptions = {
  webWorkerPath: '/static/dist/cornerstoneWADOImageLoaderWebWorker.js',
  taskConfiguration: {
    decodeTask: {
      codecsPath: '/static/dist/cornerstoneWADOImageLoaderCodecs.js'
    }
  }
}
cornerstoneWADOImageLoader.webWorkerManager.initialize(configOptions)

function metaDataProvider(type, imageId) {
  const parsedImageId = cornerstoneWADOImageLoader.wadouri.parseImageId(imageId);
  const dataSet = cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.get(parsedImageId.url);
  if (!dataSet) {
    return;
  }
  // console.log(dataSet)
  // console.log(dcmdict.CommandField)
  if (type === 'DICOMINFO') {
    let obj = {}
    for (let i in dcmdict) {
      if (isNaN(i)) {
        let value = dcmdict[i].toString(16)
        value = `x${new Array(8 - value.length).fill(0).join('')}${value}`
        obj[i] = dataSet.string(value)
      }
    }
    return obj;
  }
}

// Register this provider with CornerstoneJS
cornerstone.metaData.addProvider(metaDataProvider);

export {
  cornerstone,
  cornerstoneTools
}

export default {}
