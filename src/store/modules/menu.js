
import { menu_tree, menu_add, menu_del, menu_edit } from '@/api/menu.js'

const actions = {
  // 获取树形结构
  menu_tree() {
    return new Promise((resolve, reject) => {
      menu_tree().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menu_add({ commit }, data) {
    return new Promise((resolve, reject) => {
      menu_add(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  menu_edit({ commit }, data) {
    return new Promise((resolve, reject) => {
      menu_edit(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  menu_del({ commit }, data) {
    return new Promise((resolve, reject) => {
      menu_del(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}

