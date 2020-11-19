<template>
	<div class="backsp album" style="text-align: left;padding-bottom: 20px;margin-bottom: 60px;">
		<div v-if="albumnull">
			<div class="row" v-for="(itme,index) in imglist" :key="index" style="width: 96%;margin: 0 auto;padding-top: 20px;">
				<div class="col-12">
					<h4 v-text="ImgDate(itme.Time)"></h4>
					<hr />
				</div>
				<div v-for="(imgitme,imgindex) in ImgData(itme.Img)" :key="imgindex">
					<el-image style="width: 108px; height: 108px;margin: 0px 5px 5px 5px;" :fit="'cover'" :src="PinJieImg(imgitme)" :preview-src-list="PreviewImg(itme.Img)">
					</el-image>
				</div>
			</div>
		</div>
		<div v-else style="height: 600px;line-height: 600px;text-align: center;">
			<label>暂无相册</label>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['id'],
		data() {
			return {
				imglist: [],
				albumnull: false
			}
		},
		methods: {
			//获取指定用户相册信息
			async SeImgData() {
				const res = await this.$http.post('Index/SeUserAlbum', {
					userid: this.id
				})
				this.imglist = res.data.data
				this.imglist.reverse()
				if (res.data.data != null && res.data.data != "") {
					this.albumnull = true
				} else {
					this.albumnull = false
				}
			},

			//图片拼接
			PinJieImg(img) {
				return ('http://modoudou.cn:8082/Images/PostImg/' + img)
			},

			PinJieUserImg(img) {
				return ('http://modoudou.cn:8082/Images/UserImg/' + img)
			},

			//修改时间格式
			ImgDate(date) {
				var zhi = date.split("-")
				return zhi[0] + "年" + zhi[1] + "月"
			},

			//拆分图片字符串
			ImgData(data) {
				var zhi = data.split(",")
				zhi.pop()
				return zhi
			},

			//图片预览处理
			PreviewImg(imgs) {
				var listimg = this.ImgData(imgs)
				var list = []
				listimg.forEach((itme, index) => {
					list[index] = this.PinJieImg(itme)
				})
				return list
			},
		},
		mounted() {
			this.SeImgData()
		}
	}
</script>

<style>
	.album {
		margin-top: 270px;
	}
</style>
