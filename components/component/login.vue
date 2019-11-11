<template>
	<view>
		<uni-popup ref="popup" type="bottom">
			123
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	mounted() {
		console.log(123)
		this.$refs.popup.open()
	}
};
</script>

<style>
	.pop-content {
		width: 100%;
		background: #fff;
	}
</style>
