import axios from 'axios'
// @ts-ignore
import * as Constants from '../constants/url-root.ts'

/**
 * 添加提测信息
 */
export const addStInfo = (data) => {
  return axios({
    method: 'post',
    url: `${Constants.DM_NODE_URL_ROOT}/addStInfo`,
    data: data
  })
}

/**
 * 删除提测信息
 */
export const deleteStInfo = (data) => {
  return axios({
    method: 'post',
    url: `${Constants.DM_NODE_URL_ROOT}/deleteStInfo`,
    data: data
  })
}

/**
 * 查询提测信息
 */
export const getStInfo = () => {
  return axios({
    method: 'get',
    url: `${Constants.DM_NODE_URL_ROOT}/getStInfo`
  })
}

/**
 * 修改提测信息
 */
export const updateStInfo = (data) => {
  return axios({
    method: 'put',
    url: `${Constants.DM_NODE_URL_ROOT}/updateStInfo`,
    data: data
  })
}

/**
 * 修改提测状态
 */
export const updateStatus = (data) => {
  return axios({
    method: 'put',
    url: `${Constants.DM_NODE_URL_ROOT}/updateStatus`,
    data: data
  })
}
