import axios from 'axios'
// @ts-ignore
import * as Constants from '../constants/url-root.ts'

/**
 * 添加项目
 */
export const addProject = (data) => {
  return axios({
    method: 'post',
    url: `${Constants.DM_NODE_URL_ROOT}/addProject`,
    data: data
  })
}

/**
 * 删除项目
 */
export const deleteProject = (data) => {
  return axios({
    method: 'post',
    url: `${Constants.DM_NODE_URL_ROOT}/deleteProject`,
    data: data
  })
}

/**
 * 查询项目
 */
export const getProjectInfo = () => {
  return axios({
    method: 'get',
    url: `${Constants.DM_NODE_URL_ROOT}/getProjectInfo`
  })
}
