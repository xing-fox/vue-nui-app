<template>
	<view>
		<view class="content-picker">
			<view class="picker picker-school">
				<text>学校</text>
			</view>
			<view class="picker picker-course">
				<utext>班课类型</utext>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
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
		padding: 15rpx 25rpx;
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
</style>
