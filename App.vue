<script>
export default {
  globalData: {
    goLogin: false,
    version: "2.0.0",
    sysconfigkeys:
      "mallName,shopMod,share_profile,recharge_amount_min,open_growth,shopping_cart_vop_open,needIdCheck",
    wxpayOpenAppId: "wx9b04553fd8c7b9c3", // 微信开放平台的移动端应用appID
    openAlipayProvider: false, // 是否开通支付宝支付
    addressLevel: 3, // 省市区到3级还是4级，可选 3 或者 4
  },
  onLaunch() {
    // console.log('App Launch');
    // const _this = this
    this.checkForUpdate(); // 检查新版本
    this.queryConfigBatch();
  },
  onShow(e) {
    console.log("App Show");
    if (e && e.query && e.query.inviter_id) {
      this.$u.vuex("referrer", e.query.inviter_id);
    }
    if (e && e.query && e.query.kjJoinUid) {
      this.$u.vuex("kjJoinUid", e.query.kjJoinUid);
    }
    if (e && e.query && e.query.code) {
      // 微信登陆
      this.wxmpLogin(e.query.code);
    } else {
      // this.autoLogin()
    }
  },
  onHide() {
    console.log("App Hide");
  },
  methods: {
    async queryConfigBatch() {
      // const { sysconfigkeys } = this.globalData
      // if (!sysconfigkeys) {
      // }
      // https://www.yuque.com/apifm/nu0f75/dis5tl
      // const res = await this.$wxapi.queryConfigBatch(sysconfigkeys)
      // if (res.code == 0) {
      // 	const sysconfigMap = {}
      // 	res.data.forEach(config => {
      // 		sysconfigMap[config.key] = config.value
      // 	})
      // 	this.$u.vuex('sysconfigMap', sysconfigMap)
      // }
    },
    checkForUpdate() {
      // #ifdef MP
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
      });
      updateManager.onUpdateReady((res) => {
        uni.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
      updateManager.onUpdateFailed((res) => {
        // 新的版本下载失败
      });
      // #endif
      // #ifdef APP-PLUS
      // APP 自动更新
      // #endif
    },
    async wxmpLogin(code) {
      // https://www.yuque.com/apifm/nu0f75/lh6cd3
      // const res = await this.$wxapi.wxmpAuth({
      // 	code
      // })
      // if (res.code == 0) {
      // 	this.$u.vuex('token', res.data.token)
      // 	this.$u.vuex('uid', res.data.uid)
      // 	this.$u.vuex('openid', res.data.openid)
      // 	setTimeout(() => {
      // 		uni.$emit('loginOK', {})
      // 	}, 500)
      // }
    },
    // async autoLogin() {
    // 	// 自动登陆
    // 	// #ifdef MP-WEIXIN
    // 	const isLogined = await WXAUTH.checkHasLogined()
    // 	if (!isLogined) {
    // 		await WXAUTH.authorize()
    // 		await WXAUTH.bindSeller()
    // 	}
    // 	setTimeout(() => {
    // 		uni.$emit('loginOK', {})
    // 	}, 500)
    // 	// #endif
    // 	// #ifdef MP-QQ
    // 	const isLogined = await QQAUTH.checkHasLogined()
    // 	if (!isLogined) {
    // 		await QQAUTH.authorize()
    // 		await QQAUTH.bindSeller()
    // 	}
    // 	setTimeout(() => {
    // 		uni.$emit('loginOK', {})
    // 	}, 500)
    // 	// #endif
    // 	// #ifdef MP-TOUTIAO
    // 	const isLogined = await TTAUTH.checkHasLogined()
    // 	if (!isLogined) {
    // 		await TTAUTH.authorize()
    // 		await TTAUTH.bindSeller()
    // 	}
    // 	setTimeout(() => {
    // 		uni.$emit('loginOK', {})
    // 	}, 500)
    // 	// #endif
    // 	// #ifdef H5
    // 	const isLogined = await this.checkHasLoginedH5()
    // 	if (!isLogined) {
    // 		// 判断是普通浏览器还是微信浏览器
    // 		const ua = window.navigator.userAgent.toLowerCase();
    // 		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    // 			// 微信内置浏览器打开的
    // 			// https://www.yuque.com/apifm/nu0f75/fpvc3m
    // 			const res = await this.$wxapi.siteStatistics()
    // 			const wxMpAppid = res.data.wxMpAppid
    // 			let _domian = this.globalData.h5Domain + '/pages/index/index'
    // 			_domian = encodeURIComponent(_domian)
    // 			console.log(_domian);
    // 			if (!this.globalData.goLogin) {
    // 				this.globalData.goLogin = true
    // 				window.parent.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    // 					wxMpAppid + '&redirect_uri=' + _domian +
    // 					'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    // 			}
    // 		} else {
    // 			// 其他浏览器打开的， 按需登陆，不能直接跳转到登陆界面
    // 			// uni.navigateTo({
    // 			// 	url: "/pages/login/login"
    // 			// })
    // 		}
    // 	}
    // 	// #endif
    // },
  },
};
</script>

<style lang="scss">
page,
uni-page-body,
#app {
  height: 100%;
}

@import "@/uni_modules/uview-ui/index.scss";
</style>
