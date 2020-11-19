<template>
	<div class="row">
		<!-- 中间内容部分 -->
		<div class="col-8 post_data">
			<router-view ref="Three" />
		</div>

		<!-- 右侧信息、推荐部分 -->
		<div class="col-2">
			<div class="right_data">

				<!-- 个人信息 -->
				<div class="mkback" style="margin-bottom: -6px;">
					<div v-if="grdlzc">
						<ul>
							<li class="grxx_xinxi">
								<router-link :to="'/myspace/myhomepage/'+this.user.Id" target="_blank">
									<dl class="row" style="width: 86%;margin: 0 auto;">
										<dt class="col-3" style="text-align: center; padding-bottom: 20px;margin-top: -5px;">
											<img :src="PinJieUserImg(user.UserImg)" style="width: 50px;height: 50px;border-radius: 25px;object-fit: cover;">
										</dt>
										<dd class="col-9" style="padding-right: 5px;">
											<ul style="margin-top: -5px;">
												<li style="color: beige;" v-text="user.UserName"></li>
												<li class="text_14 text_color1" v-text="user.UserText"></li>
											</ul>
										</dd><!-- 若温暖是底色，哪一片寒叶可带走炽热 -->
									</dl>
								</router-link>
							</li>
							<li style="padding-top: 10px;">
								<ul class="row" style="width: 200px;margin: 0 auto;text-align: center;padding-bottom: 10px;">
									<li class="col-4">
										<router-link to="home">
											<ul>
												<li class="gz-fs-dt" style="color: #444444;"><b v-text="FollPeoSum"></b></li>
												<li class="text_14 text_color1">关注</li>
											</ul>
										</router-link>
									</li>
									<li class="col-4 grxx_fd">
										<router-link to="home">
											<ul>
												<li class="gz-fs-dt" style="color: #444444;"><b v-text="FollPeoNum"></b></li>
												<li class="text_14 text_color1">粉丝</li>
											</ul>
										</router-link>
									</li>
									<li class="col-4 grxx_fd">
										<router-link to="home">
											<ul>
												<li class="gz-fs-dt" style="color: #444444;"><b v-text="PostUserSum"></b></li>
												<li class="text_14 text_color1">动态</li>
											</ul>
										</router-link>
									</li>
								</ul>
							</li>
						</ul>
					</div>

					<!-- 登录注册 -->
					<div v-else style="text-align: center;margin-bottom: 16px;padding-bottom: 15px;">
						<div style="padding: 30px 0 15px 0;">
							<img src="../../assets/1.png" style="width: 60px;height: 60px;">
						</div>
						<div class="text_14 text_color1">
							快速登录，与朋友一起互动哦!
						</div>
						<div class="row" style="width: 100%;margin: 0 auto;padding-top: 8px;">
							<a href="javascript:" @click="Denlu" class="col-5 text_14 grxx_dl">立即登录</a>
							<div class="col-1"></div>
							<a href="javascript:" @click="Zhuce" class="col-5 text_14 grxx_zc">快速注册</a>
						</div>
					</div>
				</div>

				<!-- 热门用户推荐 -->
				<div class="mkback" style="padding-bottom: 10px;">
					<ul class="tj_users">
						<li class="text_14" style="padding: 2px 0 0 2px;"><b>热门用户</b></li>
					</ul>
					<ul v-if="grdlzc" class="tj_users_data">
						<li v-for="(item,index) in UserHotData" :key="index" class="text_14">
							<ul class="row">
								<li class="col-10">
									<router-link :to="'/myspace/myhomepage/'+item.User.Id" target="_blank" class="text_color2 text_hover">No.<span v-text="(index+1)"></span><span v-text="item.User.UserName"></span></router-link>
									</li>
								<li class="col-2 text_color" style="text-align: right;" v-text="item.Sum"></li>
							</ul>
						</li>
					</ul>
					<div v-else class="text_14 text_color1" style="height: 200px;line-height: 150px;text-align: center;">登录后即可查看</div>
				</div>

				<!-- 热门板块推荐 -->
				<div class="mkback" style="padding-bottom: 10px;margin-top: 10px;">
					<ul class="tj_users">
						<li class="text_14" style="padding: 2px 0 0 2px;"><b>热门论坛</b></li>
					</ul>
					<ul class="tj_users_data">
						<li style="margin-bottom: -20px;">
							<dl class="row">
								<dt class="col-3" style="text-align: center;">
									<img :src="PinJieImg('100.jpeg')" style="width: 50px;height: 50px;border-radius: 5px;">
								</dt>
								<dd class="col-9" style="padding-right: 5px;">
									<ul style="margin-top: -5px;">
										<li class="text_14" style="color: #000;">Python</li>
										<li class="text_12 text_color1">欢迎来到Python吧</li>
									</ul>
								</dd>
							</dl>
						</li>
						<li style="margin-bottom: -20px;">
							<dl class="row">
								<dt class="col-3" style="text-align: center;">
									<img :src="PinJieImg('101.jpg')" style="width: 50px;height: 50px;border-radius: 5px;">
								</dt>
								<dd class="col-9" style="padding-right: 5px;">
									<ul style="margin-top: -5px;">
										<li class="text_14" style="color: #000;">Java</li>
										<li class="text_12 text_color1">欢迎来到Java吧</li>
									</ul>
								</dd>
							</dl>
						</li>
						<li style="margin-bottom: -20px;">
							<dl class="row">
								<dt class="col-3" style="text-align: center;">
									<img :src="PinJieImg('102.jpg')" style="width: 50px;height: 50px;border-radius: 5px;">
								</dt>
								<dd class="col-9" style="padding-right: 5px;">
									<ul style="margin-top: -5px;">
										<li class="text_14" style="color: #000;">前端</li>
										<li class="text_12 text_color1">欢迎来到前端吧</li>
									</ul>
								</dd>
							</dl>
						</li>
						<li style="margin-bottom: -20px;">
							<dl class="row">
								<dt class="col-3" style="text-align: center;">
									<img :src="PinJieImg('116.jpg')" style="width: 50px;height: 50px;border-radius: 5px;">
								</dt>
								<dd class="col-9" style="padding-right: 5px;">
									<ul style="margin-top: -5px;">
										<li class="text_14" style="color: #000;">音乐吧</li>
										<li class="text_12 text_color1">欢迎来到音乐吧</li>
									</ul>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
		<!-- 回到顶部 -->
		<div :style="{position: 'fixed', bottom: '50px',right: '50px',display:(ifscro==true?'block':'none')}">
			<a href="javascript:" @click="toTop()" style="display: block;width: 30px;height: 30px;line-height: 30px;text-align: center;background: rgba(255,255,255,.7);border-radius: 15px;color: #FF7700;"><i
				 class="el-icon-upload2"></i></a>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				grdlzc: false, //true为个人信息，false为登录注册
				user: '', //用户信息暂存
				FollPeoSum: 0, //登录用户关注数
				FollPeoNum: 0, //登录用户粉丝数
				PostUserSum: 0, //登录用户动态数
				UserHotL:[],//所有热度用户
				UserHotData: [], //热门用户top5
				ifscro: false, //右边内容是否固定
			}
		},
		methods: {
			//验证用户是否登录并显示个人信息或登录注册信息
			UserAccount() {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					this.grdlzc = true
				} else {
					this.grdlzc = false
				}
			},

			//用户登录
			Denlu() {
				this.$emit('user_dl')
			},

			//用户注册
			Zhuce() {
				this.$emit('user_zc')
			},

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},

			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
			},

			//获取登录用户信息
			async SeUserData() {
				const res = await this.$http.post('Distribution/SeUserData')
				this.user = res.data.data
				this.SeUserFFP()
				this.$refs['Three'].SeUserData()
			},

			//获取登录用户关注、粉丝、动态数
			async SeUserFFP() {
				const res = await this.$http.post('Distribution/SeUserFppSum', {
					userid: this.user.Id
				})
				if (res.data.jg) {
					this.FollPeoSum = res.data.fps
					this.FollPeoNum = res.data.fpn
					this.PostUserSum = res.data.pus
				}
			},

			//获取热门用户top5
			async SeUserHot() {
				const res = await this.$http.post('Distribution/SeUserHot')
				this.UserHot = res.data.data
				this.UserHot = sortByKey(this.UserHot,'Sum')
				this.UserHot.reverse()
				this.UserHotData[0] = this.UserHot[0]
				this.UserHotData[1] = this.UserHot[1]
				this.UserHotData[2] = this.UserHot[2]
				this.UserHotData[3] = this.UserHot[3]
				this.UserHotData[4] = this.UserHot[4]
			},
			
			//滚轮监听事件
			menu() {
				this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
				if (this.scroll >= 400) {
					this.ifscro = true
				} else {
					this.ifscro = false
				}
			},
			mounted() {
				window.addEventListener('scroll', this.menu)
			},
			
			//回到顶部
			toTop() {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			},
		},
		created() {
			this.SeUserHot();
			//页面加载时判断用户是否登录
			this.UserAccount();
			this.SeUserData();
			
			//滚轮监听事件
			this.menu()
			this.mounted()
		}
	}

	// 数组对象方法排序：
	function sortByKey(array, key) {
		return array.sort(function(a, b) {
			var x = a[key];
			var y = b[key];
			return ((x < y) ? -1 : ((x < y) ? 1 : 0));
		});
	}
