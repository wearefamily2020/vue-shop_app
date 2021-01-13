const arr = []
export default {
    setItem(name, item) {
        arr.push(item)
        arr.forEach((ele, index) => { ele.id = index })
        localStorage.setItem(name, JSON.stringify(arr))
    },
    getItem(name) {
        return JSON.parse(localStorage.getItem(name) || '[]')
    }
}