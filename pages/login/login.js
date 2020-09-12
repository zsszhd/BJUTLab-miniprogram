//获取应用实例
const app = getApp()
Page({
  data: {
    count: '',
    password: '',
    showClearBtn: false,
    isWaring: false,
    isLoggedIn: true,
    url_logo: app.globalData.url_logo,
  },

  // 登陆表单数据处理-用户名输入框变更
  onInputCount(evt) {
    const count = evt.detail.value
    this.data.count = count
    this.setData({
      showClearBtnCount: !!count.length,
      isWaring: false,
    })

  },
  // 登陆表单数据处理-密码输入框变更
  onInputPassword(evt) {
    const password = evt.detail.value
    this.data.password = password
    this.setData({
      showClearBtnPassword: !!password.length,
      isWaring: false,
    })

  },
  // 登陆表单数据处理-用户名输入框清空
  onClearCount() {
    this.setData({
      count: '',
      showClearBtnCount: false,
      isWaring: false,
    })
  },
  // 登陆表单数据处理-密码输入框清空
  onClearPassword() {
    this.setData({
      password: '',
      showClearBtnPassword: false,
      isWaring: false,
    })
  },

  // 确定按钮处理
  onConfirm() {
    // 用户名格式不正确时，warning效果的判定
    if (this.data.count.length !== 8) {
      this.setData({
        isWaring: true,
      })
    }

    wx.showLoading({
      title: '登录中',
    })
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.bjutlab.cn/Auth/login', // 登录接口
          method: 'POST',
          data: {
            'id': this.data.count,
            'password': this.data.password,
            type:0          
          },
          header: {
            "Content-Type":"application/x-www-form-urlencoded"
            /*经过反复测试
              改成 application/text不行
              json不行
              application/json;charset=UTF-8
              json;charset=UTF-8;
              */
          },
         // path: 'login',
          //success: wx.loginSuccess,          
          success: function (res) {
            console.log(res.data);
            wx.setStorage({
              key: "student",
              data: res.data
            });
            wx.redirectTo({
              url: "../pages/info" //跳转页面
            })
          }
            
        })
      },
    })
  },

  onLoad: function(options) {
    if (typeof options !== 'undefined' && typeof options.year !== 'undefined' && typeof options.term !== 'undefined'  && typeof options.courseId !== 'undefined') {
      app.globalData.redirect = {
        year: options.year,
        term: options.term,
        courseId: options.courseId,
      }
    }

    if (app.globalData.student_id && app.globalData.authorization && app.globalData.open) {
      wx.getBackgroundFetchToken({
        complete: () => {
          if (res.errMsg !== 'getBackgroundFetchToken:ok' || res.token !== app.globalData.authorization) {
            wx.setBackgroundFetchToken({
              token: app.globalData.authorization,
              complete: () => {
                wx.switchTab({
                  url: '/pages/overAllPage/overAllPage',
                })
              },
            })
          } else {
            wx.switchTab({
              url: '/pages/overAllPage/overAllPage',
            })
          }
        },
      })
    } else {
      app.globalData.authorization = ''
      app.globalData.open = ''
      app.globalData.student_id = ''
      this.setData( { isLoggedIn: false } )
    }
  },

  onShareAppMessage: function() {
    return {
      title: '实验室管理',
      path: '/pages/login/login',
    }
  },
  
  register: function (event) {
    wx.redirectTo({
      url: "/pages/register/register"
    });
  }
})

export {}
