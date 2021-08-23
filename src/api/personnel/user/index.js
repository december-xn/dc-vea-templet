import request from '@/utils/request'
const prefix = 'user'

export async function login(data) {
  return await request({
    url: `/v1/${prefix}/login`,
    method: 'post',
    data
  })
}

export async function getRoles() {
  return await request({
    url: `/v1/${prefix}/roles`,
    method: 'get'
  })
}

export async function logout() {
  return { code: 0 }
}

export async function createMethod(data) {
  return await request({
    url: `/v1/${prefix}`,
    method: 'POST',
    data
  })
}

export async function deleteMethod(_id) {
  return await request({
    url: `/v1/${prefix}/${_id}`,
    method: 'delete'
  })
}

export async function updateMethod(data) {
  return await request({
    url: `/v1/${prefix}/${data._id}`,
    method: 'PUT',
    data
  })
}

export async function getMethod(params) {
  return await request({
    url: `/v1/${prefix}`,
    method: 'GET',
    params
  })
}
