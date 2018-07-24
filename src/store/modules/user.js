import { login, logout, getInfo } from '@/api/login'
import { changeRole } from '@/api/layout'
import { getToken, setToken, removeToken } from '@/utils/auth'
const qs = require('querystring')
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menuList:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENULIST: (state, menuList) => {
      state.menuList = menuList
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      console.log('=================')
      return new Promise((resolve, reject) => {
        let formData = qs.stringify(userInfo)
        login(formData).then(response => {
          const data = response.data.data
          setToken(data)
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(state.token)
        getInfo(state.token).then(response => {
          const data = response.data.data
          if (data.roleList && data.roleList.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roleList)
            commit('SET_MENULIST', data.roleList[0].menuList)
          } else {
            reject('getInfo: roleList must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.photo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ChangeRole({commit},params){
      console.log(params)
      console.log('+++++++')
      return new Promise((resolve, reject) =>{
        changeRole(params).then(response =>{
          const data = response.data.data
          if(data.menuList && data.menuList.length > 0) {
            commit('SET_MENULIST', data.menuList)
          } else {
            reject('getInfo: roleList must be a non-null array !')
          }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENULIST', [])
          commit('SET_AVATAR', '')
          commit('SET_NAME', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
