<template>
	<view class="content">
		<view class="content-picker">
			<view class="picker picker-school">
				<picker
					mode="multiSelector"
					@columnchange="bindMultiPickerColumnChange"
					:value="multiIndex"
					:range="multiArray">
					<view>学校</view>
					<image class="picker-img" src="/static/icon/arr_down.png"></image>
				</picker>
			</view>
			<view class="picker picker-course">
				<view>班课类型</view>
				<image class="picker-img" src="/static/icon/arr_down.png"></image>
			</view>
		</view>
		<view class="content-main">
			<scroll-view
				scroll-y="true"
				class="scroll-Y">
				<view class="content-list" v-for="item in AllData" :key="item.classId">
					<view class="list">
						<image class="list-img" src="https://dueape-nation-1255328906.cos.ap-singapore.myqcloud.com/image/2019103006105513.jpg"></image>
						<view class="list-main">
							<view class="list-title">{{ item.title }}</view>
							<view class="list-main-content">
								<text>线上</text>
								<image class="list-main-img list-right" src="/static/time.png"></image>
								<text>{{ item.updateTime }}</text>
							</view>
							<view class="list-main-content">
								<image class="list-main-img" src="/static/bm.png"></image>
								<text class="text-color">{{ item.applyNum }}</text>
								<text>人报名</text>
							</view>
							<view class="list-main-content">
								<text class="text-color">$</text>
								<text class="text-color">{{ item.coursePrice }}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { RequestApi } from 'config/api'
	import { GetAllClassUrl } from 'config/fetch'
	export default {
		data () {
			let _schoolData = {}
			uni.getStorage({
				key: 'storage_school',
				success: function (res) {
					data = res.data
				}
			})
			return {
				AllData: [],
				schoolData1: [],
				multiArray: [
					['全部', '澳洲', '美国'],
					['中国', '日本']
				],
				multiIndex: [0, 0]
			}
		},
		async onLoad () {
			const Data = await RequestApi(`${GetAllClassUrl}`, 'POST', {
				order: 'desc',
				sortField: 'class_id',
				pageSize: 10,
				pageNum: 1,
				displayFlag: 1,
				courseType: undefined,
				collegeId: undefined
			})
			this.AllData = Data.data.results.data
		},
		methods: {
			bindMultiPickerColumnChange (e) {
				console.log(e)
				
				// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				// this.multiIndex[e.detail.column] = e.detail.value
				// switch (e.detail.column) {
				// 	case 0: //拖动第1列
				// 		switch (this.multiIndex[0]) {
				// 			case 0:
				// 				this.multiArray[1] = ['中国', '日本']
				// 				this.multiArray[2] = ['北京', '上海', '广州']
				// 				break
				// 			case 1:
				// 				this.multiArray[1] = ['英国', '法国']
				// 				this.multiArray[2] = ['伦敦', '曼彻斯特']
				// 				break
				// 		}
				// 		this.multiIndex.splice(1, 1, 0)
				// 		this.multiIndex.splice(2, 1, 0)
				// 		break
				// 	case 1: //拖动第2列
				// 		switch (this.multiIndex[0]) { //判断第一列是什么
				// 			case 0:
				// 				switch (this.multiIndex[1]) {
				// 					case 0:
				// 						this.multiArray[2] = ['北京', '上海', '广州']
				// 						break
				// 					case 1:
				// 						this.multiArray[2] = ['东京','北海道']
				// 						break
				// 				}
				// 				break
				// 			case 1:
				// 				switch (this.multiIndex[1]) {
				// 					case 0:
				// 						this.multiArray[2] = ['伦敦', '曼彻斯特']
				// 						break
				// 					case 1:
				// 						this.multiArray[2] = ['巴黎', '马赛']
				// 						break
				// 				}
				// 				break
				// 		}
				// 		this.multiIndex.splice(2, 1, 0)
				// 		break
				// }
				// this.$forceUpdate()
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding-top: 100rpx;
		background: #f5f5f5;
	}
	.content-picker {
		height: 70rpx;
		padding-top: 15rpx;
		padding-right: 25rpx;
		padding-bottom: 15rpx;
		padding-left: 25rpx;
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.picker {
		color: #999;
		font-size: 26rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		position: relative;
	}
	.picker-img {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 0;
		right: 20rpx;
		bottom: 0;
		margin: auto 0;
	}
	.picker-school {
		width: 280rpx;
		height: 70rpx;
		border-radius: 10rpx;
		background: #e8e8e8;
		display: inline-flex;
		align-items: center;
	}
	.picker-course {
		width: 400rpx;
		height: 70rpx;
		border-radius: 10rpx;
		background: #e8e8e8;
		display: inline-flex;
		align-items: center;
	}
	.content-main {
		flex: 1;
	}
	.content-list {
		margin-top: 30rpx;
		margin-right: 25rpx;
		margin-left: 25rpx;
		margin-bottom: 30rpx;
		padding-top: 20rpx;
		padding-right: 30rpx;
		padding-bottom: 20rpx;
		padding-left: 30rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx -2rpx 8rpx rgba(0, 0, 0, .06);
		background: #fff;
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.list-img {
		width: 216rpx;
		height: 172rpx;
		will-change: transform;
	}
	.list-main {
		flex: 1;
		display: inline-flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 24rpx;
	}
	.list-main-content {
		width: 100%;
		color: #999;
		font-size: 26rpx;
		line-height: 28rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.list-title {
		color: #333;
		font-size: 28rpx;
		font-weight: bold;
		width: 100%;
		line-height: 30rpx;
		overflow: hiddne; 	
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.list-main-img {
		width: 26rpx;
		height: 26rpx;
		margin-right: 15rpx;
	}
	.list-right {
		margin-left: 15rpx;
	}
	.text-color {
		color: #ff9704;
		font-size: 32rpx;
		line-height: 34rpx;
		margin-right: 10rpx;
	}
	.text-weight {
		font-weight: bold;
	}
</style>
