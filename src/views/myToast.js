//mint-ui --- Toast 的封装:
// text:弹出框文本消息；
// timeout：延时时间 ;
// iconClass:图标样式，可选
import { Toast } from "mint-ui";
const myToast = (text, timeout, iconClass = '') => {
    if (iconClass == '') {
        let instance = Toast(text);
        setTimeout(() => {
            instance.close();
        }, timeout);
    } else {
        let instance = Toast({ message: text, iconClass: 'iconfont ' + iconClass });
        setTimeout(() => {
            instance.close();
        }, timeout);
    }

}
export default myToast