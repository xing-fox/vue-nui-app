<script>
import { RequestApi } from 'config/api'
import { GetAllSchoolUrl } from 'config/fetch'
export default {
	/**
	 * @storage_school 所有学校
	 *  
	 */
	async onLaunch () {
		const Data = await RequestApi(`${GetAllSchoolUrl}`, 'POST', {
			pageSize: 200
		})
		try {
			// 存储所有学校数据数据
		    uni.setStorageSync('storage_school', Data)
		} catch (e) {}
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>
