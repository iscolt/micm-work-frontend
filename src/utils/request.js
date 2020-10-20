import axios from 'axios'
import { MessageBox, Message } from 'element-ui'


// export const serviceUrl = "http://localhost:8082/api"
export const serviceUrl = "http://www.iscolt.com:8082/api"
// export const serviceUrl = "http://www.iscolt.com:8083/api"

// create an axios instance
const service = axios.create({
    // 内网穿透接口
    // baseURL: "http://31v444t816.wicp.vip/api", // url = base url + request url
    baseURL: serviceUrl, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        // if (store.getters.token) {
        if (localStorage.getItem('token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            // 修改请求头, 将Token放入请求头
            // config.headers['X-Token'] = getToken()
            config.headers['token'] = localStorage.getItem('token')
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // Token 过期了
            if (res.message === "401") {
                Message({
                    message: '身份过期，请重新登陆',
                    type: 'error',
                    duration: 5 * 1000
                })
                localStorage.clear()
            }

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    // store.dispatch('user/resetToken').then(() => {
                    location.reload()
                    // })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
