//定义登录状态
import getLoginState from '../api/mobile-loginState'
var store = {
  state: {
    loginFlag: ''
  },
  login() {
    this.state.loginFlag = true
  },
  logout() {
    this.state.loginFlag = false
  },
  testLoginState() {
    getLoginState().then(
      (resolve) => {
        // 转换值，否则是字符串
        this.state.loginFlag = Boolean(resolve.data)
      },
      () => {
        this.state.loginFlag = false
      }
    )
    // setTimeout(() => {
    //   this.state.loginFlag = false
    // }, 1000);
  }
}
export default store