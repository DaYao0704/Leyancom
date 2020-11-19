<template>
	<div>
		<div class="row spa_content">
			<div class="col-3 spa_home_myxx">
				<div class="backsp" style="margin-right: 10px;border: 1px solid rgba(1,1,1,0);">
					<!-- 关注、粉丝数 -->
					<div style="width: 90%;margin: 0 auto;padding-top: 15px;">
						<ul class="row" style="margin-bottom: -8px;">
							<li class="col-6 text_14">关注 <span v-text="followsum"></span></li>
							<li class="col-6 text_14" style="border-left: 1px solid #999;">粉丝 <span v-text="fans"></span></li>
						</ul>
						<hr />
					</div>
					<!-- 个人信息展示 -->
					<div style="text-align: left;width: 90%;margin: 0 auto;">
						<ul class="text_14">
							<li style="padding-bottom: 10px;">性别<span style="padding-left: 10px;" v-text="user.UserSex"></span></li>
							<li style="padding-bottom: 10px;">地区<span style="padding-left: 10px;" v-text="user.UserAdd"></span></li>
							<li>简介<span style="padding-left: 10px;" v-text="user.UserText"></span></li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 中间帖子部分 -->
			<div class="col-9 spa_home_post">
				<div v-if="pagenull">
					<div v-for="(item,postindex) in postdata" :key="postindex">
						<!-- 帖子内容部分 -->
						<div>
							<div class="mkback" :style="postindex!=0?'margin-top: 10px;':''">
								<div style="width: 100%;margin: 0 auto;padding-top: 20px;">
									<dl class="row" style="margin-bottom: 0px;text-align: left;">
										<!-- 动态发布人头像部分 -->
										<dt class="col-1" style="padding-left: 20px;">
											<router-link :to="'/myspace/'+item.Users.Id" target="_blank">
												<img :src="PinJieUserImg(item.Users.UserImg)" style="width: 50px;height: 50px;border-radius: 25px;object-fit: cover;">
											</router-link>
										</dt>
										<!-- 动态信息部分 -->
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
													<el-image v-for="(img,imgindex) in LoadImg(item.PostImg)" :fit="'cover'" :key="imgindex" style="width: 130px; height: 130px; margin-left: 5px;"
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
						<div class="mkback" style="margin-top: 10px;text-align: left;" :style="{display:item.Id!=PinHuibtn?'none':('none'==PinHuiif?'none':'block')}">
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
							<div v-if="Renullcz" style="text-align: left;">
								<div v-for="(Reitem,index) in Replylist" :key="index">
					
									<dl class="row" style="width:94%;margin:0 auto;">
					
										<dt class="col-1"><img style="width:40px;height:40px;border-radius:20px;" :src="PinJieUserImg(Reitem.UserImg)" /></dt>
										<dd class="col-11">
											<dl class="row">
												<dd class="col-12"><a href="#" style="color:rgba(255, 106, 0,0.6);" v-text="Reitem.UserName"></a>&nbsp;:&nbsp;<span
													 style="width: 100%;word-break:break-all;" v-html="Reitem.Text.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></span></dd>
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
																		<a href="#" style="color:rgba(255, 106, 0,0.6);" v-text="Coitem.Usera"></a>
																		&nbsp;回复&nbsp;
																		<a href="#" style="color:rgba(255, 106, 0,0.6);" v-text="Coitem.Userb"></a>
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
				<div v-else class="backsp" style="height: 636px;line-height: 636px;">
					<label>暂无动态</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//引入表情包组件
	import Homes from '../Emoji/List.vue'

	export default {
		props: ['id'],
		data() {
			return {
				user: [], //存储用户信息
				followsum: 0, //存储用户关注数
				fans: 0, //存储用户粉丝数
				pagenull:false,

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
				dialogVisible: false, //控制转发对话框的显示
				Zhuanfasum: 0, //显示转发字数提示
				ZhuanfaText: '', //转发文本
				ifsetext: false, //是否显示全文
				postidtext: 0, //哪一条动态显示全文

				Huifubtn: 0, //----------------}  设置
				Huifuif: 'none', //------------}  评论
				Pinlunbtn: 0, //---------------}  与
				Pinlunif: 'none', //-----------}  回复
				PinHuibtn: 0, //---------------}  是否
				PinHuiif: 'none', //-----------}  可见
			}
		},
		methods: {
			//获取指定用户信息
			async SeUser() {
				const res = await this.$http.post('Distribution/SeUserid', {
					userid: this.id
				})
				this.user = res.data.data
			},
			//获取指定用户关注、粉丝数
			async SeFollow() {
				const res = await this.$http.post('Distribution/SeUserFppSum', {
					userid: this.id
				})
				this.followsum = res.data.fps
				this.fans = res.data.fpn
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

			//获取指定用户动态信息
			async SePostData() {
				const res = await this.$http.post('Index/SeUserPostFirstHot', {
					top: this.PostDataSum,
					userid:this.id
				})
				this.postdata = res.data.data;
				if (res.data.data!=null&&res.data.data!="") {
					this.pagenull=true
				} else{
					this.pagenull=false
				}
			},

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},

			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
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
			
			//用户单击展开、收起事件
			IfSeTextClick(val) {
				this.ifsetext = !this.ifsetext
				if (this.ifsetext) {
					this.postidtext = val
				} else {
					this.postidtext = 0
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
		mounted() {
			this.SeUser()
			//获取动态信息
			this.SePostData();
			//获取用户信息
			this.SeUserData();
			//瀑布流加载
			this.PostShuaXin();
		}
	}
</script>

<style>
	.spa_home_myxx {
		max-width: 250px;
		position: fixed;
	}

	.spa_home_post {
		margin-left: 250px;
		padding-bottom: 60px;
	}
</style>
