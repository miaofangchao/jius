//定义登录状态,状态很少
import getLoginState from '../api/mobile-loginState'
var store = {
  state: {
    loginFlag: '',
    comId:''
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
        this.state.loginFlag = resolve.data.loginState
        this.state.comId = resolve.data.comId
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