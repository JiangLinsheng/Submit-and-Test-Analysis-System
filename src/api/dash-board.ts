import axios from 'axios'
// @ts-ignore
import * as Constants from '../constants/url-root.ts'

/**
 * 查询研发质量分析
 */
export const getResearchQualityAnalysis = () => {
  return axios({
    method: 'get',
    url: `${Constants.DM_NODE_URL_ROOT}/getResearchQualityAnalysis`
  })
}

/**
 * 查询提测质量分析
 */
export const getStQualityAnalysis = () => {
  return axios({
    method: 'get',
    url: `${Constants.DM_NODE_URL_ROOT}/getStQualityAnalysis`
  })
}
