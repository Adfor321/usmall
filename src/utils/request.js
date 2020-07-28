import axios from 'axios';
import qs from 'qs';
const bassUrl = '/api';
axios.interceptors.response.use(res => {
    console.group('本次请求的地址是' + res.config.url)
    console.log(res)
    console.groupEnd()
    return res
})
//菜单添加
export const reqMenuAdd = (params) => {
    return axios({
        url: bassUrl + '/api/menuadd',
        method: 'post',
        data: qs.stringify(params)
    })
}
//获取菜单列表
export const reqMenuList = (params) => {
    return axios({
        url: bassUrl + '/api/menulist',
        method: 'get',
        params: params
    })
}
//请求删除菜单项
export const reqMenuDel = (params) => {
    return axios({
        url: bassUrl + '/api/menudelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//获取菜单单个数据
export const reqMenuOne = (params) => {
    return axios({
        url: bassUrl + '/api/menuinfo',
        method: 'get',
        params: params
    })
}
//修改菜单数据
export const reqMenuUpdate = (params) => {
    return axios({
        url: bassUrl + '/api/menuedit',
        method: 'POST',
        data: qs.stringify(params)
    })
}
//添加角色数据
export const reqRoleAdd = (params) => {
    return axios({
        url: bassUrl + '/api/roleadd',
        method: 'POST',
        data: qs.stringify(params)
    })
}
//角色列表数据
export const reqRoleList = () => {
    return axios({
        url: bassUrl + '/api/rolelist',
        method: 'get',
    })
}
//角色数据一条
export const reqRoleOne = (params) => {
    return axios({
        url: bassUrl + '/api/roleinfo',
        method: 'get',
        params: params
    })
}
//角色修改
export const reqRoleUpdate = (params) => {
    return axios({
        url: bassUrl + '/api/roleedit',
        method: 'POST',
        data: qs.stringify(params)
    })
}
//角色删除
export const reqRoleDel = (params) => {
    return axios({
        url: bassUrl + '/api/roledelete',
        method: 'post',
        data: qs.stringify(params)
    })
}
//管理员添加
export const reqAdminAdd = params => axios({
    url: bassUrl + '/api/useradd',
    method: 'post',
    data: qs.stringify(params)
})
//管理员总数
export const reqAdminAll = () => axios({
    url: bassUrl + '/api/usercount',
    method: 'get',
})
//管理员列表
export const reqAdminList = params => axios({
    url: bassUrl + '/api/userlist',
    method: 'get',
    params
})
//管理员获取一条
export const reqAdminOne = params => axios({
    url: bassUrl + '/api/userinfo',
    method: 'get',
    params
})
//管理员修改
export const reqAdminEdit = params => axios({
    url: bassUrl + '/api/useredit',
    method: 'post',
    data: qs.stringify(params)
})
//管理员删除
export const reqAdminDel = params => axios({
    url: bassUrl + '/api/userdelete',
    method: 'post',
    data: qs.stringify(params)
})
//管理员登录
export const reqAdminLogin = params => axios({
    url: bassUrl + '/api/userlogin',
    method: 'post',
    data: qs.stringify(params)
})
//商品规格添加
export const reqSpecAdd = params => axios({
    url: bassUrl + '/api/specsadd',
    method: 'post',
    data: qs.stringify(params)
})
//商品规格总数
export const reqSpecAll = () => axios({
    url: bassUrl + '/api/specscount',
    method: 'get',
})
//商品规格列表
export const reqSpecList = params => axios({
    url: bassUrl + '/api/specslist',
    method: 'get',
    params
})
//商品规格获取一条
export const reqSpecOne = params => axios({
    url: bassUrl + '/api/specsinfo',
    method: 'get',
    params
})
//商品规格修改
export const reqSpecEdit = params => axios({
    url: bassUrl + '/api/specsedit',
    method: 'post',
    data: qs.stringify(params)
})
//商品规格删除
export const reqSpecDel = params => axios({
    url: bassUrl + '/api/specsdelete',
    method: 'post',
    data: qs.stringify(params)
})
//会员列表
export const reqVipList = params => axios({
    url: bassUrl + '/api/memberlist',
    method: 'get',
    params
})
//会员获取一条
export const reqVipOne = params => axios({
    url: bassUrl + '/api/memberinfo',
    method: 'get',
    params
})
//会员修改
export const reqVipEdit = params => axios({
    url: bassUrl + '/api/memberedit',
    method: 'post',
    data: qs.stringify(params)
})
//商品分类添加
export const reqSortAdd = (params) => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: bassUrl + '/api/cateadd',
        method: 'post',
        data: formData
    })
}
//商品分类列表
export const reqSortList = params => axios({
    url: bassUrl + '/api/catelist',
    method: 'get',
    params
})
//商品分类获取一条
export const reqSortOne = params => axios({
    url: bassUrl + '/api/cateinfo',
    method: 'get',
    params
})
//商品分类修改
export const reqSortEdit = (params) => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: bassUrl + '/api/cateedit',
        method: 'post',
        data: formData
    })
}
//商品分类删除
export const reqSortDel = params => axios({
    url: bassUrl + '/api/catedelete',
    method: 'post',
    data: qs.stringify(params)
})
//轮播图添加
export const reqBannerAdd = (params) => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: bassUrl + '/api/banneradd',
        method: 'post',
        data: formData
    })
}
//轮播图列表
export const reqBannerList = params => axios({
    url: bassUrl + '/api/bannerlist',
    method: 'get',
    params
})
//轮播图获取一条
export const reqBannerOne = params => axios({
    url: bassUrl + '/api/bannerinfo',
    method: 'get',
    params
})
//轮播图修改
export const reqBannerEdit = params => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: bassUrl + '/api/banneredit',
        method: 'post',
        data: formData
    })
}
//轮播图删除
export const reqBannerDel = params => axios({
    url: bassUrl + '/api/bannerdelete',
    method: 'post',
    data: params
})
//商品添加
export const reqGoodsAdd = (params) => {
    let formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: bassUrl + '/api/goodsadd',
        method: 'post',
        data: formData
    })
}
//商品列表
export const reqGoodsList = (params) => axios({
    url: bassUrl + '/api/goodslist',
    method: 'get',
    params
})
//商品总数
export const reqGoodsAll = params => axios({
    url: bassUrl + '/api/goodscount',
    method: 'get',
    params
})
//商品获取一条
export const reqGoodsOne = params => axios({
    url: bassUrl + '/api/goodsinfo',
    method: 'get',
    params
})
//商品修改
export const reqGoodsEdit = (params) => {
    let formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: bassUrl + '/api/goodsedit',
        method:'post',
        data:formData
    })
}
//商品删除
export const reqGoodsDel = params=>axios({
    url:bassUrl+'/api/goodsdelete',
    method:'post',
    data:qs.stringify(params)
})
//秒杀添加
export const reqKillAdd = params=>axios({
    url:bassUrl+'/api/seckadd',
    method:'post',
    data:qs.stringify(params)
})
//秒杀列表
export const reqKillList = params => axios({
    url: bassUrl + '/api/secklist',
    method: 'get',
    params
})
//秒杀获取一条
export const reqKillOne = params => axios({
    url: bassUrl + '/api/seckinfo',
    method: 'get',
    params
})
//秒杀修改
export const reqKillEdit = params=>axios({
    url:bassUrl+'/api/seckedit',
    method:'post',
    data:qs.stringify(params)
})
//秒杀删除
export const reqKillDel = params=>axios({
    url:bassUrl+'/api/seckdelete',
    method:'post',
    data:qs.stringify(params)
})