<template>
	<view class="content">
		<image class="cont-bg" src="/static/login-bg.png" mode=""></image>
		<view class="cont-money">
			<image src="/static/login-bg.png" mode=""></image>
			<image src="/static/login-bg.png" mode=""></image>
			<view class="cont-money-num">60</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.content {
		width: 100%;
		height: 100vh;
		background: #f5f5f5;
		position: relative;
		.cont-bg {
			width: 100%;
			height: 412rpx;
		}
		.cont-money {
			width: 100%;
			padding: 1rem 0 0 0;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
		}
	}
</style>
