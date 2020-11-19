<template>
	<div class="myinfo">

		<div class="mkback" style="background: #EEEEEE;width: 98%;margin: 0 auto;">
			<div style="padding: 15px 0 6px 20px;">
				<b>个人信息</b>
			</div>
			<div style="padding-bottom: 5px;">
				<div style="width: 62px;border:1px orangered solid;margin-left: 20px;"></div>
			</div>
		</div>

		<div class="backsp" style="height: 890px; width: 98%;margin: 0 auto;margin-top: 10px;">
			<div>
				<ul class="myinfo_ul">
					<li>
						<el-upload class="avatar-uploader" action="http://modoudou.cn:8082/Distribution/UpUserImg/" :show-file-list="false"
						 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="true" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</li>
					<li>
						<el-radio-group v-model="user.UserSex">
							<el-radio label="男"></el-radio>
							<el-radio label="女"></el-radio>
						</el-radio-group>
					</li>
					<li>
						<el-cascader :options="options" :placeholder="user.UserAdd" @change="xzuseradd"></el-cascader>
					</li>
					<li>
						<input type="text" class="myinfo_text" v-model="user.UserName" placeholder="在这里填写昵称">
					</li>
					<li>
						<input type="password" class="myinfo_text" v-model="yuanpwd" placeholder="在这里填写原密码" @blur="IfUserPwd">
					</li>
					<li>
						<input type="password" class="myinfo_text" v-model="xinpwd" placeholder="在这里填写新密码" @blur="IfPwd">
					</li>
					<li>
						<el-input
						  type="textarea"
						  :rows="2"
						  placeholder="在这里输入签名"
						  v-model="user.UserText">
						</el-input>
					</li>
					<li>
						<el-button @click="UpUser">保存修改</el-button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['id'],
		data() {
			return {
				user: [], //存放用户信息
				imageUrl: '', //存放用户头像
				yuanpwd: '',//输入的原密码
				ifyuanpwd:true,//判断原密码是否正确
				xinpwd:'',//输入的新密码
				ifxinpwd:true,//判断新密码是否符合规范
				options: [
					{
						label: "北京市",
						value: "北京市",
						children: [{
							value: '东城区',
							label: '东城区'
						}, {
							value: '西城区',
							label: '西城区'
						}, {
							value: '朝阳区',
							label: '朝阳区'
						}, {
							value: '丰台区',
							label: '丰台区'
						}, {
							value: '石景山区',
							label: '石景山区'
						}, {
							value: '海淀区',
							label: '海淀区'
						}, {
							value: '顺义区',
							label: '顺义区'
						}, {
							value: '通州区',
							label: '通州区'
						}, {
							value: '大兴区',
							label: '大兴区'
						}, {
							value: '房山区',
							label: '房山区'
						}, {
							value: '门头沟区',
							label: '门头沟区'
						}, {
							value: '昌平区',
							label: '昌平区'
						}, {
							value: '平谷区',
							label: '平谷区'
						}, {
							value: '密云区',
							label: '密云区'
						}, {
							value: '怀柔区',
							label: '怀柔区'
						}, {
							value: '延庆区',
							label: '延庆区'
						}]
					},
					{
						label: "天津市",
						value: "天津市",
						children: [{
							value: '滨海区',
							label: '滨海区'
						}, {
							value: '和平区',
							label: '和平区'
						}, {
							value: '河东区',
							label: '河东区'
						}, {
							value: '河西区',
							label: '河西区'
						}, {
							value: '南开区',
							label: '南开区'
						}, {
							value: '河北区',
							label: '河北区'
						}, {
							value: '红桥区',
							label: '红桥区'
						}, {
							value: '东丽区',
							label: '东丽区'
						}, {
							value: '西青区',
							label: '西青区'
						}, {
							value: '津南区',
							label: '津南区'
						}, {
							value: '北辰区',
							label: '北辰区'
						}, {
							value: '武清区',
							label: '武清区'
						}, {
							value: '宝坻区',
							label: '宝坻区'
						}, {
							value: '静海区',
							label: '静海区'
						}, {
							value: '宁河区',
							label: '宁河区'
						}, {
							value: '蓟州区',
							label: '蓟州区'
						}]
					},
					{
						label: "河北省",
						value: "河北省",
						children: [{
							value: '石家庄市',
							label: '石家庄市'
						}, {
							value: '唐山市',
							label: '唐山市'
						}, {
							value: '秦皇岛市',
							label: '秦皇岛市'
						}, {
							value: '邯郸市',
							label: '邯郸市'
						}, {
							value: '邢台市',
							label: '邢台市'
						}, {
							value: '保定市',
							label: '保定市'
						}, {
							value: '张家口市',
							label: '张家口市'
						}, {
							value: '承德市',
							label: '承德市'
						}, {
							value: '沧州市',
							label: '沧州市'
						}, {
							value: '廊坊市',
							label: '廊坊市'
						}, {
							value: '衡水市',
							label: '衡水市'
						}]
					},
					{
						label: "山西省",
						value: "山西省",
						children: [{
							value: '太原市',
							label: '太原市'
						}, {
							value: '长治市',
							label: '长治市'
						}, {
							value: '大同市',
							label: '大同市'
						}, {
							value: '阳泉市',
							label: '阳泉市'
						}, {
							value: '晋中市',
							label: '晋中市'
						}, {
							value: '朔州市',
							label: '朔州市'
						}, {
							value: '临汾市',
							label: '临汾市'
						}, {
							value: '吕梁市',
							label: '吕梁市'
						}, {
							value: '运城市',
							label: '运城市'
						}, {
							value: '晋城市',
							label: '晋城市'
						}]
					},
					{
						label: "内蒙古自治区",
						value: "内蒙古自治区",
						children: [{
							value: '包头市',
							label: '包头市'
						}, {
							value: '呼和浩特市',
							label: '呼和浩特市'
						}, {
							value: '赤峰市',
							label: '赤峰市'
						}, {
							value: '乌海市',
							label: '乌海市'
						}, {
							value: '鄂尔多斯市',
							label: '鄂尔多斯市'
						}, {
							value: '呼伦贝尔市',
							label: '呼伦贝尔市'
						}, {
							value: '乌兰察布市',
							label: '乌兰察布市'
						}, {
							value: '巴彦淖尔市',
							label: '巴彦淖尔市'
						}, {
							value: '通辽市',
							label: '通辽市'
						}, {
							value: '锡林郭勒盟',
							label: '锡林郭勒盟'
						}, {
							value: '兴安盟',
							label: '兴安盟'
						}, {
							value: '阿拉善盟',
							label: '阿拉善盟'
						}]
					},
					{
						label: "辽宁省",
						value: "辽宁省",
						children: [{
							value: '沈阳市',
							label: '沈阳市'
						}, {
							value: '大连市',
							label: '大连市'
						}]
					},
					{
						label: "吉林省",
						value: "吉林省",
						children: [{
							value: '长春市',
							label: '长春市'
						}, {
							value: '吉林市',
							label: '吉林市'
						}]
					},
					{
						label: "黑龙江省",
						value: "黑龙江省",
						children: [{
							value: '哈尔滨市',
							label: '哈尔滨市'
						}, {
							value: '齐齐哈尔市',
							label: '齐齐哈尔市'
						}]
					},
					{
						label: "上海市",
						value: "上海市",
						children: [{
							value: '黄浦区',
							label: '黄浦区'
						}, {
							value: '宝山区',
							label: '宝山区'
						}]
					},
					{
						label: "江苏省",
						value: "江苏省",
						children: [{
							value: '南京市',
							label: '南京市'
						}, {
							value: '无锡市',
							label: '无锡市'
						}]
					},
					{
						label: "浙江省",
						value: "浙江省",
						children: [{
							value: '杭州市',
							label: '杭州市'
						}, {
							value: '宁波市',
							label: '宁波市'
						}]
					},
					{
						label: "安徽省",
						value: "安徽省",
						children: [{
							value: '合肥市',
							label: '合肥市'
						}, {
							value: '芜湖市',
							label: '芜湖市'
						}]
					},
					{
						label: "福建省",
						value: "福建省",
						children: [{
							value: '福州市',
							label: '福州市'
						}, {
							value: '厦门市',
							label: '厦门市'
						}]
					},
					{
						label: "江西省",
						value: "江西省",
						children: [{
							value: '南昌市',
							label: '南昌市'
						}]
					},
					{
						label: "山东省",
						value: "山东省",
						children: [{
							value: '济南市',
							label: '济南市'
						}]
					},
					{
						label: "河南省",
						value: "河南省",
						children: [{
							value: '郑州市',
							label: '郑州市'
						}]
					},
					{
						label: "湖北省",
						value: "湖北省",
						children: [{
							value: '武汉市',
							label: '武汉市'
						}]
					},
					{
						label: "湖南省",
						value: "湖南省",
						children: [{
							value: '长沙市',
							label: '长沙市'
						}, {
							value: '株洲市',
							label: '株洲市'
						}, {
							value: '湘潭市',
							label: '湘潭市'
						}, {
							value: '衡阳市',
							label: '衡阳市'
						}, {
							value: '邵阳市',
							label: '邵阳市'
						}, {
							value: '岳阳市',
							label: '岳阳市'
						}, {
							value: '常德市',
							label: '常德市'
						}, {
							value: '张家界市',
							label: '张家界市'
						}, {
							value: '益阳市',
							label: '益阳市'
						}, {
							value: '郴州市',
							label: '郴州市'
						}, {
							value: '永州市',
							label: '永州市'
						}, {
							value: '怀化市',
							label: '怀化市'
						}]
					},
					{
						label: "广东省",
						value: "广东省",
						children: [{
							value: '广州市',
							label: '广州市'
						}]
					},
					{
						label: "广西壮族自治区",
						value: "广西壮族自治区",
						children: [{
							value: '柳州市',
							label: '柳州市'
						}]
					},
					{
						label: "海南省",
						value: "海南省",
						children: [{
							value: '海口市',
							label: '海口市'
						}]
					},
					{
						label: "重庆市",
						value: "重庆市",
						children: [{
							value: '万州区',
							label: '万州区'
						}]
					},
					{
						label: "四川省",
						value: "四川省",
						children: [{
							value: '成都市',
							label: '成都市'
						}]
					},
					{
						label: "贵州省",
						value: "贵州省",
						children: [{
							value: '贵阳市',
							label: '贵阳市'
						}]
					},
					{
						label: "云南省",
						value: "云南省",
						children: [{
							value: '昆明市',
							label: '昆明市'
						}]
					},
					{
						label: "西藏自治区",
						value: "西藏自治区",
						children: [{
							value: '拉萨市',
							label: '拉萨市'
						}]
					},
					{
						label: "陕西省",
						value: "陕西省",
						children: [{
							value: '西安市',
							label: '西安市'
						}]
					},
					{
						label: "甘肃省",
						value: "甘肃省",
						children: [{
							value: '兰州市',
							label: '兰州市'
						}]
					},
					{
						label: "青海省",
						value: "青海省",
						children: [{
							value: '西宁市',
							label: '西宁市'
						}]
					},
					{
						label: "宁夏回族自治区",
						value: "宁夏回族自治区",
						children: [{
							value: '银川市',
							label: '银川市'
						}]
					},
					{
						label: "新疆维吾尔自治区",
						value: "新疆维吾尔自治区",
						children: [{
							value: '乌鲁木齐市',
							label: '乌鲁木齐市'
						}]
					},
					{
						label: "台湾省",
						value: "台湾省",
						children: [{
							value: '台北市',
							label: '台北市'
						}]
					},
					{
						label: "香港特别行政区",
						value: "香港特别行政区"
					},
					{
						label: "澳门特别行政区",
						value: "澳门特别行政区"
					}
				],
			}
		},
		methods: {

			//获取指定用户信息
			async SeUser() {
				const res = await this.$http.post('Distribution/SeUserData')
				this.user = res.data.data
				this.imageUrl = this.PinJieUserImg(this.user.UserImg)
			},
			
			//判断密码是否与原密码相同
			IfUserPwd(){
				if (this.$md5(this.yuanpwd).toUpperCase()!=this.user.UserPwd) {
					this.open4('输入密码与原密码不符，请重新输入!');
					this.ifyuanpwd = false;
				}else{
					this.ifyuanpwd = true;
				}
			},
			
			//判断新密码是否符合规范
			IfPwd() {
				var passwordreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
				if (!passwordreg.test(this.Userpwd)) {
					this.ifxinpwd = false;
					this.open4('密码必须由数字、字母组成,请输入8-16位！');
				} else {
					this.ifxinpwd = true;
				}
			},
			
			//地址修改
			xzuseradd(zhi){
				this.user.UserAdd = zhi[0]+zhi[1];
			},
			
			//保存修改
			async UpUser() {
				console.log(this.user.UserAdd)
				if (this.ifyuanpwd) {
					if (this.ifxinpwd) {
						if (this.user.UserName!=''&&this.user.UserName!=null&&this.user.UserText!=null) {
							const res = await this.$http.post('Distribution/UpUser',{
								user : this.user
							});
							if (res.data.data) {
								this.open2('保存成功!')
								this.SeUser()
							} else{
								this.open4('保存失败，请反馈管理员!')
							}
						} else{
							this.open4('昵称&签名不能为空!')
						}
					} else{
						this.open4('密码必须由数字、字母组成,请输入8-16位！')
					}
				} else{
					this.open4('输入密码与原密码不符，请重新输入!')
				}
			},

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},

			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
			},

			//图片上传
			handleAvatarSuccess(res, file) {
				this.imageUrl = this.PinJieUserImg(file.name);
				this.user.UserImg = file.name;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.open4('上传头像图片只能是 JPG 格式!')
				}
				if (!isLt2M) {
					this.open4('上传头像图片大小不能超过 2MB!')
				}
				return isJPG && isLt2M;
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
			this.SeUser()
		}
	}
</script>

<style>

	.myinfo {
		width: 1000px;
		height: 969px;
		margin: 0 auto;
		padding-top: 10px;
		background: rgba(0, 0, 0, 0.1);
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
		object-fit: cover;
	}

	.myinfo_text {
		font-family: "microsoft yahei", Arial;
		transition: border-color .3s ease 0s;
		outline: 0;
		outline: none;
		border: none;
		width: 100%;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
		padding-left: 4px;
		border-bottom: 1px solid #e9e9e9;
	}
	
	.myinfo_ul{
		width: 70%;
		margin: 0 auto;
		text-align: center;
		padding-top: 30px;
	}
	
	.myinfo_ul> li{
		padding: 15px 0;
	}
</style>
