
import { role_getlist, role, role_detail, role_edit, role_del, role_tree } from '@/api/role.js'

const actions = {
  // 获取部门树形结构
  role_getlist() {
    return new Promise((resolve, reject) => {
      role_getlist().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  role_tree() {
    return new Promise((resolve, reject) => {
      role_tree().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增角色信息
  role({ commit }, data) {
    return new Promise((resolve, reject) => {
      role(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 编辑角色信息
  role_edit({ commit }, data) {
    return new Promise((resolve, reject) => {
      role_edit(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  role_del({ commit }, id) {
    return new Promise((resolve, reject) => {
      role_del(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 角色详情
  role_detail({ commit }, id) {
    return new Promise((resolve, reject) => {
      role_detail(id).then(response => {
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

