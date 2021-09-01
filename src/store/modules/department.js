
import { department_tree, department_add, department_edit, department_del, department_GetList, OrganizationalStructure } from '@/api/department.js'

const actions = {
  // 获取部门树形结构
  department_tree({ commit }, id) {
    return new Promise((resolve, reject) => {
      department_tree(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  OrganizationalStructure({ commit }, id) {
    return new Promise((resolve, reject) => {
      OrganizationalStructure(id).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 增加
  department_add({ commit }, data) {
    return new Promise((resolve, reject) => {
      department_add(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  department_edit({ commit }, data) {
    return new Promise((resolve, reject) => {
      department_edit(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  department_del({ commit }, id) {
    return new Promise((resolve, reject) => {
      department_del(id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //   department_depdel({ commit }, id) {
  //     return new Promise((resolve, reject) => {
  //       department_depdel(id).then(response => {
  //         resolve(response)
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   department_depedit({ commit }, data) {
  //     return new Promise((resolve, reject) => {
  //       department_depedit(data).then(response => {
  //         resolve(response)
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   department_adddep({ commit }, data) {
  //     return new Promise((resolve, reject) => {
  //       department_adddep(data).then(response => {
  //         resolve(response)
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  department_GetList({ commit }, data) {
    return new Promise((resolve, reject) => {
      department_GetList(data).then(response => {
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
