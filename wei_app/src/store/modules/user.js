const user = {
    namespaced: true,
    state: {
        id: 0,
        username: ''
    },
    mutations: {
        // 登录
        setUser(state, user) {
            state.id = user.id
            state.username = user.username
        },
        // 退出登录
        logout(state) {
            state.id = 0
            state.username = ''
        }
    },
    getters: {
        isLogin(state) {
            return state.id !== 0
        }
    },
    actions: {},

}

export default user