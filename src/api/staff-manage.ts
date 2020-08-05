import axios from 'axios'
// @ts-ignore
import * as Constants from '../constants/url-root.ts'

/**
 * 添加用户
 */
export const addUserInfo = (data) => {
  return axios({
    method: 'post',
    url: `${Constants.DM_NODE_URL_ROOT}/addUserInfo`,
    data: data
  })
}

/**
 * 删除用户
 */
export const deleteUserInfo = (data) => {
  return axios({
    method: 'post',
    url: `${Constants.DM_NODE_URL_ROOT}/deleteUserInfo`,
    data: data
  })
}

/**
 * 查询用户
 */
export const getUserInfo = () => {
  return axios({
    method: 'get',
    url: `${Constants.DM_NODE_URL_ROOT}/getUserInfo`
  })
}

/**
 * 修改用户
 */
export const updateUserInfo = (data) => {
  return axios({
    method: 'put',
    url: `${Constants.DM_NODE_URL_ROOT}/updateUserInfo`,
    data: data
  })
}
