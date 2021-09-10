import { getlist, workItem_add, workItem_edit } from '@/api/workItem'

const actions = {
  // 获取树形结构
  getlist({ commit }, data) {
    return new Promise((resolve, reject) => {
      getlist(data).then(response => {
        // const { data } = response
        // resolve(data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  workItem_add({ commit }, data) {
    return new Promise((resolve, reject) => {
      workItem_add(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  workItem_edit({ commit }, data) {
    return new Promise((resolve, reject) => {
      workItem_edit(data).then(response => {
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
