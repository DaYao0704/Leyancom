<template>
	<div class="home">
		<div class="top">
			<div class="top_cdl">
				<ul class="row cdl_ul">
					<li class="col-5">
						<ul class="row" style="text-align: center;">
							<li class="col-3">
								<router-link to="/home/three/hot"><img src="../assets/webLogo.jpg"></router-link>
							</li>
							<li class="col-3">
								<router-link to="/home/three/hot">首页</router-link>
							</li>
							<li class="col-3">
								<a href="https://www.baidu.com" target="_blank">发现</a>
							</li>
						</ul>
					</li>
					<li class="col-3"></li>
					<li class="col-4">
						<ul>

							<!-- 用户信息、登录注册 -->
							<li style="text-align: right;padding-right: 40px;">
								<el-dropdown v-if="dhl_dlzc" placement="bottom">
									<span class="el-dropdown-link">
										<img :src="PinJieUserImg(this.user.UserImg)" style="width: 40px;height: 40px; border-radius: 20px;object-fit: cover;" />
									</span>
									<el-dropdown-menu slot="dropdown">
										<ul style="width: 240px;">
											<li style="width: 88%;margin: 0 auto;">
												<dl class="row">
													<dt class="col-3">
														<router-link :to="'/myspace/myhomepage/'+this.user.Id" target="_blank">
															<img :src="PinJieUserImg(this.user.UserImg)" style="width: 60px;height: 60px; border-radius: 30px;object-fit: cover;" />
														</router-link>
													</dt>
													<dd class="col-6" style="height: 60px;line-height: 60px;padding-left: 10px;" v-text="this.user.UserName"></dd>
													<dd class="col-3" style="height: 60px;line-height: 60px;"><a href="" class="text_14 text_color1 dhl_a"
														 @click="DeToken"><i class="iconfont icon-tuichu"></i>退出</a></dd>
												</dl>
											</li>
											<li style="width: 96%;margin: 0 auto;">
												<hr />
											</li>
											<li style="width: 90%;margin: 0 auto;">
												<ul class="row" style="text-align: center;">
													<li class="col-6">
														<router-link :to="'/myinform/'+this.user.Id" style="display: block;" class="dhl_a" target="_blank">
															<ul>
																<li><img src="../assets/icon/gerenzhongxin.png" style="width: 46px;"></li>
																<li>个人中心</li>
															</ul>
														</router-link>
													</li>
													<li class="col-6">
														<router-link :to="'/myspace/myhomepage/'+this.user.Id" style="display: block;" class="dhl_a" target="_blank">
															<ul>
																<li><img src="../assets/icon/qqkongjian.png" style="width: 46px;"></li>
																<li>我的空间</li>
															</ul>
														</router-link>
													</li>
												</ul>
											</li>
										</ul>
									</el-dropdown-menu>
								</el-dropdown>
								<el-dropdown v-else placement="bottom">
									<span class="el-dropdown-link">
										<img src="../assets/1.png" style="width: 40px;height: 40px; border-radius: 20px;" />
									</span>
									<el-dropdown-menu slot="dropdown">
										<ul style="width: 300px;">
											<li style="width: 80%;margin: 0 auto;" class="text_14 text_color1">
												登录之后可以
											</li>
											<li style="width: 90%;margin: 0 auto;">
												<ul class="row" style="text-align: center;padding: 15px 0;">
													<li class="col-4">
														<dl>
															<dt><img src="../assets/icon/pinglun.png" style="width: 30px;"></dt>
															<dd class="text_14 text_color1">发表评论</dd>
														</dl>
													</li>
													<li class="col-4">
														<dl>
															<dt><img src="../assets/icon/navicon-hdbk.png" style="width: 30px;"></dt>
															<dd class="text_14 text_color1">好友互动</dd>
														</dl>
													</li>
													<li class="col-4">
														<dl>
															<dt><img src="../assets/icon/chakantieziguanzhu.png" style="width: 30px;"></dt>
															<dd class="text_14 text_color1">关注乐友</dd>
														</dl>
													</li>
												</ul>
											</li>
											<li class="row" style="width: 90%;margin: 0 auto;text-align: center;">
												<a href="javascript:void(0)" @click="DlZc('2')" class="col-5 text_14 grxx_dl">立即登录</a>

												<el-dialog append-to-body :close-on-click-modal="false" title="安全登录" width="400px" :visible.sync="outerVisible">
													<div>
														<ul>
															<li>
																<input type="text" class="ipt ipt-style" v-model="Username" placeholder="账号/手机号/邮箱" />
															</li>
															<li>
																<input type="password" show-password class="ipt ipt-style" v-model="Userpwd" placeholder="密码" />
															</li>
														</ul>
													</div>
													<div style="text-align: center;padding: 20px 0;">
														<a @click="Denlu" href="javascript:void(0)" class="grxx_zc" style="border-radius: 7px;height: 40px;line-height: 40px;width: 300px;margin: 0 auto;">登录</a>
													</div>
													<div style="text-align: center;"><a href="javascript:void(0)" class="text_14_col1" @click="DlZc('1')">快速注册</a></div>
												</el-dialog>

												<div class="col-1"></div>
												<a href="javascript:void(0)" @click="DlZc('1')" class="col-5 text_14 grxx_zc">快速注册</a>
												<el-dialog width="400px" title="快速注册" :close-on-click-modal="false" :visible.sync="innerVisible"
												 append-to-body>
													<div>
														<ul>
															<li>
																<input type="text" class="ipt ipt-style" v-model="Username" placeholder="请输入手机号码" @blur="IfPhone" />
															</li>
															<li>
																<input type="password" show-password class="ipt ipt-style" v-model="Userpwd" placeholder="输入密码" @blur="IfPwd" />
															</li>
															<li class="row" style="border-bottom: 1px solid #e9e9e9;">
																<div class="col-8">
																	<input type="password" show-password class="ipt ipt-style" v-model="Useryzm" placeholder="输入验证码" style="border: none;width: 100%;" />
																</div>
																<div class="col-4" style="text-align: right;">
																	<a v-if="isShowGetCode" href="javascript:void(0)" @click="getIdentifyCode" class="dl_yzm">获取验证码</a>
																	<a v-else href="javascript:void(0)" class="dl_yzm_sx">{{countdown}}s后可重试</a>
																</div>
															</li>
														</ul>
													</div>
													<div style="padding: 20px 0;">
														<a href="javascript:void(0)" class="grxx_zc" style="border-radius: 7px;height: 40px;line-height: 40px;width: 300px;margin: 0 auto;text-align: center;"
														 @click="ZhuCe">注册</a>
														<div class="text_12" style="width: 80%;margin: 0 auto;padding-top: 10px;">
															<el-checkbox v-model="Yhxychecked"></el-checkbox>已阅读并同意 <a class="user_xieyi" href="/">《隐私权政策》</a> <a
															 class="user_xieyi" href="/">《用户注册协议》</a> 和 <a class="user_xieyi" href="/">《用户阳光行为规范》</a>
														</div>
													</div>
												</el-dialog>
											</li>
										</ul>
									</el-dropdown-menu>
								</el-dropdown>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="left_wai">

			<!-- 左导航栏 -->
			<div class="left_div">
				<div style="position: fixed;width:180px;">
					<ul>
						<li v-on:click="dhlclick(1)">
							<router-link class="daohan_a text_14" :class="{'dhlback':dhlid==1?true:false}" :to="'/home/three/follow/'+user.Id"><i class="iconfont icon-gz"></i>&nbsp;我关注的</router-link>
						</li>
						<li v-on:click="dhlclick(2)">
							<router-link class="daohan_a text_14" :class="{'dhlback':dhlid==2?true:false}" :to="'/home/three/fabulous/'+user.Id"><i
								 class="iconfont icon-zan"></i>&nbsp;我赞过的</router-link>
						</li>
						<li v-on:click="dhlclick(3)">
							<router-link class="daohan_a text_14" :class="{'dhlback':dhlid==3?true:false}" :to="'/home/three/collection/'+user.Id"><i
								 class="iconfont icon-guanzhu"></i>&nbsp;我收藏的</router-link>
						</li>
					</ul>
					<hr />
					<ul>
						<li v-on:click="dhlclick(4)">
							<router-link class="daohan_a text_14" :class="{'dhlback':dhlid==4?true:false}" to="/home/three/hot"><i class="iconfont icon-remen"></i>&nbsp;热门推荐</router-link>
						</li>
					</ul>
					<hr />
					<ul>
						<li v-on:click="dhlclick(5)">
							<router-link class="daohan_a text_14" :class="{'dhlback':dhlid==5?true:false}" to="/home/whole"><i class="iconfont icon-quanbugengduo"></i>&nbsp;全部板块</router-link>
						</li>
					</ul>
				</div>
			</div>

			<!-- 中间内容部分 -->
			<div class="cont">
				<router-view ref="Home" @func="UserAccount" @user_dl="DlZc('2')" @user_zc="DlZc('1')" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dhlid: 4,
				Username: '', //登录账户
				Userpwd: '', //登录密码
				Useryzm: '', //注册验证码
				outerVisible: false, //登录对话框
				innerVisible: false, //注册对话框
				dhl_dlzc: false, //用户是否登录
				Yhxychecked: false, //用户协议
				user: '', //用户信息暂存
				Yzma: '', //服务端MD5加密验证码
				Ifphones: null, //用于检验手机号码是否可用
				Ifuserpwd: null, //用于检验密码是否可用

				countdown: 60, //---------验证
				timer: '', //-------------码倒
				isShowGetCode: true, //---计时
			}
		},

		methods: {
			//左侧菜单栏切换效果
			dhlclick(id) {
				this.dhlid = id
			},

			//这是一条消息提示
			open1(zhi) {
				this.$message({
					showClose: true,
					message: zhi
				});
			},
			//这是一条成功消息
			open2(zhi) {
				this.$message({
					showClose: true,
					message: zhi,
					type: 'success'
				});
			},
			//这是一条警告消息
			open3(zhi) {
				this.$message({
					showClose: true,
					message: zhi,
					type: 'warning'
				});
			},
			//这是一条错误消息
			open4(zhi) {
				this.$message({
					showClose: true,
					message: zhi,
					type: 'error'
				});
			},

			//清除token,退出登录
			DeToken() {
				sessionStorage.removeItem("token");
				this.UserAccount()
				this.$refs['Home'].UserAccount()
				this.outerVisible = false
				this.innerVisible = false
			},

			//用户登录
			async Denlu() {
				const res = await this.$http.post('Distribution/Denlu', {
					name: this.Username,
					pwd: this.Userpwd
				})

				if (res.data.data.zhi) {
					window.sessionStorage.setItem("token", res.data.data.token);
					this.outerVisible = false
					this.innerVisible = false
					this.user = res.data.data.users
					this.UserAccount()
					this.$refs['Home'].UserAccount()
					this.$refs['Home'].SeUserData()
					this.open2('登录成功!欢迎回来~')
				} else {
					this.open4('登录失败!，请验证账号密码是否正确!')
				}
			},

			//获取登录用户信息
			async SeUserData() {
				const res = await this.$http.post('Distribution/SeUserData')
				this.user = res.data.data
			},

			//验证用户是否登录并显示个人信息或登录注册信息
			UserAccount() {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					this.dhl_dlzc = true
				} else {
					this.dhl_dlzc = false
				}
			},

			//验证码状态切换
			getIdentifyCode() {
				this.isShowGetCode = false
				this.countDown()
				this.Yzm(this.Username)
			},

			//验证码倒计时
			countDown() {
				const self = this
				this.timer = setInterval(() => {
					self.countdown--
					if (self.countdown === 0) {
						clearInterval(self.timer)
						self.countdown = 60
						self.isShowGetCode = true
					}
				}, 1000)
			},

			//用户获取验证码
			async Yzm(zhi) {
				const res = await this.$http.post('Distribution/Yzm', {
					haoma: zhi
				})
				this.Yzma = res.data.data
			},

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},

			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
			},

			//注册、登录切换
			DlZc(zhi) {
				this.Username = ''
				this.Userpwd = ''
				if (zhi == "1") {
					this.innerVisible = true
				} else {
					this.outerVisible = true
				}
			},

			//验证手机号码是否可以使用
			async IfPhone() {
				//使用表达式判断手机号码是否符合规范
				var mobile_mode = /^1[3456789]\d{9}$/;
				if (mobile_mode.test(this.Username)) {
					const res = await this.$http.post('Distribution/IfUserPhone', {
						phone: this.Username
					})
					if (res.data.jg) {
						this.Ifphones = true
						this.open2('手机号码可用！')
					} else {
						this.Ifphones = false
						this.open3('手机号码重复！')
					}
				} else {
					this.open4('手机号码格式错误！')
				}
			},

			//验证密码是否符合规范
			IfPwd() {
				var passwordreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
				if (!passwordreg.test(this.Userpwd)) {
					this.Ifuserpwd = false
					this.open4('密码必须由数字、字母组成,请输入8-16位！')
				} else {
					this.Ifuserpwd = true
				}
			},

			//用户注册
			async ZhuCe() {
				if (this.Yhxychecked) {
					if (this.Ifphones) {
						if (this.Ifuserpwd) {
							if (this.Yzma == this.$md5(this.Useryzm).toUpperCase()) {

								const res = await this.$http.post('Distribution/Zhuce', {
									userphone: this.Username,
									userpwd: this.Userpwd
								})
								if (res.data.jg) {
									//注册成功直接登录
									window.sessionStorage.setItem("token", res.data.token);
									this.outerVisible = false
									this.innerVisible = false
									this.user = res.data.users
									this.UserAccount()
									this.$refs['Home'].UserAccount()
									this.$refs['Home'].SeUserData()
									this.open2('注册成功!欢迎加入~')

								} else {
									this.open3('服务器异常，请反馈管理员!')
								}

							} else {
								this.open4('验证码错误!')
							}
						} else {
							this.open4('密码格式错误，请重新输入!')
						}
					} else {
						this.open4('手机号码不可用!')
					}
				} else {
					this.open3('请勾选用户协议!')
				}
			},

		},
		mounted() {
			this.UserAccount();
			this.SeUserData();
		},
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

	.dhl_a {
		color: #000000;
		font-size: 14px;
	}

	.dhl_a:hover {
		color: #ff5d23;
	}

	/* 清除bootstrap间隔 */
	[class*="col-"] {
		padding-left: 0;
		padding-right: 0;
	}

	.row {
		margin-left: 0;
		margin-right: 0;
	}

	.container-fluid {
		margin: 0;
		padding: 0;
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

	.post_a {
		display: block;
		width: auto;
		height: auto;
	}

	.PinLunzs {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 15px;
		margin: 0 auto;
		margin: 10px 0;
		padding: 6px 0;
	}

	.daohan_a {
		display: block;
		padding: 5px 0px 5px 30px;
		color: rgb(244, 244, 244);
	}

	.daohan_a:hover {
		color: rgb(244, 244, 244);
		text-decoration: none;
		background: rgba(255, 255, 255, 0.2);
	}

	.cont {
		position: relative;
		right: 0;
		width: 1020px;
		margin-left: 180px;
	}

	.dhlback {
		background: rgba(255, 255, 255, 0.2);
	}

	.left_wai {
		padding-top: 75px;
		background: rgba(128, 128, 128, 0.3);
		min-width: 1200px;
		width: 50%;
		margin: 0 auto;
	}

	.left_div {
		position: relative;
		min-width: 180px
	}

	.top {
		position: fixed;
		width: 100%;
		height: 65px;
		background: #FFFFFF;
		z-index: 99;
	}

	.top_cdl {
		min-width: 1200px;
		margin: 0 auto;
		width: 50%;
	}

	.cdl_ul {
		line-height: 65px;
		height: 65px;
	}

	.cdl_ul a {
		display: block;
		color: #000000;
		height: 65px;
	}

	.cdl_ul a:hover {
		color: orange;
	}

	.grxx_zc {
		height: 26px;
		line-height: 26px;
		display: block;
		background: linear-gradient(214deg, #ffaf00, #ff5d23);
		border-radius: 15px;
		color: #fff;
	}

	.grxx_zc:hover {
		color: #fff;
		background: linear-gradient(214deg, #ff5d23, #ffaf00);
	}

	.dl_yzm {
		color: #ff5d23;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
		display: block;
	}

	.dl_yzm:hover {
		color: #ff5d23;
	}

	.dl_yzm_sx {
		color: #999999;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
		display: block;
	}

	.dl_yzm_sx:hover {
		color: #999999;
	}

	.user_xieyi {
		font-size: 12px;
		color: #ff5d23;
	}

	.user_xieyi:hover {
		color: #ff5d23;
	}
</style>
