import request from '@/utils/request'
/**
 * 评论
 * @param {*} param0
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: '/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
export const addList = (target) => {
  return request({
    method: 'POST',
    url: '/comment/likings',
    data: {
      target
    }
  })
}
export const delList = (target) => {
  return request({
    method: 'DELETE',
    url: `/comment/likings/${target}`
  })
}
