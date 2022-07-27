<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    async getData() {
      const [err, res] = await uni.login({
        provider: "weixin",
      });
      console.log(err);
      let r = await this.$api.wxLogin({
        wechat_code: res.code,
      });
      console.log(121, r);
    },
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
page,
uni-page-body,
#app {
  height: 100%;
}
</style>
