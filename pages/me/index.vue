<template>
	<view class="content">
		<view class="header">
			<image class="header-image" src="/static/recharge/header.png"></image>
			<view class="header-photo"><image class="header-image"></image></view>
			<view class="header-name">未登录</view>
		</view>
		<view class="main">
			<view class="list">
				<image class="list-icon" src="/static/me/1.png"></image>
				<text class="list-text">我的订单</text>
				<image class="list-arrow" src="/static/icon/arr_right.png"></image>
			</view>
			<view class="list" @click="routeChange('/pages/me/wallet')">
				<image class="list-icon" src="/static/me/2.png"></image>
				<text class="list-text">我的钱包</text>
				<image class="list-arrow" src="/static/icon/arr_right.png"></image>
			</view>
			<view class="list">
				<image class="list-icon" src="/static/me/4.png"></image>
				<text class="list-text">我的优惠券</text>
				<image class="list-arrow" src="/static/icon/arr_right.png"></image>
			</view>
			<view class="list">
				<image class="list-icon" src="/static/me/3.png"></image>
				<text class="list-text">我的资料</text>
				<image class="list-arrow" src="/static/icon/arr_right.png"></image>
			</view>
			<view class="list" @click="routeChange('/pages/me/dueape')">
				<image class="list-icon" src="/static/me/5.png"></image>
				<text class="list-text">关于DueApe</text>
				<image class="list-arrow" src="/static/icon/arr_right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		routeChange (url) {
			uni.navigateTo({
				url: url
			})
		}
	}
};
</script>

<style lang="less">
.content {
	height: calc(100vh - 80rpx);
	line-height: 1;
	padding: 80rpx 24rpx 0;
	background: #f5f5f5;
	.header {
		width: 100%;
		height: 150rpx;
		text-align: center;
		box-sizing: border-box;
		position: relative;
		.header-image {
			width: 100%;
			height: 100%;
		}
		.header-photo {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			background: #e5e5e5;
			position: absolute;
			top: -60rpx;
			left: 0;
			right: 0;
			margin: 0 auto;
		}
		.header-name {
			color: #fff;
			font-size: 28rpx;
			position: absolute;
			top: 80rpx;
			left: 0;
			right: 0;
			z-index: 1;
		}
	}
	.main {
		margin-top: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-radius: 10rpx;
		box-shadow: 0 -2rpx 4rpx rgba(0, 0, 0, 0.03);
		overflow: hidden;
		background: #fff;
		.list {
			width: 100%;
			height: 90rpx;
			border-bottom: 1px solid #eee;
			display: flex;
			flex-direction: row;
			align-items: center;
			align-content: center;
			&:nth-last-child(1) {
				border: none;
			}
			.list-icon {
				width: 50rpx;
				height: 50rpx;
			}
			.list-arrow {
				width: 30rpx;
				height: 30rpx;
			}
			.list-text {
				flex: 1;
				font-size: 28rpx;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
