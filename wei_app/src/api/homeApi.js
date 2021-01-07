import require from '@/utils/require'
const baseURl = require.defaults.baseURL

export default {
    getSwiper() {
        let url = baseURl + '/imglist'
        return require.get(url)
    },
    // 获取新闻
    getNewsList() {
        let url = baseURl + '/news/list'
        return require.get(url)
    },
    // 获取每条消息数据
    getNewsShowData(id) {
        let url = baseURl + '/news/show'
        return require.get(url, { params: { id } })
    },
    // 获取图片分类
    getPhotoCategory() {
        let url = baseURl + '/photo/getimgcategory'
        return require.get(url)
    },
    // 根据id 获取图片列表
    getPhotoListById(id) {
        let url = baseURl + '/photo/getimages'
        return require.get(url, { params: { id } })
    },
    // 获取图片详情
    getPhotoInfo(id) {
        let url = baseURl + '/photo/getimageInfo'
        return require.get(url, { params: { id } })
    },
    //获取缩略图
    getMinPhoto(id) {
        let url = baseURl + '/photo/getthumimages'
        return require.get(url, { params: { id } })
    },
}