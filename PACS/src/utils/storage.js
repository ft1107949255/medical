/**
 * Storage tools
 * @author wucheshi
 * @time 2018-09-17
 */

import {isArray, isObject} from 'lodash'

/**
 * Set storage
 * @param {string} key Key valuse
 * @param {any} value  Values
 * @param {string} mode Storage mode, Optional: l(localStorage)/s(sessionStorage)
 */
export function _set(key, value, mode = 's') {
  let data = (isArray(value) || isObject(value)) ? JSON.stringify(value) : value
  isLocal(mode) ? localStorage.setItem(key, data) : sessionStorage.setItem(key, data)
}

/**
 * Get storage
 * @param {string} key Key valuse
 * @param {string} mode Storage mode, Optional: l(localStorage)/s(sessionStorage)
 * @return {any} Storage Data
 */
export function _get(key, mode = 's') {
  let data = isLocal(mode) ? localStorage.getItem(key) : sessionStorage.getItem(key)
  try {
    data = JSON.parse(data)
  } catch (e) {
  }
  return data
}

/**
 * Remove storage
 * @param {string|Array} key Key valuse
 * @param {string} mode Storage mode, Optional: l(localStorage)/s(sessionStorage)
 */
export function _remove(key, mode = 's') {
  let keys = !isArray(key) ? [key] : key
  let currentMode = isLocal(mode)
  keys.forEach(item => {
    currentMode ? localStorage.removeItem(item) : sessionStorage.removeItem(item)
  })
}

/**
 * Clear storage
 * @param {string} mode Storage mode, Optional: l(localStorage)/s(sessionStorage)
 */
export function _clear(mode = 's') {
  isLocal(mode) ? localStorage.clear() : sessionStorage.clear()
}

/**
 * Judge operate mode
 * @param {string} mode Mode
 * @return {boolean} Current is local
 */
function isLocal (mode) {
  return mode === 'l'
}

// Export
export default {
  set: _set,
  get: _get,
  remove: _remove,
  clear: _clear
}