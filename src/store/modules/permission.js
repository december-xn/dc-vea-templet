import { asyncRoutes, constantRoutes } from '@/router'

export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (!tmp.roles) {
      if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, roles)
      res.push(tmp)
      return
    }
    if (roles.includes(tmp.roles)) {
      if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, roles)
      res.push(tmp)
      return
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('9999')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
