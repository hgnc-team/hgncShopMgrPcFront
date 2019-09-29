import { loginByUsername, logout, refreshToken, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    id: '',
    selectedCateArr: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
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
    SET_ID: (state, id) => {
      state.id = id
    }
    // SET_SEL_CATE_ARR: (state, array) => {
    //   state.selectedCateArr = array
    // }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const data = response.data
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', data.user.phone) // 已手机号码，作为用户名
            // 用户的id
            commit('SET_ID', data.user.id)
            setToken(response.data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息,没有使用
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // debugger
        getUserInfo()
          .then(response => {
            // 由于mockjs 不支持自定义状态码只能这样hack
            // if (!response.data) {
            //   reject('Verification failed, please login again.')
            // }
            const data = response.data
            commit('SET_ROLES', [data.role])
            commit('SET_NAME', data.phone)
            commit('SET_ID', data.id)
            // commit('SET_AVATAR', data.avatar) //  当前没有保存头像的功能
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_NAME', '')
            commit('SET_ID', '')
            removeToken()
            resolve()
          })
          .catch(error => {
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
    },

    // 刷新用户token
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken().then(res => {
          if (res.status === 200 && res.data.token) {
            commit('SET_TOKEN', res.data.token)
            setToken(res.data.token)
            resolve(state.token)
          } else {
            resolve(state.token)
          }
        })
      })
    }
    // 动态修改权限
    // ChangeRoles({ commit, dispatch }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
    //       resolve()
    //     })
    //   })
    // }
  }
}

export default user
