import storage from "../../utils/localoage";
const user = {
    namespaced: true,
    state: {
        username: storage.getItem('user-demo')[localStorage.getItem('user_index')].username
    },
    mutations: {
        // 登录
        setUser(state, user) {
            state.username = user.username
        },
        // 退出登录
        logout(state) {
            state.username = ''
        }
    },
    getters: {
        isLogin(state) {
            return state.username
        }
    },
    actions: {},

}

export default user