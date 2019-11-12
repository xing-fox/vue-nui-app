<template>
	<view class="content">
		<view class="header">
			<image class="header-image" src="/static/recharge/header.png"></image>
			<view class="header-main">
				<text>当前余额</text>
				<text class="money">￥--</text>
			</view>
		</view>
		<view class="main">
			<text class="title">特惠专区</text>
			<view class="main-list">
				<view class="list" v-for="(item, index) in rechargeData" :key="item.couponId" @click="changeRecharge(index)">
					<image v-if="rechargeIndex !== index" class="main-list-image" src="/static/recharge/list-bg.png"></image>
					<image v-else class="main-list-image" src="/static/recharge/list-bg-select.png"></image>
					<view class="list-data">
						<text class="data-price">￥{{ item.rechargeFee }}</text>
						<text class="data-intro">{{ item.couponName }}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="rechargeData[rechargeIndex]" @click="rechargeFunc" class="footer">立即以￥{{ rechargeData[rechargeIndex].rechargeFee }}元充值</view>
	</view>
</template>

<script>
import { RequestApi } from 'config/api';
import { GetIndexCoupon } from 'config/fetch';
export default {
	data() {
		return {
			rechargeData: [],
			rechargeIndex: 0
		};
	},
	async onLoad() {
		const Data = await RequestApi(`${GetIndexCoupon}`, 'GET', {});
		this.rechargeData = Data.data.data;
	},
	methods: {
		rechargeFunc() {
			uni.navigateTo({
				url: '/pages/login/index'
			});
		},
		changeRecharge(eq) {
			this.rechargeIndex = eq;
		}
	}
};
</script>

<style lang="less">
.content {
	height: calc(100vh - 25rpx);
	line-height: 1;
	padding: 25rpx 24rpx 0;
	background: #f5f5f5;
	.header {
		width: 100%;
		height: 150rpx;
		position: relative;
		.header-image {
			width: 100%;
			height: 100%;
		}
		.header-main {
			color: #fff;
			font-size: 26rpx;
			width: 100%;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			.money {
				font-size: 50rpx;
				font-weight: bold;
				margin-top: 20rpx;
			}
		}
	}
	.main {
		width: 100%;
		.title {
			color: #000;
			font-size: 28rpx;
			font-weight: 800;
			line-height: 70rpx;
		}
		.main-list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.list {
				width: 340rpx;
				height: 180rpx;
				margin-bottom: 24rpx;
				position: relative;
				.main-list-image {
					width: 100%;
					height: 100%;
				}
				.list-data {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					display: flex;
					text-align: center;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.data-price {
						color: #9e6b09;
						font-size: 48rpx;
						font-weight: bold;
						margin-bottom: 25rpx;
					}
					.data-intro {
						color: #797979;
						font-size: 26rpx;
					}
				}
			}
		}
	}
	.footer {
		color: #fff;
		font-size: 32rpx;
		width: 100%;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		border-radius: 10rpx;
		background: linear-gradient(to right, #ff5d04, #ff9704);
		&:active {
			background: #ff5d04;
		}
	}
}
</style>
