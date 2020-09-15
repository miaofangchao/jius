//定义登录状态,状态很少
import getLoginState from '../api/mobile-loginState'
var store = {
  state: {
    loginFlag: null,
    comId:''
  },
  testLoginState() {
    getLoginState().then(
      (resolve) => {
        this.state.comId = resolve.data.comId
        setTimeout(() => {
          this.state.loginFlag = resolve.data.loginState
        }, 250);
      },
      () => {
        this.state.loginFlag = false
      }
    )
  }
}
export default store