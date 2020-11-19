<template>
	<div class="backsp" style="height: 636px;margin-top: 270px;text-align: left;">
		<div v-if="follnull" class="row" style="width: 93%;margin: 0 auto;">
			<div v-for="(itme,index) in folllist" :key="index" class="myfoll_user">
				<dl class="row" style="margin-bottom: -10px;padding-top: 10px;">
					<dt><img :src="PinJieUserImg(itme.UserImg)" style="width: 60px;height: 60px;border-radius: 7px;"></dt>
					<dd>
						<ul style="width: 120px;margin-left: 5px;margin-bottom: 0;height: 74px;">
							<li style="font-size: 14px;font-weight: 600;color: #535353;" v-text="itme.UserName"></li>
							<li style="font-size: 12px;color: #666666;" v-text="itme.UserText"></li>
						</ul>
					</dd>
					<dd v-if="UserData.Id==id" style="margin-left: 5px;">
						<el-popconfirm title="确定取消关注？" @onConfirm="DeFoll(itme.Id)">
							<a href="javascript:" class="myfoll_a" slot="reference">取消关注</a>
						</el-popconfirm>
					</dd>
				</dl>
			</div>
		</div>
		<div v-else style="height: 600px;line-height: 600px;text-align: center;">
			<label>暂无关注</label>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['id'],
		data() {
			return {
				folllist: [], //存放用户关注的人
				follnull: false, //状态切换
				UserData: [], //存放登录用户信息
			}
		},
		methods: {
			//获取指定用户关注的所有人
			async SeFollData() {
				const res = await this.$http.post('Distribution/SeFollData', {
					userid: this.id
				})
				this.folllist = res.data.data

				if (res.data.data != null && res.data.data != "") {
					this.follnull = true
				} else {
					this.follnull = false
				}
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
				this.UserData = res.data.data
			},

			//取消关注
			async DeFoll(userid) {
				const res = await this.$http.post('Distribution/DeFoll', {
					userida: this.id,
					useridb: userid
				})
				if (res.data.data) {
					this.SeFollData()
					this.open2("成功取消关注!")
				} else {
					this.open4("取消关注失败，请反馈管理员!")
				}
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
			this.SeFollData()
			this.SeUserData()
		}
	}
</script>

<style>
	.myfoll_user {
		padding: 0 10px;
		margin: 20px 0 0 16px;
		border: 1px solid rgba(0, 0, 0, 0);
	}

	.myfoll_user:hover {
		border: 1px solid #eee;
		border-radius: 10px;
		box-shadow: 0 0 10px #bbb;
	}

	.myfoll_a {
		height: 26px;
		line-height: 26px;
		display: block;
		font-size: 12px;
		color: #ff5d23;
		margin-top: 17px;
		padding: 0 8px;
		border-radius: 13px;
		background-color: rgba(255, 93, 35, .15);
	}

	.myfoll_a:hover {
		color: #fff;
		background-color: #ff5d23;
	}
</style>
