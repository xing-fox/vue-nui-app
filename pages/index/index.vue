<template>
	<view class="content">
		<view class="content-picker">
			<picker class="picker picker-school" mode="multiSelector" @columnchange="choiseCollege" @change="changeCollege" :value="schoolIndex" :range="schoolArray">
				<view class="picker-text school-text">{{ collegeName }}</view>
				<image class="picker-img" src="/static/icon/arr_down.png"></image>
			</picker>
			<picker class="picker picker-course" mode="multiSelector" @columnchange="choiseClass" @change="changeClass" :value="classIndex" :range="classArray">
				<view class="picker-text course-text">{{ className }}</view>
				<image class="picker-img" src="/static/icon/arr_down.png"></image>
			</picker>
		</view>
		<scroll-view class="content-main" scroll-y="true" @scrolltolower="addData">
			<view class="content-list" v-for="item in AllData" :key="item.classId">
				<view class="list">
					<image class="list-img" mode="aspectFill" src="https://dueape-nation-1255328906.cos.ap-singapore.myqcloud.com/image/2019103006105513.jpg"></image>
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
			<view v-if="getMoreData" class="data">正在加载数据...</view>
			<view v-else class="data">没有更多数据了~</view>
		</scroll-view>
	</view>
</template>

<script>
import { RequestApi } from 'config/api';
import { GetAllClassUrl } from 'config/fetch';
export default {
	data() {
		return {
			AllData: [],
			pageNum: 1,
			collegeId: undefined, // 学校字段
			courseType: undefined, // 班课类型
			getMoreData: true, // 获取更多数据
			AllDataLength: 0, // 数据总长度
			className: '班课类型', // 班课类型
			collegeName: '学校', // 学校名称
			schoolAUSData: [], // 澳洲学校
			schoolUSAData: [], // 美国学校
			allSchoolData: [], // 所有学校信息
			schoolArray: [['全部', '澳洲', '美国'], ['全部']],
			schoolIndex: [0, 0],
			classMealData: ['全学期课业解析班'],
			classUnMealData: ['作业讲解班', '周课知识点班', '期中冲刺班', '期末冲刺班', '体验班'],
			classArray: [['全部', '非套餐', '套餐'], ['全部']],
			classIndex: [0, 0]
		};
	},
	async onLoad() {
		const self = this;
		const Data = await this.getData();
		this.AllData = Data.data.results.data;
		this.AllDataLength = Data.data.results.pages;
		this.getMoreData = Number(Data.data.results.pageNum) !== 1;
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
	},
	methods: {
		/**
		 * 获取数据
		 */
		getData() {
			return RequestApi(`${GetAllClassUrl}`, 'POST', {
				order: 'desc',
				sortField: 'class_id',
				pageSize: 10,
				pageNum: this.pageNum,
				displayFlag: 1,
				courseType: this.courseType,
				collegeId: this.collegeId
			});
		},
		/**
		 * 添加数据
		 */
		async addData() {
			if (this.AllDataLength > this.pageNum) {
				this.pageNum += 1;
				const Data = await this.getData();
				this.AllData = this.AllData.concat(Data.data.results.data);
			} else {
				this.getMoreData = false;
			}
		},
		/**
		 * 选择学校
		 */
		choiseCollege(e) {
			if (e.detail.column === 0) this.schoolArray.splice(1, 1, [['全部'], this.schoolAUSData, this.schoolUSAData][e.detail.value]);
		},
		/**
		 * 改变学校
		 */
		changeCollege(e) {
			this.setData();
			this.collegeName = [['全部'], this.schoolAUSData, this.schoolUSAData][e.detail.value[0]][e.detail.value[1]];
			if (this.collegeName === '全部') {
				this.collegeId = undefined;
			} else {
				this.allSchoolData.map(item => {
					if (item.collegeName === this.collegeName) this.collegeId = item.collegeId;
				});
			}
			this.getData().then(res => {
				this.AllData = res.data.results.data;
				this.AllDataLength = res.data.results.pages;
				this.getMoreData = Number(res.data.results.pageNum) !== 1;
			});
		},
		/**
		 * 选择课程
		 */
		choiseClass(e) {
			if (e.detail.column === 0) this.classArray.splice(1, 1, [['全部'], this.classUnMealData, this.classMealData][e.detail.value]);
		},
		/**
		 * 改变课程
		 */
		changeClass(e) {
			this.setData();
			this.className = [['全部'], this.classUnMealData, this.classMealData][e.detail.value[0]][e.detail.value[1]];
			[{
				name: '全部',
				type: undefined
			},
			{
				name: '作业讲解班',
				type: 1
			},
			{
				name: '周课知识点班',
				type: 2
			},
			{
				name: '期中冲刺班',
				type: 3
			},
			{
				name: '期末冲刺班',
				type: 4
			},
			{
				name: '体验班',
				type: 5
			},
			{
				name: '全学期课业解析班',
				type: 6
			}].map(item => {
				if (item.name === this.className) this.courseType = item.type;
			});
			this.getData().then(res => {
				this.AllData = res.data.results.data;
				this.AllDataLength = res.data.results.pages;
				this.getMoreData = Number(res.data.results.pageNum) !== 1;
			});
		},
		/**
		 * reset data
		 */
		setData() {
			[this.pageNum, this.AllData, this.getMoreData] = [1, [], true];
		}
	}
};
</script>

<style lang="less">
.content {
	display: flex;
	flex-direction: column;
	width: 100%;
	line-height: 1;
	padding-top: 120rpx;
	background: #f5f5f5;
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
		.picker {
			color: #999;
			font-size: 26rpx;
			padding-left: 20rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			background: #e8e8e8;
			position: relative;
			&.picker-school {
				width: 280rpx;
				height: 70rpx;
			}
			&.picker-course {
				width: 400rpx;
				height: 70rpx;
			}
			.picker-text {
				height: 70rpx;
				line-height: 70rpx;
				display: inline-block;
				overflow: hiddne;
				white-space: nowrap;
				text-overflow: ellipsis;
				&.school-text {
					width: 200rpx;
				}
				&.course-text {
					width: 320rpx;
				}
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
		}
	}
	.content-main {
		height: calc(100vh - 120rpx);
		.content-list {
			margin-right: 25rpx;
			margin-left: 25rpx;
			margin-bottom: 30rpx;
			padding-top: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 30rpx;
			border-radius: 10rpx;
			box-shadow: 0rpx -2rpx 8rpx rgba(0, 0, 0, 0.06);
			background: #fff;
			&:nth-last-child(1) {
				margin-bottom: 0;
			}
			.list {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
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
					.list-main-content {
						width: 100%;
						color: #999;
						font-size: 26rpx;
						line-height: 28rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						.list-main-img {
							width: 26rpx;
							height: 26rpx;
							margin-right: 15rpx;
						}
						.list-right {
							margin-left: 15rpx;
						}
					}
				}
			}
		}
	}
}
.text-color {
	color: #ff9704;
	font-size: 32rpx;
	line-height: 34rpx;
	margin-right: 10rpx;
}
.data {
	color: #999;
	font-size: 28rpx;
	width: 100%;
	line-height: 30rpx;
	padding-bottom: 20rpx;
	text-align: center;
}
</style>
