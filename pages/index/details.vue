<template>
	<view class="content">
		<view class="header">
			<image class="hea-image" :src="'https://'+ allData.iconPath"></image>
			<view class="hea-intro">
				<view class="title">{{ allData.title }}</view>
				<view class="main">
					<view class="info">
						<image class="info-image" src="/static/bm.png"></image>
						<view class="info-text">
							<text class="text-color">{{ allData.applyNum || 0}}</text>人报名
						</view>
					</view>
					<view class="info">
						<!-- <text class="info-text">学校：{{ allData. }}</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item">
				<image class="item-image" src="/static/index/time.png"></image>
				<view class="item-main">
					课程时间：
					<text v-for="(item, index) in allData.courseTime" :key="index">{{ item }}</text>
				</view>
			</view>
			<view class="item">
				<image class="item-image" src="/static/index/tutor.png"></image>
				<view class="item-main">
					<text>TUTOR：{{ allData.tutorName || '暂无姓名' }}</text>
				</view>
			</view>
			<view class="item">
				<image class="item-image" src="/static/index/type.png"></image>
				<view class="item-main">
					<text>上课方式：{{ allData.classType }}</text>
				</view>
			</view>
			<view class="item">
				<image class="item-image" src="/static/index/kefu.png"></image>
				<view class="item-main">
					微信客服：
					<text class="text-color">微信助手</text>
				</view>
			</view>
		</view>
		<view class="infor">
			<view class="title">TUTOR</view>
			<view class="infor-details">
				<view class="name">Chris</view>
				<view class="no-data">{{ allData.tutorIntroduce || '暂无介绍' }}</view>
			</view>
		</view>
		<view class="footer">
			<view class="price">￥{{ allData.coursePrice }}</view>
			<view class="submit">立即支付</view>
		</view>
		<view class="tab">
			<view class="tab-nav">
				<view v-for="(item, index) in tab" :key="index" class="item" :class="{active: index === tabIndex}" @click="changeTab(index)">{{ item.value }}</view>
			</view>
			<view class="main">
				<rich-text :nodes="allData.courseIntroduce"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
import { RequestApi } from 'config/api';
import { GetAllClassDetailsUrl } from 'config/fetch';
export default {
	data() {
		return {
			allData: {}, // 详情数据
			tab: [{
				value: '课程介绍'
			}, {
				value: '课件资料'
			}],
			tabIndex: 0 // 默认tab、index
		}
	},
	async onLoad(option) {
		const Data = await RequestApi(`${GetAllClassDetailsUrl}/${option.id}`, 'GET', {})
		// 获取学校信息
		uni.getStorage({
			key: 'storage_school',
			success: function(res) {
				self.allSchoolData = res.data.data.results.data;
				res.data.data.results.data.map(item => {
					if (Number(item.countryId) === 1) self.schoolAUSData.push(item.collegeName);
					if (Number(item.countryId) === 2) self.schoolUSAData.push(item.collegeName);
				});
			}
		});
		Data.data.results.classType = Data.data.results.courseWay === '1' ? '线上' : '线下'
		Data.data.results.courseIntroduce = Data.data.results.courseIntroduce.replace(/\<img/gi, '<img style="max-width:90vw;height:auto;" ')
		this.allData = Data.data.results
	},
	methods: {
		/**
		 * 修改tab
		 */
		changeTab(eq) {
			this.tabIndex = eq
		}
	}
};
</script>

<style lang="less">
	.content {
		width: 100%;
		line-height: 1;
		min-height: 100vh;
		padding: 0 0 105rpx 0;
		background: #f5f5f5;
		position: relative;
		.header {
			width: 100%;
			height: 220rpx;
			padding: 23rpx;
			box-sizing: border-box;
			background: #fff;
			display: flex;
			flex-direction: row;
			.hea-image {
				width: 216rpx;
				height: 172rpx;
				will-change: transform;
			}
			.hea-intro {
				flex: 1;
				padding: 5rpx 0 10rpx;
				margin: 0 0 0 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					color: #000;
					font-size: 32rpx;
					font-weight: bold;
					line-height: 40rpx;
				}
				.main {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					.info {
						display: flex;
						flex-direction: row;
						align-items: center;
						.info-image {
							width: 24rpx;
							height: 24rpx;
							will-change: transform;
						}
						.info-text {
							color: #999;
							font-size: 28rpx;
							line-height: 30rpx;
							.text-color {
								color: #ff9704;
								margin: 0 5rpx 0 10rpx;
							}
						}
					}
				}
			}
		}
		.list {
			padding: 0 23rpx;
			margin: 15rpx 0 0 0;
			box-sizing: border-box;
			background: #fff;
			.item {
				width: 100%;
				line-height: 90rpx;
				border-bottom: 1px solid #eee;
				display: flex;
				flex-direction: row;
				align-items: center;
				&:nth-last-child(1) {
					border-bottom: none;
				}
				.item-image {
					width: 50rpx;
					height: 50rpx;
					will-change: transform;
				}
				.item-main {
					color: #000;
					font-size: 26rpx;
					margin: 0 0 0 10rpx;
					.text-color {
						color: #ff9704;
						text-decoration: underline;
					}
				}
			}
		}
		.infor {
			margin: 15rpx 0 0 0;
			padding: 30rpx 25rpx;
			background: #fff;
			.title {
				color: #000;
				font-size: 32rpx;
				font-weight: bold;
			}
			.infor-details {
				text-indent: 30rpx;
				margin: 25rpx 0 0 0;
				.name {
					color: #000;
					font-size: 28rpx;
					font-weight: bold;
				}
				.no-data {
					color: #999;
					font-size: 26rpx;
					line-height: 34rpx;
					margin: 10rpx 0 0 0;
				}
			}
		}
		.tab {
			width: 100%;
			margin: 15rpx 0 0 0;
			background: #fff;
			.tab-nav {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				display: flex;
				flex-direction: row;
				.item {
					flex: 1;
					color: #7d7e80;
					font-size: 28rpx;
					text-align: center;
					transition: all .3s ease-in;
					&.active {
						color: #323233;
						border-bottom: 3px solid #ff9704;
					}
				}
			}
			.main {
				width: 100%;
				padding: 23rpx 5vw;
				box-sizing: border-box;
			}
		}
		.footer {
			height: 90rpx;
			padding: 0 0 0 25rpx;
			background: #fff;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.price {
				color: #ff5d04;
				font-size: 40rpx;
				font-weight: bold;
			}
			.submit {
				color: #fff;
				font-size: 32rpx;
				width: 230rpx;
				line-height: 90rpx;
				text-align: center;
				background: linear-gradient(to right, #ff5d04, #ff9704);
			}
		}
	}
</style>
