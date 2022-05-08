import cookie from 'react-cookies'

// 获取当前用户cookie
export const LoginUser = () => {
  return {'username': cookie.load('userName'), 'email': cookie.load('userEmail')}
}

// 用户登录，保存cookie
export const LogIn = (email, username) => {
  console.log("saving cookie");
  cookie.save('userEmail', email, { path: '/' });
  cookie.save('userName', username, { path: '/' });
}

// 用户登出，删除cookie
export const LogOut = () => {
  cookie.remove('userEmail');
  cookie.remove('userName');
  window.location.href = '/';
}

export const setProfile = (flag) => {
  console.log('saving upload profile cookie ', flag)
  cookie.save('profile', flag, {path: '/'});
}
export const ProfileStatus = () => {
  return cookie.load('profile')
}
export const removeProfile = () => {
  cookie.remove('profile')
}