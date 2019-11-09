<template>
	<view class="content">
		<view class="main">
			<image class="logo" src="/static/dueape-logo.png"></image>
			<view class="text">DueApe组建于2011年，是以技术为驱动的海外教育互联网企业，我们致力于打造服务全球的海外中国留学生一站式辅导平台。</view>
			<view class="text">DueApe切实地帮助每一位海外中国留学生应对海外学习中的困难与挑战，提升GPA，保持优秀的成绩，树立中国留学生在海外教育中的优势。</view>
			<view class="label">3000+tutor</view>
			<view class="text">DueApe拥有领先全球的大规模精英工程师社群，汇聚了3000多名精英导师，按严格标准打造了一支高水准教学的优秀师资团队。</view>
			<view class="text">我们的导师均来自美国、澳洲、英国、加拿大、中国等国家TOP100院校，是在计算机、工程、商科等领域获得了硕士及以上学位的精英人才；其中，还有数百位来自微软、腾讯、阿里、百度、京东、字节跳动等名企的高级工程师。</view>
			<view class="label">累计服务人数超过30万+</view>
			<view class="text">DueApe的顶尖教学能力与强大的导师实力，已在用户中积累了深厚的口碑，享誉业内，并树立了“留学生课业辅导服务专家”高端品牌形象。</view>
			<view class="text">截至2019年，DueApe服务了超过30万中国留学生，核心产品覆盖计算机、金融、商科、统计等众多学科，帮助留学生提高quiz、assignment、homework、project和大小考试的成绩，全力打造“DueApe，成就你我”的价值品牌。</view>
		</view>
	</view>
</template>

<style lang="less">
	.content {
		line-height: 1;
		min-height: 100vh;
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		background: #f5f5f5;
		.main {
			padding-top: 40rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
			padding-bottom: 40rpx;
			background: #fff;
			text-align: center;
			.logo {
				width: 269rpx;
				height: 72rpx;
				margin-bottom: 30rpx;
			}
			.text {
				font-size: 26rpx;
				line-height: 40rpx;
				text-indent: 60rpx;
				margin-bottom: 20rpx;
				text-align: left;
			}
			.label {
				font-weight: bold;
				margin-top: 40rpx;
				margin-bottom: 20rpx;
				padding-left: 20rpx;
				text-align: left;
				position: relative;
				&::after{
					content: '';
					width: 10rpx;
					height: 25rpx;
					background: #ff9704;
					vertical-align: middle;
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					margin: auto 0;
				}
			}
		}
	}
</style>
