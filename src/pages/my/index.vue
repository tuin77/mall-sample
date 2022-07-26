<template>
  <view class="my-container">
    <view class="header-box">
      <image
        class="avatar"
        :src="apiUserInfoMap.base.avatarUrl"
        mode="aspectFill"
      ></image>
      <view class="r">
        <view class="nick"> {{ apiUserInfoMap.base.nick }}</view>
        <view class="uid">{{ apiUserInfoMap.base.tags }}</view>
      </view>
    </view>

    <view class="my-order card-box">
      <u-cell
        title="我的订单"
        class="my-order"
        value="全部订单"
        :border="false"
        isLink
        clickable
        url="/pages/order/index"
      >
      </u-cell>
      <u-grid col="5" :border="false" @click="orderGridClick">
        <u-grid-item name="0">
          <view class="grid_item">
            <u-icon name="rmb-circle" size="52rpx"></u-icon>
            <text class="txt">待处理</text>
          </view>
        </u-grid-item>
        <u-grid-item name="1">
          <view class="grid_item">
            <u-icon name="car" size="52rpx"></u-icon>
            <text class="txt">待发货</text>
          </view>
        </u-grid-item>
        <u-grid-item name="2">
          <view class="grid_item">
            <u-icon name="gift" size="52rpx"></u-icon>
            <text class="txt">待收货</text>
          </view>
        </u-grid-item>
        <u-grid-item name="3">
          <view class="grid_item">
            <u-icon name="thumb-up" size="52rpx"></u-icon>
            <text class="txt">待发布</text>
          </view>
        </u-grid-item>
        <u-grid-item name="99">
          <view class="grid_item">
            <u-icon name="server-man" size="52rpx"></u-icon>
            <text class="txt">订单问题</text>
          </view>
        </u-grid-item>
      </u-grid>
    </view>

    <view class="card-box">
      <u-cell
        title="优惠券"
        isLink
        clickable
        url="/pages/my/info-menu"
      ></u-cell>
      <u-cell
        title="收货地址"
        isLink
        clickable
        url="/pages/about/about?key=aboutus"
      ></u-cell>
      <u-cell title="平台客服" isLink clickable url="/pages/help/list"></u-cell>
      <u-cell title="用户协议" isLink clickable url="/pages/help/list"></u-cell>
      <u-cell
        title="隐私政策"
        isLink
        clickable
        url="/pages/my/feedback"
      ></u-cell>
    </view>
    <!-- #ifndef MP-WEIXIN -->
    <view class="btn-block">
      <u-button text="退出" @click="loginout"></u-button>
    </view>
    <!-- #endif -->
    <view class="ingtu-app"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      needLogin: "false",
      apiUserInfoMap: {
        base: {
          avatarUrl:
            "http://video.yingtu.co/useravatars/ingtube_1242343501757161472_1591142028054.jpg",
          nick: "MEVIUS",
          tags: "信用良好",
        },
      },
      balance: 0,
      freeze: 0,
      score: 0,
      growth: "0",
      pic: "https://uviewui.com/common/logo.png",
      show: true,
      // version: getApp().globalData.version,
      version: undefined,
      cardMyList: undefined,
    };
  },
  onLoad() {
    console.log();
  },
  methods: {
    orderGridClick(status) {
      // if (status == 99) {
      //   uni.navigateTo({
      //     url: `/pages/order/index?status=${status}`
      //   })
      // } else {
      //   uni.navigateTo({
      //     url: `/pages/order/index?status=${status}`
      //   })
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  background: linear-gradient(132deg, #fff1c8 0%, #fafafa 100%);
  height: 100%;
  position: relative;
  backdrop-filter: blur(26px);
}

.header-box {
  padding: 32rpx;
  display: flex;
  align-items: center;
  color: #333;
}

.header-box .avatar {
  width: 60px;
  height: 60px;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.ingtu-app {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 52px;
  background: url("https://video.yingtu.co/1411878924773752832/165849052364586173.png")
    no-repeat center;
  background-size: 100% 52px;
}

.header-box .btn {
  margin-left: 32rpx;
}

.header-box .r {
  margin-left: 32rpx;
  font-size: 28rpx;

  .nick {
    height: 18px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #252525;
    line-height: 18px;
  }
}

.grid_item {
  padding: 24rpx 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .txt {
    margin-top: 16rpx;
    font-size: 12px;
    color: #252525;
  }
}

.card-box {
  margin: 0 12px 12px;
  border-radius: 8px;
  background-color: #fff;

  ::v-deep .u-cell__body {
    height: 52px;
    .u-cell__title-text {
      font-size: 14px;
      color: #000;
    }
  }
}

.btn-block {
  padding: 0 12px;
}

.my-order {
  // margin-bottom: 12px;
  ::v-deep .u-cell__title-text {
    font-weight: 500;
    color: #3e3d3e;
  }
}
</style>
