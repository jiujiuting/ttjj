/* eslint-disable camelcase */
import request from '@/utils/request'
export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
