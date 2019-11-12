<template>
	<view class="content">
		<image class="cont-bg" src="/static/login-bg.png" mode=""></image>
		<view class="cont-main">
			<image class="logo" src="/static/login-logo.png"></image>
			<view class="title">报名前请完善您的个人信息</view>
			<view class="main-form">
				<view class="list">
					<image class="icon" src="/static/login/school.png"></image>
					<picker class="value" mode="multiSelector" @columnchange="choiseCollege" @change="changeCollege" :value="schoolIndex" :range="schoolArray">
						{{ collegeName }}
					</picker>
					<image class="arrow" src="/static/icon/arr_right.png"></image>
				</view>
				<view class="list">
					<image class="icon" src="/static/login/class.png"></image>
					<input class="value" placeholder="请选择您的专业" />
				</view>
				<view class="list">
					<image class="icon" src="/static/login/name.png"></image>
					<input class="value" placeholder="请输入您的姓名" />
				</view>
				<view class="list">
					<image class="icon" src="/static/login/weixin.png"></image>
					<input class="value" placeholder="请输入您的微信号" />
				</view>
				<view class="list">
					<image class="icon" src="/static/login/phone.png"></image>
					<view class="code" @click="choiseCodeStatus=true">+{{ codeNumber }}</view>
					<input class="phone" placeholder="请输入您的手机号" />
				</view>
				<view class="list">
					<input class="code" placeholder="请输入验证码" />
					<view class="getCode">获取验证码</view>
				</view>
			</view>
			<view @click="nextFunc" class="footer">下一步</view>
		</view>
		<uni-drawer :visible="choiseCodeStatus" mode="right" @close="choiseCodeStatus=false">
			<scroll-view class="drawer" scroll-y="true" show-scrollbar="true">
				<view class="drawer-list">
					<view class="title">热门</view>
					<view class="main" v-for="(item, index) in codeCity.hotList" :key="index" @click="changeCode(item.value)">
						<view class="country">{{ item.name }}</view>
						<view class="code">+{{ item.value }}</view>
					</view>
				</view>
				<view class="drawer-list" v-for="(item, index) in codeCity.nation" :key="index">
					<view class="title">{{ item.key }}</view>
					<view class="main" v-for="(list, eq) in item.list" :key="eq" @click="changeCode(list.value)">
						<view class="country">{{ list.name }}</view>
						<view class="code">+{{ list.value }}</view>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
// import { RequestApi } from 'config/api';
// import { GetAllClassUrl } from 'config/fetch';
import City from './country.js';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
export default {
	data() {
		return {
			setTime: 59, // 倒计时
			codeCity: City, // 区域code
			codeNumber: '86', // 区号
			schoolArray: [['澳洲', '美国']],
			schoolAUSData: [], // 澳洲学校
			schoolUSAData: [], // 美国学校
			schoolIndex: [0, 0],
			collegeName: '请选择您的学校',
			choiseCodeStatus: false
		};
	},
	onLoad() {
		// 获取学校信息
		const self = this
		uni.getStorage({
			key: 'storage_school',
			success: function(res) {
				self.allSchoolData = res.data.data.results.data;
				res.data.data.results.data.map(item => {
					if (Number(item.countryId) === 1) self.schoolAUSData.push(item.collegeName);
					if (Number(item.countryId) === 2) self.schoolUSAData.push(item.collegeName);
				});
				self.schoolArray.splice(1, 1, self.schoolAUSData);
			}
		});
	},
	components: {
		uniDrawer
	},
	methods: {
		nextFunc() {},
		/**
		 * 选择学校
		 */
		choiseCollege(e) {
			this.schoolArray.splice(1, 1, [this.schoolAUSData, this.schoolUSAData][e.detail.value]);
		},
		/**
		 * 改变学校
		 */
		changeCollege(e) {
			this.collegeName = [this.schoolAUSData, this.schoolUSAData][e.detail.value[0]][e.detail.value[1]];
		},
		/**
		 * 选择区号
		 */
		changeCode (data) {
			this.codeNumber = data
			this.choiseCodeStatus = false
		}
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	min-height: 100vh;
	line-height: 1;
	background: #f5f5f5;
	position: relative;
	.cont-bg {
		width: 100%;
		height: 412rpx;
	}
	.cont-main {
		width: 100%;
		padding-top: 70rpx;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		.logo {
			width: 282rpx;
			height: 68rpx;
		}
		.title {
			color: #fff;
			font-size: 36rpx;
			letter-spacing: 2rpx;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
		}
		.main-form {
			margin-left: 25rpx;
			margin-right: 25rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
			border-radius: 10rpx;
			box-shadow: 0rpx -2rpx 8rpx rgba(0, 0, 0, 0.06);
			background: #fff;
			.list {
				width: 100%;
				height: 90rpx;
				border-bottom: 1px solid #eee;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				&:nth-last-child(1) {
					border-bottom: none;
				}
				.icon {
					width: 60rpx;
					height: 60rpx;
				}
				.value {
					flex: 1;
					color: #000;
					font-size: 28rpx;
					text-align: left;
				}
				.code {
					flex: 1;
					color: #000;
					font-size: 28rpx;
					text-align: left;
				}
				.getCode {
					color: rgb(255, 121, 4);
					font-size: 28rpx;
					width: 160rpx;
					text-align: right;
					position: relative;
					&::before {
						content: '';
						width: 2rpx;
						height: 40rpx;
						background: #eee;
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						margin: auto 0;
					}
				}
				.phone {
					flex: 3;
					color: #000;
					font-size: 28rpx;
					padding-left: 20rpx;
					text-align: left;
					position: relative;
					&::before {
						content: '';
						width: 2rpx;
						height: 40rpx;
						background: #eee;
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						margin: auto 0;
					}
				}
				.arrow {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
	.footer {
		color: #fff;
		font-size: 32rpx;
		margin-top: 30rpx;
		margin-left: 25rpx;
		margin-right: 25rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 10rpx;
		text-align: center;
		background: linear-gradient(to right, #ff5d04, #ff9704);
		&:active {
			background: #ff5d04;
		}
	}
	.drawer {
		height: 100%;
		padding: 30rpx 20rpx 30rpx 30rpx;
		overflow-y: scroll;
		box-sizing: border-box;
		.drawer-list {
			width: 100%;
			text-align: center;
			.title {
				color: #c8c8c8;
				font-size: 30rpx;
				margin: 0 0 20rpx 0;
			}
			.main {
				width: 100%;
				line-height: 90rpx;
				display: flex;
				justify-content: center;
				justify-content: space-between;
				.country {
					color: #000;
					font-size: 32rpx;
				}
				.code {
					color: #c8c8c8;
					font-size: 30rpx;
				}
			}
		}
	}
}
</style>
