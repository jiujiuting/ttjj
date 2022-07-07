import request from '@/utils/request'

export const getSmsCode = (mobile) => {
  return request({
    url: `sms/codes/${mobile}`
  })
}
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}
/**
 *
 * @returns 用户个人资料
 */
export const getUserProfile = () => {
  return request({
    url: '/user/profile'
  })
}
/**
 *
 * @param {对象 用户个人资料} profile
 * @returns 更新用户个人资料
 */
export const updateUserProfile = profile => {
  return request({
    method: 'PATCH',
    url: '/user/profile',
    data: profile
  })
}
export const updateAvatar = data => {
  return request({
    method: 'PATCH',
    url: '/user/photo',
    data
  })
}
