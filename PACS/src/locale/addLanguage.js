/**
 * @author wucheshi
 * @time 2018-09-04
 * node add language file
 */
import translate from '../utils/translate'
import { isObject } from 'lodash'
let fs = require('fs')
let path = require('path')

// Chinese language file
const basicPath = path.resolve(__dirname, './lang')
// language list
const languageList = ['en', 'jp']

/**
 * Rewrite entry file
*/
let str = `import zh from './zh'`
let str1 = `
const data = {
  zh`
languageList.forEach(item => {
  str += `\nimport ${item} from './${item}'`
  str1 += `,\n  ${item}`
})
str = `${str}${str1}
}

export default data
`
fs.writeFileSync(`${basicPath}/index.js`, str)

/**
 * 生成其他语种目录并处理文件
 */
languageList.forEach(language => {
  fs.mkdir(`${basicPath}/${language}`, (err) => {
    console.log(err)
  })
  generateLanguageFile(`${basicPath}/zh`, language)
})

/**
 * Parse objects in file
 * @param {string} fileContent File content
 *
 * @returns {object} File internal object
 */
function parseFile (fileContent) {
  let clear = fileContent.replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '').replace(/\s+/g, '')
  let line = /\{(.)*\}/g.exec(clear)
  /* eslint-disable */
	return eval('(' + line[0] + ')')
  /* eslint-enable */
}

/**
 * Rewrite other language file content
 * @param {string} content Source file content
 * @param {object|array} transRulest Content after translation
*/
function reWriteFilteContent (content, transRulest) {
  let currentContent = content
  for (let i in transRulest) {
    if (isObject(transRulest[i])) {
      currentContent = reWriteFilteContent(currentContent, transRulest[i])
    } else {
      let regExp = new RegExp(i + ":(\\s*)(['])(.*?)(['])", 'g')
      let result = regExp.exec(currentContent)
      if (result) {
        currentContent = currentContent.replace(`${RegExp.$3}`, transRulest[i])
      }
    }
  }
  return currentContent
}

/**
 * Create other language file
 * @param {string} filePath File path
 * @param {string} language language
 */
function generateLanguageFile(filePath, language) {
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.error(err)
    } else {
      files.forEach(fileName => {
        let filedir = path.join(filePath, fileName)
        fs.stat(filedir, (err, stat) => {
          if (err) {
            console.error(err)
          } else {
            let isFile = stat.isFile()
            let isDir = stat.isDirectory()
            if (isFile) {
              let content = fs.readFileSync(filedir, 'utf-8')
              if (!fileName.includes('index')) {
                translate.toTranslate(parseFile(content), language).then(res => {
                  let translateContent = reWriteFilteContent(content, res)
                  fs.writeFileSync(filedir.replace(/zh/g, language), translateContent, (err) => {
                    if (err) {
                      throw err
                    }
                  })
                })
              } else {
                fs.writeFileSync(filedir.replace(/zh/g, language), content, (err) => {
                  if (err) {
                    throw err
                  }
                })
              }
            }
            if (isDir) {
              generateLanguageFile(filedir, language)
            }
          }
        })
      })
    }
  })
}
