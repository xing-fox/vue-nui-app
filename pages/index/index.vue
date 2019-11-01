<template>
	<view class="content">
		<view class="content-picker">
			<view class="picker picker-school">
				<view>学校</view>
			</view>
			<view class="picker picker-course">
				<view>班课类型</view>
			</view>
		</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				AllData: []
			}
		},
		onLoad() {
			uni.request({
			    url: 'https://weixin.dueape.com/dueape/class/index',
				method: 'POST',
				data: {
					order: 'desc',
					sortField: 'class_id',
					pageSize: 10,
					pageNum: 1,
					displayFlag: 1,
					courseType: undefined,
					collegeId: undefined
				},
			    success: (res) => {
					const data = res.data
					this.AllData = data.results.data
			    }
			})
		},
		methods: {
		}
	}
</script>

<style>
	page {
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
	}
	.picker {
		color: #999;
		font-size: 26rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
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
	.content-list {
		margin-top: 30rpx;
		margin-right: 25rpx;
		margin-left: 25rpx;
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
