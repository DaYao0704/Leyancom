<template>
	<div>
		<div class="myspace">
			<div class="spa_top">
				<div class="space_back backsp" style="background: url(http://localhost:8082/Images/BackImg/100.jpg);border-radius: 10px;margin-top: 10px;">
					<dl>
						<dt>
							<div style="width: 100%;text-align: center;padding-top: 30px;">
								<div style="margin: 0 auto;width: 102px;border: 4px solid rgba(255,255,255,0.3);border-radius: 51px;">
									<div style="width: 94px;border: 2px solid #fff;border-radius: 47px;">
										<img :src="PinJieUserImg(user.UserImg)" style="width: 90px;height: 90px;border-radius: 45px;object-fit: cover;">
									</div>
								</div>
							</div>
						</dt>
						<dd style="font-size: 20px;color: #fff;font-weight: 600;margin-bottom: 0px;" v-text="user.UserName"></dd>
						<dd class="text_14" style="color: #fff;" v-text="user.UserText"></dd>
					</dl>
				</div>

				<div class="backsp" style="margin-top: 10px;">
					<ul class="row" style="width: 70%;margin: 0 auto;height: 40px;line-height: 40px;">
						<li class="col-4">
							<router-link :to="'/myspace/myhomepage/'+id" :class="spa_title==0?'space_title_click':'space_title'">
								<span @click="spa_title_click(0)">主页</span>
							</router-link>
						</li>
						<li class="col-4">
							<router-link :to="'/myspace/myalbum/'+id" :class="spa_title==1?'space_title_click':'space_title'">
								<span @click="spa_title_click(1)">相册</span>
							</router-link>
						</li>
						<li class="col-4">
							<router-link :to="'/myspace/myfollow/'+id" :class="spa_title==2?'space_title_click':'space_title'">
								<span @click="spa_title_click(2)">关注</span>
							</router-link>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<router-view></router-view>
			</div>
		</div>
		<!-- 底部版权栏 -->
		<div style="background-color: #fff;width: 100%;height: 50px;line-height: 50px;margin-top: 10px;position: fixed;bottom: 0;text-align: center;">
			<a href="https://beian.miit.gov.cn/" target="_blank" class="text_12 text_color1">湘 ICP 备 2020019579 号 -1</a>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['id'],
		data() {
			return {
				spa_title: 0,
				user: [],
			}
		},
		methods: {
			//主页、相册切换效果
			spa_title_click(zhi) {
				this.spa_title = zhi
			},

			//获取指定用户信息
			async SeUser() {
				const res = await this.$http.post('Distribution/SeUserid', {
					userid: this.id
				})
				this.user = res.data.data
			},

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},

			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
			},
		},
		mounted() {
			this.SeUser()
		}
	}
</script>

<style>
	.myspace {
		width: 1000px;
		height: 18.75rem;
		margin: 0 auto;
		text-align: center;
	}

	.spa_top {
		position: fixed;
		top: 0;
		z-index: 10;
		padding-bottom: 10px;
		background-image: url(../assets/1.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.spa_content {
		margin-top: 270px;
		position: relative;
	}

	.space_back {
		width: 1000px;
		height: 200px;
	}

	.backsp {
		padding: 0 5px;
		background-color: #fff;
		border-radius: 10px;
	}

	.space_title {
		font-size: 14px;
		color: #535353;
	}

	.space_title:hover {
		color: #ff5d23;
	}

	.space_title_click {
		font-weight: 600;
		font-size: 14px;
		color: #ff5d23;
	}

	.space_title_click:hover {
		color: #ff5d23;
	}
</style>
