import { login, logout, getRoles } from '@/api/personnel/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: null,
  introduction: '',
  roles: [],
  positions_name: [],
  _id: '',
  nickname: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar || null
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_POSITIONS_NAME: (state, positions_name) => {
    state.positions_name = positions_name
  },
  SET_ID: (state, _id) => {
    state._id = _id
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  }
}

const actions = {
  login: async function({ commit }, userInfo) {
    const { username, password } = userInfo

    const response = await login({
      username: username.trim(),
      password: password
    })
    commit('SET_TOKEN', response.data.token)
    setToken(response.data.token)
    return response
  },

  getRoles: async function({ commit, state }) {
    const response = await getRoles()
    if (response.code !== 0) {
      return new Error('', 'Verification failed, please Login again.')
    }
    const { data } = response
    const { roles, name, introduction, _id, nickname, positions_name } = data

    if (!roles || roles.length <= 0) {
      return new Error('', 'getRoles: roles must be a non-null array!')
    }

    commit('SET_ROLES', roles)
    commit('SET_NAME', name)
    commit('SET_INTRODUCTION', introduction)

    commit('SET_ID', _id)
    commit('SET_NICKNAME', nickname)
    commit('SET_POSITIONS_NAME', positions_name)

    return data
  },

  async logout({ commit, state, dispatch }) {
    const response = await logout()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()

    dispatch('tagsView/delAllViews', null, { root: true })

    return response
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getRoles')
    resetRouter()

    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    router.addRoutes(accessRoutes)

    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
