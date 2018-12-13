import * as cornerstoneTools from 'cornerstone-tools/dist/cornerstoneTools.js'
console.log(cornerstoneTools)
const BaseTool = cornerstoneTools.import('base/BaseTool')

export default class CustomTools extends BaseTool {
  constructor (name = 'CustomTools') {
    super({
      name,
      supportedInteractionTypes: ['mouse'],
    })
  }

  preMouseDownCallback (evt) {
    console.log('Hello cornerstoneTools!');
  }

}