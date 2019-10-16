import Vue from 'vue'
import config from '../config/index.js'
import { Toast, Dialog } from 'vant';
import axios from 'axios'

const ajax = axios.create({
	baseURL: config.baseUrl,
	withCredentials: true,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	transformRequest: [function (data) {
		let ret = ''
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		}
		return ret
	}]
})
const api = {
	OSSupload(params) {
		const formData = new FormData()
		formData.append("key", params.key);
		formData.append("OSSAccessKeyId", params.OSSAccessKeyId);
		formData.append("policy", params.policy);
		formData.append('signature', params.signature);	//oss签名
		formData.append('success_action_status', '200');	//oss签名
		formData.append('file', params.file);	//要上传的文件对象
		return axios.post(params.host, formData).then(res => {
			return true
		}).catch(err => {
			return false
		})
	},
	check_auth(params) {
		loading()
		return ajax.get(`hapi.php?act=check_auth`, { params }).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else if (res.data.error_no == 10001) {
				location.replace(`http://zs.yunyuh5.com/tyggxz/hapi/auth.php?front_url=${encodeURIComponent(location.href)}`)
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	get_job_info(params) {
		return ajax.get(`hapi.php?act=get_job_info`, { params }).then(res => {
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	send_mail(params) {
		loading()
		return ajax.post(`hapi.php?act=send_mail`, params).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	get_oss_info(params) {
		return ajax.get(`hapi.php?act=get_oss_info`, { params }).then(res => {
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	create_resume(params) {
		loading()
		return ajax.post(`hapi.php?act=create_resume`, params).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	deliver(params) {
		loading()
		return ajax.post(`hapi.php?act=deliver`, params).then(res => {
			Toast.clear();
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
	my_job_list(params) {
		return ajax.get(`hapi.php?act=my_job_list`, { params }).then(res => {
			if (res.data.error_no == 0) {
				return res.data
			} else {
				Dialog.alert({
					message: res.data.msg
				})
				return false
			}
		})
	},
}
function loading() {
	return Toast.loading({
		message: '加载中...',
		loadingType: 'spinner',
		duration: 0,
	});
}

export default api