</script>

<style>
	* {
		margin: 0px;
		padding: 0px;
		text-decoration: none;
		list-style: none;
	}

	a:hover {
		text-decoration: none;
	}

	.post_data {
		min-width: 750px;
		max-width: 750px;
	}

	.right_data {
		min-width: 260px;
		max-width: 260px;
		height: 800px;
		position: fixed;
	}

	.mkback {
		background: #fff;
		border-radius: 15px;
	}

	.grxx_fd {
		border-left: 1px solid #CCCCCC;
	}

	.gz-fs-dt {
		margin: 0 0 -6px 0;
	}

	.grxx_xinxi {
		background: #444;
		padding-top: 20px;
		border-radius: 15px 15px 0 0;
	}

	.tj_users {
		padding: 10px;
		border-bottom: 1px solid #dddddd;
	}

	.tj_users_data {
		width: 90%;
		margin: 0 auto;
	}

	.tj_users_data>li {
		padding: 5px 0;
	}

	.grxx_dl {
		height: 26px;
		line-height: 26px;
		display: block;
		background: rgba(255, 94, 35, .15);
		border-radius: 15px;
		color: #ff5d23;
		margin-left: 10px;
	}

	.grxx_dl:hover {
		color: #fff;
		background: #ff5d23;
		transition: all 0.25s 0s;
	}

	.ipt {
		font-family: "microsoft yahei", Arial;
		transition: border-color .3s ease 0s;
		outline: 0;
	}

	.ipt-style {
		outline: none;
		border: none;
		width: 100%;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
		padding-left: 4px;
		border-bottom: 1px solid #e9e9e9;
	}

	.el-dialog__title {
		font-weight: 600;
	}
</style>
