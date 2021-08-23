import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const csrfToken = getToken('csrfToken')
const domain = document.domain
const baseURL = domain.includes('localhost')
  ? `http://localhost:17000${process.env.VUE_APP_BASE_API}`
  : `http://${domain}${process.env.VUE_APP_BASE_API}`
axios.defaults.withCredentials = true

const service = axios.create({
  baseURL,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    config.headers['x-csrf-token'] = csrfToken
    if (store.getters.token) {
      config.headers['authorization'] = `Bearer ${store.getters.token}`
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 0) {
      Message({
        message: res.desc || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
    }
    return res
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.desc,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
