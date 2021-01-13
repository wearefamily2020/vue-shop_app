import storage from "../../utils/localoage";
const index = storage.getItem("user_index") || 0
const user = {
    namespaced: true,
    state: {
        username: storage.getItem("user-demo")[index].username || '',

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