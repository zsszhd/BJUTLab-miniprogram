// pages/w_my/w_my.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    login_confirm: false,//是否是登录
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    first_jin:true,//是否是首次进入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.login_confirm && app.globalData.login_confirm == true) {
      this.setData({
        login_confirm: app.globalData.login_confirm,            
      })
    } else {
      wx.showModal({
        title: "温馨提示",
        content: "您需要注册登录后才能使用此功能",
        confirmColor: "#4fafc9",
        confirmText: "注册登录",
        cancelText: "返回首页",
        mask: true,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/login/login"
            })
          } else if (res.cancel) {
            wx.reLaunch({
              url: "/pages/info/info"
            })
          }
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.first_jin = false;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     // 判断是否是首次进入
    if (this.data.first_jin){

    }else{
      this.onLoad();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  // 预约记录
  my_list1: function (e) {
    if(this.data.member!=true){
      this.onLoad();
    }else{
      wx.navigateTo({
        url: "/pages/my_record/my_record"
      })
    }
  },
  // 我的预约
  my_list2: function (e) {
    console.log(this.data.member)
    if (this.data.member != true) {
      this.onLoad();
    } else {
      wx.navigateTo({
        url: "/pages/my/my"
      })
    }
  },

  
  // 我的信息
  my_list4: function (e) {
    if (this.data.member != true) {
      this.onLoad();
    } else {
      wx.navigateTo({
        url: "/pages/my_information/my_information"
      })
    }
  },
  
})