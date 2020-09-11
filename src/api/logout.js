import Vue from 'vue'

const logout = () => {
    return new Promise((resolve, reject) => {
        Vue.axios.get('http://cs.jius.net/Login.asp?Action=Logout',{withCredentials:true},)
            .then(res => {
                resolve(res)
            },
                (err) => {
                    reject(err)
                }
            )
    })
}
export default logout
