<template>
	<div style="padding-right: 10px;min-width: 1020px;max-width: 1020px;">

		<!-- 板块信息 -->
		<div style="position: relative;">
			<div class="barback" :style="{'background-image': PinJieBack(BarData.BarBack)}"></div>
			<div style="height: 50px;width: 100%;background: #fff;border-radius: 0 0 10px 10px;"></div>
			<div style="position: absolute;top: 115px;left: 20px;">
				<dl class="row">
					<dt class="bar-barimgbor">
						<img class="bar-barimg" :src="PinJieImg(BarData.BarImg)">
					</dt>
					<dd style="margin-left: 20px;">
						<ul style="padding-top: 10px;">
							<li><span class="bar-bartitlefont" v-text="BarData.BarName"></span></li>
							<li style="padding: 5px 0;"><span class="bar-bartextfont" v-text="BarData.BarText"></span></li>
							<li class="bar-barjsfont">
								成员：<span v-text="ForumSum" class="bar-barsumcolor" style="margin-right: 30px;"></span>帖子：
								<span v-text="PostSum" class="bar-barsumcolor"></span>
							</li>
						</ul>
					</dd>
				</dl>
			</div>
			<div style="position: absolute;top: 208px;left: 330px;">
				<a v-if="ifforum" class="bar-forumfont" href="javascript:" @click="DeForum">已关注</a>
				<a v-else class="bar-forumfont" href="javascript:" @click="InForum">加入</a>
			</div>
		</div>

		<div class="bar-back-top">
			<ul class="row bar-daohan">
				<li class="col-1"><a class="bar-daohan_a_click" href="javascript:">看帖</a></li>
				<li class="col-1"><a class="bar-daohan_a" href="javascript:">精华</a></li>
				<li class="col-10" style="position: relative;">
					<a class="bar-forumfont" style="position: absolute;right: 0px;top: 8px;" @click="toBottom(step)" href="javascript:">发帖</a>
				</li>
			</ul>
		</div>

		<div class="row" style="margin-top: 10px;width: 100%;height: auto;position: relative;">
			<div class="col-9">

				<!-- 帖子架构 -->
				<div v-if="ifpostdata" style="margin: -10px 10px 0 0;">
					<div v-for="item in postdata" :key="item.index">
						<!-- 帖子内容部分 -->
						<div>
							<div class="mkback" style="margin-top: 10px;">
								<div style="width: 100%;margin: 0 auto;padding-top: 20px;">
									<dl class="row" style="margin-bottom: 0px;">
										<dt class="col-1" style="padding-left: 20px;">
											<router-link :to="'/myspace/myhomepage/'+item.Users.Id" target="_blank">
												<img :src="PinJieUserImg(item.Users.UserImg)" style="width: 50px;height: 50px;border-radius: 25px;">
											</router-link>
										</dt>
										<dd class="col-11" style="padding: 0 20px;">
											<ul>
												<li><a href="/" class="text_color2 pl_text3" target="_blank"><b v-text="item.Users.UserName"></b></a></li>
												<li class="text_12 text_color1">
													<a class="text_12 text_color1 pl_text3" href="javascript:void(0)" v-text="item.PostTime"></a>
													发布于
													<a class="text_12 pl_text2 pl_text3" href="javascript:void(0)" v-text="item.Bar.BarName"></a>
												</li>
												<li style="font-weight: 500;padding: 5px 0;" v-html="item.PostTitle.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></li>
												<li class="text_14 posttext_color">{{IfPostText(item.Id, item.PostText)}}</li>
												<li>
													<a href="javascript:void(0)" @click="IfSeTextClick(item.Id)" class="text_14 pl_text3 pl_text2" v-text="IfPostTextzs(item.Id)"></a>
												</li>
												<li style="height: auto;width: 410px;">
													<!-- <img :src="PinJieImg(item.PostImg)" width="500px"> -->
													<el-image v-for="(img,imgindex) in LoadImg(item.PostImg)" :key="imgindex" :fit="'cover'" style="width: 130px; height: 130px; margin-left: 5px;"
													 :src="PinJieImg(img)" :preview-src-list="PreviewImg(item.PostImg)">
													</el-image>
												</li>
											</ul>
										</dd>
										<dd style="border-top: 1px solid #ddd;width: 100%;text-align: center;">
											<ul class="row" style="padding-top: 10px;margin-bottom: 5px;">
												<li class="col-3"><a class="post_cz_a" href="javascript:void(0)" @click="PostShoucang(item.Id)">
														<i class="iconfont icon-guanzhu"></i>收藏</a></li>
												<li class="col-3">
													<a class="post_cz_a post_cz" href="javascript:void(0)" @click="dialogVisible = true">
														<i class="iconfont icon-icon--"></i>转发
													</a>
												</li>

												<el-dialog title="转发到动态" :visible.sync="dialogVisible" width="550px">

													<el-input type="textarea" :rows="5" placeholder="有什么新鲜事想要告诉大家?" v-model="ZhuanfaText" v-on:input="Zhuansum"
													 maxlength="300">
													</el-input>

													<div class="row" style="padding-top: 25px;">
														<div class="col-6" style="text-align: left;height: 40px;line-height: 40px;">
															<!-- <el-popover placement="bottom" width="300" trigger="click">
																  	<Homes @emotion="ZhuanfaEmotion" :height="200"></Homes>
																  	<a href="javascript:" slot="reference" class="pl_text1"><i class="iconfont icon-biaoqing"></i>&nbsp;表情</a>
																  </el-popover> -->
														</div>
														<div class="col-6" style="text-align: right;">
															<span>已输入</span><span v-text="Zhuanfasum"></span><span style="padding-right: 10px;">/300</span>
															<el-button @click="ZhuanfaPost(item.Bar.Id,item.PostText,item.Users.UserName,item.PostImg)">发 布</el-button>
														</div>
													</div>

												</el-dialog>

												<li class="col-3"><a class="post_cz_a post_cz" href="javascript:void(0)" @click="Pincz(item.Id)">
														<i class="iconfont icon-pinglun"></i><span v-text="item.Replysum"></span></a></li>
												<li class="col-3"><a class="post_cz_a post_cz" href="javascript:void(0)" @click="PostDianzang(item.Id)">
														<i class="iconfont icon-zan"></i><span v-text="item.Fabulousum"></span></a></li>
											</ul>
										</dd>
									</dl>
								</div>
							</div>
						</div>

						<!-- 评论区 -->
						<div class="mkback" style="margin-top: 10px;" :style="{display:item.Id!=PinHuibtn?'none':('none'==PinHuiif?'none':'block')}">
							<!-- 用户评论区 -->
							<div>
								<dl class="row" style="width:94%;margin:0 auto;padding-top:16px;margin-bottom: 0px;">
									<dt class="col-1">
										<img class="pl_img" :src="PinJieUserImg(UserData.UserImg)" />
									</dt>
									<dd class="col-11" style="line-height:40px;">
										<el-input placeholder="请输入内容" v-model="pltext" v-on:input="Ysrsum" maxlength="300">
											<el-button slot="append" @click="InRe(item.Id)">评论</el-button>
										</el-input>
									</dd>
									<dd class="col-12">
										<dl class="row" style="width:100%;">
											<dd class="col-12 text_14 text_color1" style="text-align: right;">
												<el-popover placement="bottom" width="300" trigger="click">
													<Homes @emotion="handleEmotion" :height="200"></Homes>
													<a href="javascript:" slot="reference" class="pl_text1"><i class="iconfont icon-biaoqing"></i>&nbsp;表情</a>
												</el-popover>
												<span style="padding-left: 10px;">已输入<span v-text="plsum"></span>/300字</span>
											</dd>
										</dl>
									</dd>
								</dl>
							</div>

							<!-- 评论展示区 -->
							<div v-if="Renullcz">
								<div v-for="(Reitem,index) in Replylist" :key="index">

									<dl class="row" style="width:94%;margin:0 auto;">

										<dt class="col-1"><img style="width:40px;height:40px;border-radius:20px;" :src="PinJieUserImg(Reitem.UserImg)" /></dt>
										<dd class="col-11">
											<dl class="row">
												<dd class="col-12">
													<router-link :to="'/myspace/myhomepage/'+Reitem.UserId" target="_blank" style="color:rgba(255, 106, 0,0.6);"
													 v-text="Reitem.UserName"></router-link>&nbsp;:&nbsp;
													<span style="width: 100%;word-break:break-all;" v-html="Reitem.Text.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></span>
												</dd>
												<dd class="col-2 pl_text1" v-text="Reitem.Time"></dd>
												<dd class="col-8"></dd>
												<dd class="col-1"><a href="javascript:" class="pl_text1" @click="ReDianzang(Reitem.Id,item.Id)"><i class="iconfont icon-zan"></i>&nbsp;<span
														 v-text="Reitem.Fabsum"></span></a></dd>
												<dd class="col-1" style="text-align:center;"><a href="javascript:void(0)" @click="Pinlunsj(index)" class="pl_text1"><i
														 class="iconfont icon-pinglun"></i>&nbsp;回复</a></dd>

												<!-- 用户回复 -->
												<dd class="col-12" :style="{display:index!=Pinlunbtn?'none':('none'==Pinlunif?'none':'block')}">
													<dl class="row" style="margin-bottom: -5px;">
														<dd class="col-1">
															<img style="width:40px;height:40px;border-radius:20px;" :src="PinJieUserImg(UserData.UserImg)" />
														</dd>
														<dd class="col-11">
															<el-input placeholder="请输入内容" v-model="HuiFutext" v-on:input="Huisum" maxlength="300">
																<el-button slot="append" @click="CoHuiFu(item.Id,Reitem.Id,Reitem.UserName)">评论</el-button>
															</el-input>
														</dd>
														<dd class="col-12 text_14 text_color1" style="text-align: right;">
															<el-popover placement="bottom" width="300" trigger="click">
																<Homes @emotion="HuifuEmotion" :height="200"></Homes>
																<a href="javascript:" slot="reference" class="pl_text1"><i class="iconfont icon-biaoqing"></i>&nbsp;表情</a>
															</el-popover>
															<span style="padding-left: 10px;">已输入<span v-text="huifusum"></span>/300字</span>
														</dd>
													</dl>
												</dd>

												<dd class="col-12" style="background: rgba(128, 128, 128,0.2);border-radius:15px;height: auto;">

													<div v-for="(Coitem,coindex) in Covelist[index]" :key="coindex">

														<dl class="row" style="width:90%;margin:0 auto;padding-top:10px;">
															<dt class="col-1" style="height:60px;"><img style="width:40px;height:40px;border-radius:20px;" :src="PinJieUserImg(Coitem.UserImg)" /></dt>
															<dd class="col-11" style="height:auto;">
																<dl class="row" style="margin-bottom:-10px;">
																	<dd class="col-12 row">
																		<a href="javascript:" style="color:rgba(255, 106, 0,0.6);" v-text="Coitem.Usera"></a>
																		&nbsp;回复&nbsp;
																		<a href="javascript:" style="color:rgba(255, 106, 0,0.6);" v-text="Coitem.Userb"></a>
																		&nbsp;:&nbsp;
																		<div style="width: 100%;word-break:break-all;" v-html="Coitem.Text.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></div>
																	</dd>
																	<dd class="col-2 pl_text1" v-text="Coitem.Time"></dd>
																	<dd class="col-7"></dd>
																	<dd class="col-1"><a href="javascript:" @click="CoDianzang(Coitem.Id,item.Id)" class="pl_text1"><i
																			 class="iconfont icon-zan"></i>&nbsp;<span v-text="Coitem.Fabsum"></span></a></dd>
																	<dd class="col-2" style="text-align:center;"><a @click="Huifusj(coindex)" href="javascript:void(0)"
																		 class="pl_text1"><i class="iconfont icon-pinglun"></i>&nbsp;回复</a></dd>
																	<dd class="col-12" :style="{display:coindex!=Huifubtn?'none':('none'==Huifuif?'none':'block')}">

																		<dl class="row">
																			<dd class="col-1">
																				<img style="width:40px;height:40px;border-radius:20px;" :src="PinJieUserImg(UserData.UserImg)" />
																			</dd>
																			<dd class="col-11">
																				<el-input placeholder="请输入内容" v-model="HuiFutext" v-on:input="Huisum" maxlength="300">
																					<el-button slot="append" @click="CoHuiFu(item.Id,Reitem.Id,Coitem.Usera)">评论</el-button>
																				</el-input>
																			</dd>
																			<dd class="col-12 text_14 text_color1" style="text-align: right;">
																				<el-popover placement="bottom" width="300" trigger="click">
																					<Homes @emotion="HuifuEmotion" :height="200"></Homes>
																					<a href="javascript:" slot="reference" class="pl_text1"><i class="iconfont icon-biaoqing"></i>&nbsp;表情</a>
																				</el-popover>
																				<span style="padding-left: 10px;">已输入<span v-text="huifusum"></span>/300字</span>
																			</dd>
																		</dl>
																	</dd>
																</dl>
																<hr />
															</dd>
														</dl>
													</div>
												</dd>
											</dl>
										</dd>
									</dl>
								</div>
							</div>
							<div v-else style="text-align: center;padding-bottom: 15px;">
								<p class="text_14 text_color1">暂无更多评论</p>
							</div>
						</div>
					</div>
				</div>

				<div v-else class="mkback" style="height: 700px;line-height: 700px;margin-right: 10px;text-align: center;">
					<div>
						<span class="text_14 text_color1">暂无收藏动态</span>
					</div>
				</div>

				<!-- 发布动态 -->
				<div class="backsp" style="margin: 10px 10px 10px 0;padding-bottom: 5px;">
					<ul v-if="Ifuser">
						<li>
							<dl class="row" style="margin-left: 5px;padding-top: 10px;">
								<dt style="width: 7%;"><img :src="PinJieUserImg(user.UserImg)" style="width: 40px;height: 40px;border-radius: 20px;"></dt>
								<dd style="width: 92%;">
									<el-input placeholder="在这里输入标题" v-model="posttitle" clearable></el-input>
								</dd>
							</dl>
						</li>
						<li class="row" style="border: 1px solid #ddd;width: 98%;margin: 0 auto;border-radius: 10px;">
							<div class="col-12 row" style="background: rgba(120,120,120,0.1);border-radius: 10px 10px 0 0;height: 40px;">
								<!-- 添加图片按钮 -->
								<div class="col-11">

									<el-popover placement="right" width="400" trigger="click">

										<!-- 图片上传 -->
										<el-upload action="http://modoudou.cn:8082/Index/Imgshanc/" :file-list="imglist" list-type="picture-card"
										 :on-success="ImgUptrue">
											<i slot="default" class="el-icon-plus"></i>
											<div slot="file" slot-scope="{file}">
												<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
												<span class="el-upload-list__item-actions">
													<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
														<i class="el-icon-zoom-in"></i>
													</span>
													<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
														<i class="el-icon-delete"></i>
													</span>
												</span>
											</div>
										</el-upload>
										<el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible">
											<img width="100%" :src="dialogImageUrl" alt="">
										</el-dialog>

										<a class="who-a_hover" slot="reference" href="javascript:"><i class="el-icon-picture-outline"></i></a>
									</el-popover>
								</div>

								<div class="col-1">
									<a class="who-a_button" href="javascript:" @click="InPost">发布</a>
								</div>
							</div>
							<div class="col-12">
								<el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="posttext"></el-input>
							</div>
						</li>
					</ul>
					<div v-else>
						<div class="text_14 text_color1" style="text-align: center;">登录后可发布动态</div>
					</div>
				</div>

			</div>
			<div class="col-3" style="min-width: 252px;max-width: 252px;">
				<div :class="['backsp',ifscro?'bar-you_gx':'']" style="height: 400px;">

					<!-- 贡献排行 -->
					<div class="mkback" style="padding-bottom: 10px;">
						<ul class="row tj_users">
							<li class="col-10 text_14" style="padding: 2px 0 0 2px;"><b>用户贡献榜</b></li>
						</ul>
						<ul v-if="Ifuserhot" class="tj_users_data">
							<li v-for="(item,index) in UserHot" :key="index" class="text_14">
								<ul class="row">
									<li class="col-10">
										<router-link :to="'/myspace/myhomepage/'+item.UserTop.Id" target="_blank" class="text_color2 text_hover">No.<span
											 v-text="(index+1)"></span><span v-text="item.UserTop.UserName"></span></router-link>
									</li>
									<li class="col-2 text_color" style="text-align: right;" v-text="item.HotSum"></li>
								</ul>
							</li>
						</ul>
						<div v-else>
							<div class="text_14 text_color1" style="text-align: center;padding-top: 110px;">暂无用户贡献</div>
						</div>
					</div>

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
	//引入表情包组件
	import Homes from '../Emoji/Emotion.vue'

	export default {
		props: ['id'],
		data() {
			return {
				BarData: [], //板块信息暂存
				PostSum: 0, //动态数量
				ForumSum: 0, //关注数
				scroll: 0, //滚轮滚动像素距离
				ifscro: false, //右边内容是否固定
				UserHot: [], //存放用户贡献排行前十用户
				Ifuserhot: false, //判断是否有用户贡献
				user: '', //登录用户信息暂存
				Ifuser: false, //用户是否登录
				ifforum: true, //判断用户是否关注此板块
				step: { //此数据是控制动画快慢的
					type: Number,
					default: 50
				},
				posttitle: '', //发布动态标题
				posttext: '', //动态内容
				// 图片上传
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				imglist: [], //图片集合

				PostDataSum: 5, //动态加载总数条数
				postdata: [], //存储所有动态
				pltext: '', //用户评论
				plsum: 0, //用户评论输入的字符数
				HuiFutext: '', //用户回复
				huifusum: 0, //用户回复字数
				Replylist: [],
				/*存储指定评论信息*/
				Covelist: [],
				/*存储指定回复信息*/
				Renullcz: false, //评论为空则false，反之true
				UserData: [], //存储用户信息
				dialogVisiblezf: false, //控制转发对话框的显示
				Zhuanfasum: 0, //显示转发字数提示
				ZhuanfaText: '', //转发文本
				ifsetext: false, //是否显示全文
				postidtext: 0, //哪一条动态显示全文
				ifpostdata: false, //是否有收藏

				Huifubtn: 0, //----------------}  设置
				Huifuif: 'none', //------------}  评论
				Pinlunbtn: 0, //---------------}  与
				Pinlunif: 'none', //-----------}  回复
				PinHuibtn: 0, //---------------}  是否
				PinHuiif: 'none', //-----------}  可见
			}
		},
		methods: {
			//获取登录用户信息
			async SeleUserData() {
				const res = await this.$http.post('Distribution/SeUserData')
				this.user = res.data.data
				if (res.data.jg != null && res.data.jg != '') {
					this.Ifuser = true
				} else {
					this.Ifuser = false
				}
				this.IfUserForum()
			},

			//获取板块信息
			async SeIdBar() {
				const res = await this.$http.post('Index/SeIdBar', {
					barid: this.id,
				})
				if (res.data.bardata != false && res.data.bardata != null) {
					this.BarData = res.data.bardata
					this.PostSum = res.data.postsum
					this.ForumSum = res.data.forumsum
				}
			},

			//获取用户是否关注此板块
			async IfUserForum() {
				const res = await this.$http.post('Index/IfUserForum', {
					barid: this.id,
					userid: this.user.Id
				})
				this.ifforum = res.data.data
			},

			//取消关注
			async DeForum() {
				const res = await this.$http.post('Index/DeFollBar', {
					userid: this.user.Id,
					barid: this.id
				})
				if (res.data.data) {
					this.open2("已取消关注!")
					this.IfUserForum()
					this.SeIdBar()
				} else {
					this.open4("操作失败，请反馈管理员!")
				}
			},

			//关注
			async InForum() {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					const res = await this.$http.post('Index/InBar', {
						userid: this.user.Id,
						barid: this.id
					})
					if (res.data.data) {
						this.open2("已关注!")
						this.IfUserForum()
						this.SeIdBar()
					} else {
						this.open4("操作失败，请反馈管理员!")
					}
				} else {
					this.open4("请登录!")
				}
			},

			//获取贡献度最高的10个用户
			async SeBarGonxianHot() {
				const res = await this.$http.post('Index/SeBarGonxianHot', {
					barid: this.id
				})
				var hot = res.data.data
				hot = sortByKey(hot, 'HotSum')
				hot.reverse()
				if (hot != null && hot != false) {
					this.Ifuserhot = true
				}
				try {
					hot.forEach((itm, ind) => {
						this.UserHot[ind] = itm
						if (ind == 9) {
							var a = aaa
							throw new Error("ending")
						}
					})
				} catch (e) {
					console.log(this.UserHot)
				}
			},

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},
			PinJieBack(img) {
				return 'url(http://modoudou.cn:8082/Images/BackImg/' + img + ')'
			},
			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
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

			//回到顶部
			toTop() {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
			},

			//回到底部
			toBottom(i) {
				let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				let scrollHeight = document.documentElement.scrollHeight;
				let rollheight = scrollHeight - clientHeight - 10; //超出窗口上界的值就是底部的scrolTop的值
				document.documentElement.scrollTop += 10;
				if (document.documentElement.scrollTop + 1 <= rollheight) { //之所以+1，可以打印这两个值的日志就知道了，下面+1也是同理
					console.log(rollheight)
					console.log(document.documentElement.scrollTop)
					var c = setTimeout(() => this.toBottom(i), 1); //调用setTimeout是为了“回到底部”这过程不是一瞬间
				} else {
					clearTimeout(c);
				}
			},

			//删除图片
			handleRemove(file) {
				console.log(file);
				for (let i = 0; i < this.imglist.length; i++) {
					if (file.name == this.imglist[i].name) {
						this.imglist.splice(i, 1)
						console.log(this.imglist[i].name)
						console.log(this.imglist)
						break
					}
				}
			},

			//预览图片
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},

			//上传图片成功执行函数
			ImgUptrue(response, file, fileList) {
				this.imglist = fileList
			},

			//发布动态
			async InPost() {
				var imgs = ''
				this.imglist.forEach((itm, ind) => {
					imgs += itm.name + ','
				})
				const res = await this.$http.post('Index/InPost', {
					userid: this.user.Id,
					barid: this.id,
					posttitle: this.posttitle,
					posttext: this.posttext,
					postimg: imgs
				})
				this.posttitle = '';
				this.posttext = '';
				this.imglist = '';
				if (res.data.data) {
					this.open2("动态发布成功!")
					this.SeBarGonxianHot()
					this.SePostData()
				} else {
					this.open4("操作失败，请反馈管理员!")
				}
			},

			//用户单击展开、收起事件
			IfSeTextClick(val) {
				this.ifsetext = !this.ifsetext
				if (this.ifsetext) {
					this.postidtext = val
				} else {
					this.postidtext = 0
				}
			},

			//刷新用户评论的字符长度
			Ysrsum() {
				this.plsum = this.pltext.length
			},

			//刷新用户转发的字符长度
			Zhuansum() {
				this.Zhuanfasum = this.ZhuanfaText.length
			},

			//刷新用户回复的字符长度
			Huisum() {
				this.huifusum = this.HuiFutext.length
			},

			//将选中的表情插入评论
			handleEmotion(i) {
				this.pltext += i
			},

			//将选中的表情插入转发内容
			ZhuanfaEmotion(i) {
				this.ZhuanfaText += i
			},

			//将选中的表情插入回复
			HuifuEmotion(i) {
				this.HuiFutext += i
			},

			// 将匹配结果替换表情图片
			emotion(res) {
				let word = res.replace(/\#|\;/gi, '')
				const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷',
					'冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕',
					'折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险',
					'亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电',
					'炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你',
					'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'
				]
				let index = list.indexOf(word)
				return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
			},

			//评论显示与隐藏
			Pinif(zhi) {
				this.PinHuibtn = zhi
				if (this.PinHuiif == 'none') {
					this.PinHuiif = 'block'
				} else {
					this.PinHuiif = 'none'
				}
			},

			Pincz(postid) {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					this.Pinif(postid)
					if (this.PinHuiif != "none") {
						this.SeReData(postid)
					}
				} else {
					this.open3('请先登录!')
				}
			},

			//用户单机回复显示或隐藏回复框--一级回复
			Pinlunsj(bntid) {
				this.Pinlunbtn = bntid
				if (this.Pinlunif == 'none') {
					this.Pinlunif = 'block'
				} else {
					this.Pinlunif = 'none'
				}
				this.HuiFutext = '';
			},

			//用户单机回复显示或隐藏回复框--二级回复
			Huifusj(bntid) {
				this.Huifubtn = bntid
				if (this.Huifuif == 'none') {
					this.Huifuif = 'block'
				} else {
					this.Huifuif = 'none'
				}
				this.HuiFutext = '';
			},

			//获取所有帖子信息
			async SePostData() {
				const res = await this.$http.post('Index/SeBarPost', {
					barid: this.id,
					top: this.PostDataSum
				})
				this.postdata = res.data.data;
				if (this.postdata != null && this.postdata != "") {
					this.ifpostdata = true
				} else {
					this.ifpostdata = false
				}
			},

			//获取指定回复信息
			async SeReData(zhi) {

				const res = await this.$http.post('Index/SeReplyData', {
					postid: zhi
				})
				console.log(res.data)

				if (res.data.Redata != "0") {
					this.Replylist = res.data.Redata

					if (res.data.Covedata != "0") {
						this.Covelist = res.data.Covedata
					}
				}

				if (res.data.Redata != "0") {
					this.Renullcz = true
				} else {
					this.Renullcz = false
				}
			},

			//获取登录用户信息
			async SeUserData() {
				const res = await this.$http.post('Distribution/SeUserData')
				this.UserData = res.data.data
			},

			//用户评论
			async InRe(id) {
				const res = await this.$http.post('Index/InRe', {
					postid: id,
					userid: this.UserData.Id,
					username: this.UserData.UserName,
					userimg: this.UserData.UserImg,
					text: this.pltext
				})
				if (res.data.data) {
					this.open2('评论成功!')
					this.pltext = ''
				} else {
					this.open3('服务器异常，请联系管理员!')
				}
				this.SeReData(id)
				this.SePostData()
			},

			//到底自动加载
			PostShuaXin() {
				let _this = this;
				window.onscroll = function() {
					//变量scrollTop是滚动条滚动时，距离顶部的距离
					var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					//变量windowHeight是可视区的高度
					var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
					//变量scrollHeight是滚动条的总高度
					var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
					//滚动条到底部的条件
					if (scrollTop + windowHeight == scrollHeight) {
						_this.PostDataSum = _this.PostDataSum + 5
						_this.SePostData()
					}
				}
			},

			//图片加载处理
			LoadImg(imgs) {
				var listimg = imgs.split(",")
				listimg.pop()
				return listimg
			},

			//图片预览处理
			PreviewImg(imgs) {
				var listimg = this.LoadImg(imgs)
				var list = []
				listimg.forEach((itme, index) => {
					list[index] = this.PinJieImg(itme)
				})
				return list
			},

			//用户回复评论
			async CoHuiFu(postid, reid, nameb) {
				const res = await this.$http.post('Index/InCo', {
					zhi: postid,
					repid: reid,
					namea: this.UserData.UserName,
					nameb: nameb,
					userimg: this.UserData.UserImg,
					text: this.HuiFutext
				})
				if (res.data.data) {
					//评论成功重新加载数据
					this.SePostData()
					this.SeReData(postid)
					this.Pinlunsj(-1)
					this.Huifusj(-1)
					this.HuiFutext = ''
				} else {
					this.open3("评论失败，请反馈管理员!")
				}
			},

			//用户点赞评论
			async ReDianzang(repid, postid) {
				const res = await this.$http.post('Index/ReDianzang', {
					reid: repid,
					userid: this.UserData.Id
				})
				this.SeReData(postid)
				console.log(postid)
			},

			//用户点赞回复
			async CoDianzang(covid, postid) {
				const res = await this.$http.post('Index/CoDianzang', {
					coid: covid,
					userid: this.UserData.Id
				})
				this.SeReData(postid)
			},

			//用户点赞动态
			async PostDianzang(postid) {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					const res = await this.$http.post('Index/InFabu', {
						postid: postid,
						userid: this.UserData.Id
					})
					this.SePostData()
				} else {
					this.open3("请登录!")
				}
			},

			//用户收藏动态
			async PostShoucang(id) {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					const res = await this.$http.post('Index/InColl', {
						postid: id,
						userid: this.UserData.Id
					})
					if (res.data.data == "2") {
						this.open2("收藏成功!")
					} else if (res.data.data == "1") {
						this.open2("已取消收藏!")
					} else {
						this.open4("操作失败,请反馈管理员!")
					}
				} else {
					this.open3("请登录!")
				}
			},

			//用户转发动态
			async ZhuanfaPost(baid, text, name, img) {
				var user = window.sessionStorage.getItem('token');
				if (user != null) {
					const res = await this.$http.post('Index/ZhuanfaPost', {
						userid: this.UserData.Id,
						barid: baid,
						posttitle: this.ZhuanfaText,
						zhuan: name,
						posttext: text,
						postimg: img
					})
					if (res.data.data) {
						this.open2("转发成功!")
						this.dialogVisible = false
					} else {
						this.open4("转发失败,请反馈管理员!")
					}
				} else {
					this.open3("请登录!")
				}
			},

			//动态内容过多自动隐藏
			ellipsis(value) {
				// if (this.ifsetext) {
				// 	return value
				// } else{
				if (value.length > 20) {
					return value.slice(0, 20) + '...'
				}
				// }
				return value
			},

			//动态内容显示与隐藏切换方法
			IfPostText(id, val) {
				if (id == this.postidtext) {
					if (this.ifsetext) {
						return val
					}
				}
				return this.ellipsis(val)
			},

			//动态展开、收起切换
			IfPostTextzs(id) {
				if (id == this.postidtext) {
					if (this.ifsetext) {
						return "收起"
					}
				}
				return "展开"
			},
		},

		components: {
			Homes
		},

		created() {
			//获取板块信息
			this.SeIdBar()
			//获取用户信息
			this.SeleUserData()
			//获取贡献度最高的10位用户
			this.SeBarGonxianHot()

			//获取用户信息
			this.SeUserData();
			//获取动态信息
			this.SePostData();
			//瀑布流加载
			this.PostShuaXin();

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
	.barback {
		border-radius: 10px 10px 0 0;
		height: 200px;
		width: 100%;
		background-size: 100% 100%;
	}

	.bar-barimgbor {
		border: 2px solid #fff;
		width: 119px;
		height: 119px;
		border-radius: 16px;
	}

	.bar-barimg {
		width: 115px;
		height: 115px;
		border-radius: 14px;
	}

	.bar-bartitlefont {
		letter-spacing: 2px;
		font-size: 24px;
		font-weight: 700;
		color: #fff;
		text-shadow: 0px 0px 10px #000;
	}

	.bar-bartextfont {
		color: #fff;
		font-size: 14px;
	}

	.bar-barjsfont {
		font-size: 14px;
		color: #555555;
		padding-top: 20px;
	}

	.bar-barsumcolor {
		color: #f70;
	}

	.bar-forumfont {
		color: #fff;
		display: block;
		text-align: center;
		width: 70px;
		height: 34px;
		font-size: 14px;
		line-height: 34px;
		border-radius: 10px;
		background: linear-gradient(224deg, #ffaf00, #ff5d23);
	}

	.bar-forumfont:hover {
		color: #fff;
	}

	.bar-back-top {
		margin-top: 10px;
		background: #eee;
		border-radius: 10px;
	}

	.bar-daohan {
		width: 90%;
		margin: 0 auto;
		height: 50px;
		line-height: 50px;
	}

	.bar-daohan_a {
		font-size: 14px;
		color: #535353;
	}

	.bar-daohan_a:hover {
		color: #f70;
		font-weight: 600;
	}

	.bar-daohan_a_click {
		color: #f70;
		font-weight: 600;
	}

	.bar-daohan_a_click:hover {
		color: #f70;
		font-weight: 600;
	}

	.bar-you_gx {
		position: fixed;
		min-width: 252px;
		max-width: 252px;
		top: 0;
		margin-top: 75px;
	}

	.who-a_hover {
		display: block;
		width: 20px;
		padding-top: 5px;
		font-size: 20px;
		color: #333333;
		margin-left: 10px;
	}

	.who-a_hover:hover {
		color: #FF5D23;
	}

	.who-a_button {
		display: block;
		width: 50px;
		background: #ddd;
		color: #404040;
		height: 30px;
		line-height: 30px;
		margin-top: 5px;
		text-align: center;
		border-radius: 10px;
	}

	.who-a_button:hover {
		background: #f70;
		color: #fff;
	}
</style>
