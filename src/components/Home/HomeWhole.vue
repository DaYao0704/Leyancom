<template>
	<div class="whole">
		<div class="whole-wai">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="我的乐言" name="first" style="height: 770px;">

					<!-- 我关注的板块 -->
					<div v-if="ifuserbar" class="row" style="width: 93%;margin: 0 auto;">
						<div v-for="(itme,index) in userfollbarlist" :key="index" class="myfoll_user">
							<dl class="row" style="margin-bottom: -10px;padding-top: 10px;">
								<router-link :to="'/home/whdata/'+itme.Id" class="row">
									<dt><img :src="PinJieImg(itme.BarImg)" style="width: 60px;height: 60px;border-radius: 7px;"></dt>
									<dd>
										<ul style="width: 120px;margin-left: 5px;margin-bottom: 0;height: 74px;">
											<li style="font-size: 14px;font-weight: 600;color: #535353;" v-text="itme.BarName"></li>
											<li style="font-size: 12px;color: #666666;" v-text="itme.BarText"></li>
										</ul>
									</dd>
								</router-link>
								<dd style="margin-left: 5px;">
									<el-popconfirm title="确定取消关注？" @onConfirm="DeFollBar(itme.Id)">
										<a href="javascript:" class="myfoll_a" slot="reference">取消关注</a>
									</el-popconfirm>
								</dd>
							</dl>
						</div>
					</div>
					<div v-else class="whole-center">
						<div style="padding-top: 200px;">
							<img src="../../assets/1f.png" />
						</div>
						<span class="text_14 text_color1">暂时没有数据</span>
					</div>

				</el-tab-pane>
				<el-tab-pane label="全部乐言" name="third" style="height: 770px;">

					<!-- 全部板块 -->
					<div v-if="ifbar" class="row" style="width: 99%;margin: 0 auto;">
						<div v-for="(itme,index) in barlistalldata" :key="index" class="myfoll_user" style="margin-left: 47px;">
							<dl class="row" style="margin-bottom: -10px;padding-top: 10px;">
								<router-link :to="'/home/whdata/'+itme.Id" class="row">
									<dt><img :src="PinJieImg(itme.BarImg)" style="width: 60px;height: 60px;border-radius: 7px;"></dt>
									<dd>
										<ul style="width: 120px;margin-left: 5px;margin-bottom: 0;height: 74px;">
											<li style="font-size: 14px;font-weight: 600;color: #535353;" v-text="itme.BarName"></li>
											<li style="font-size: 12px;color: #666666;" v-text="itme.BarText"></li>
										</ul>
									</dd>
								</router-link>
								<dd style="margin-left: 5px;">
									<a href="javascript:" class="myfoll_a" @click="InBar(itme.Id)" slot="reference">关注</a>
								</dd>
							</dl>
						</div>
					</div>
					<div v-else class="whole-center">
						<div style="padding-top: 200px;">
							<img src="../../assets/1f.png" />
						</div>
						<span class="text_14 text_color1">暂时没有数据</span>
					</div>

				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				userfollbarlist: [], //存放用户关注板块
				barlistalldata: [], //存放全部板块
				user: [], //用户信息暂存
				ifuserbar: false, //false为用户无关注
				ifbar: false, //false为无板块信息
				iftiaozuan: false, //用户是否登录
			}
		},
		methods: {
			handleClick(tab, event) {},

			//获取登录用户信息
			async SeUserData() {
				const res = await this.$http.post('Distribution/SeUserData')
				this.user = res.data.data
				this.UserFollBar()
			},

			//获取用户关注板块方法
			async UserFollBar() {
				const res = await this.$http.post('Index/UserFollBar', {
					userid: this.user.Id
				})
				this.userfollbarlist = res.data.data
				if (res.data.data != null && res.data.data != '') {
					this.ifuserbar = true
				} else {
					this.ifuserbar = false
				}
			},

			//获取所有板块
			async SeBarAll() {
				const res = await this.$http.post('Index/SeBarAll')
				this.barlistalldata = res.data.data
				if (res.data.data != null && res.data.data != '') {
					this.ifbar = true
				} else {
					this.ifbar = false
				}
			},

			//取消关注板块
			async DeFollBar(id) {
				const res = await this.$http.post('Index/DeFollBar', {
					userid: this.user.Id,
					barid: id
				})
				if (res.data.data) {
					this.open2("已取消关注!")
					this.UserFollBar()
				} else {
					this.open4("操作异常，请反馈管理员!")
				}
			},

			//关注板块
			async InBar(id) {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					const res = await this.$http.post('Index/InBar', {
						userid: this.user.Id,
						barid: id
					})
					console.log(res.data.data)
					if (res.data.data) {
						this.open2("已关注!")
						this.UserFollBar()
					} else {
						this.open3("已关注，重复操作!")
					}
				} else {
					this.open3("请登录!")
				}
			},

			//单击板块跳转前判断
			// ifuserdl() {
			// 	if (this.user != null) {
			// 		this.iftiaozuan = true
			// 	} else {
			// 		this.iftiaozuan = false
			// 		this.open4("请先登录!")
			// 	}
			// },

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},

			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
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
		},
		mounted() {
			this.SeUserData()
			this.SeBarAll()
		}
	}
</script>

<style>
	.whole {
		border-radius: 15px;
		background-color: #fff;
		margin-right: 10px;
	}

	.whole-wai {
		padding: 10px 10px;
	}

	.whole-center {
		text-align: center;
		margin: 0 auto;
	}
</style>
