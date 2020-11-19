import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hot from '../components/Home/Three/HomeHot.vue'
import Fabulous from '../components/Home/Three/HomeFabulous.vue'
import Collection from '../components/Home/Three/HomeCollection.vue'
import Follow from '../components/Home/Three/HomeFollow.vue'
import Whole from '../components/Home/HomeWhole.vue'
import Three from '../components/Home/HomeThree.vue'
import Myspace from '../views/My_space.vue'
import MyHomepage from '../components/Myspace/MyHomepage.vue'
import MyAlbum from '../components/Myspace/MyAlbum.vue'
import MyFollow from '../components/Myspace/MyFollow.vue'
import WholeData from '../components/Home/WholeData.vue'
import MyInform from '../views/My_information.vue'

Vue.use(VueRouter)

const routes = [{
	path: '/home',
	name: 'Home',
	component: Home,
	children: [{
		path: '/home/three',
		component: Three,
		children: [{
			path: '/home/three/hot',
			component: Hot
		}, {
			path: '/home/three/fabulous/:id',
			component: Fabulous,
			props: true
		}, {
			path: '/home/three/collection/:id',
			component: Collection,
			props: true
		}, {
			path: '/home/three/follow/:id',
			component: Follow,
			props: true
		}]
	}, {
		path: '/home/whole',
		component: Whole
	}, {
		path: '/home/whdata/:id',
		component: WholeData,
		props: true
	}]
}, {
	path: '/myspace/:id',
	component: Myspace,
	props: true,
	children: [{
		path: '/myspace/myhomepage/:id',
		component: MyHomepage,
		props: true
	}, {
		path: '/myspace/myalbum/:id',
		component: MyAlbum,
		props: true
	}, {
		path: '/myspace/myfollow/:id',
		component: MyFollow,
		props: true
	}]
}, {
	path: '/myinform/:id',
	component: MyInform,
	props: true
}, {
	path: '/',
	redirect: '/home/three/hot'
}]

const router = new VueRouter({
	routes
})

// 挂载路由导航首位
//router.beforeEach((to, from, next) => {
//to 将要访问的路径
// from 代表从哪个路径跳转而来
//next是一个函数 ， 表示放行
//next() 放行 next（‘’） 强制跳转
// if (to.path == '/home/hot') {
// 	return next();
// }
//h 或许token
// const tokenStr = window.sessionStorage.getItem("token")
// if (!tokenStr) {
// 	return next('/home/hot');
// }
// next();
//})

export default router
