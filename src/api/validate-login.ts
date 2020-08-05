import axios from 'axios'
// @ts-ignore
import * as Constants from '../constants/url-root.ts'

/**
 * 验证登录
 */
export const validateLogin = (data) => {
  return axios({
    method: 'post',
    url: `${Constants.DM_NODE_URL_ROOT}/validateLogin`,
    data: data
  })
}
