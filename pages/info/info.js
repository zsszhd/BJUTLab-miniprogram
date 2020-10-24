Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [{
      title:"实验预约",
      icon:"/images/info/f4.png"
    },{
      title: "实验记录",
      icon: "/images/info/f6.png"
    },{      
      title: "签到记录",
      icon: "/images/info/f1.png"      
    }, {
      title: "共享文档",
      icon: "/images/info/f5.png"
    }, {
      title: "器材信息",
      icon: "/images/info/f2.png"
    }, {
      title: "意见反馈",
      icon: "/images/info/f3.png"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   * 接入数据库接口
   */
  onLoad: function () {
    var that = this//不要漏了这句，很重要
    wx.request({
      url: 'https://api.bjutlab.cn/Experiment/order',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         that.setData({
           date: commit,//预约提交的时间
                 use,//实验室使用日期
                 time_range,//实验室使用时间段。格式：8:00~14:30	
                 lab_id,//实验室编号
                 usage,//实验室借用的用途。100字以内
                 type,//预约者类型
         })
      }
    })
  },

  
    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})