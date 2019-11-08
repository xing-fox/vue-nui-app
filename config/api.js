export const RequestApi = (url, methods, data) => {
	return new Promise((reslove, reject) => {
		uni.request({
		    url: url,
			method: methods,
			data: data,
		    success: res => reslove(res),
			error: err => reject(err)
		})
	})
}
