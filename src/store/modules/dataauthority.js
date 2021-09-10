import { getAuthorityDept } from '@/api/dataauthority.js'

const actions = {
  getAuthorityDept({ commit }) {
    return new Promise((resolve, reject) => {
      getAuthorityDept().then(response => {
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
