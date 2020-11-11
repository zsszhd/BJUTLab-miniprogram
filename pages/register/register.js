Page({
  data: {
    /*
    school_id: school_id,
    name: name,
    pass: pass,
    checkNum: checkNum
    */

    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['学生', '教职工', '管理人员'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,

  },

  
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

  },
  
  onSubmit: function (event) {
    var value = event.detail.value;
    var school_id = value.school_id;
    var name = value.name;
    var pass = value.pass;
    var checkPass = value.checkPass;
    this.setData({
      school_id: school_id,
      name: name,
      pass: pass,
      checkPass: checkPass,
    });
    var that=this;
    that.register();
  },
  register: function (event) {
    wx.clearStorageSync();
    var that = this;
    var school_id = that.data.school_id;
    var name = that.data.name;
    var checkNum = that.data.checkNum;
    var pass = that.data.pass;
    var checkPass = that.data.checkPass;
    if(school_id==''||name==''||checkNum==''||pass==''||checkPass==''){
      wx.showToast({
        title: '信息不完整！',
        duration: 2000,
       image: '/images/register/wrong.png'
      })
      return false;
    }else if(pass != checkPass){
      wx.showToast({
        title: '两次密码不一致！',
        duration: 2000,
        image: '/images/register/wrong.png'
      })
      return false;
    }
    /*var checkid = /^1(3|4|5|7|8)\d{9}$/;
    if (!(checkid.test(school_id))) {
      wx.showToast({
        title: '错误！',
        duration: 2000,
        image: '/images/register/wrong.png'
      })
      return false;
    }*/
    var checkName = /^.{2,11}$/;
    if(!(checkName.test(name))){
      wx.showToast({
        title: '昵称为2-11位',
        duration: 2000,
        image: '/images/register/wrong.png'
      })
      return false;
    }
    var checkPass = /^.{6,15}$/; 
    if(!(checkPass.test(pass))){
      wx.showToast({
        title: '密码为6-15位',
        duration: 2000,
        image: '/images/register/wrong.png'
      })
      return false;
    }
    // var utilMd5 = require('../../utils/md5.js');
    //var pass = utilMd5.hexMD5(pass);
    //var checkNum = utilMd5.hexMD5(checkNum);
    wx.showLoading({title: '注册中...'});
    wx.request({
      url: 'https://api.bjutlab.cn/Auth/register/user',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        school_id: school_id,
        name: name,
        pass: pass,
        checkPass: checkPass
      },
      success: function (res) {
        var message = (res.data.msg);
        console.log(message);
        if (message != "注册成功") {
          wx.showModal({
            title: '注册失败！',
            content: '您还未获得内测权限'//有错误，但是我还没有找出来，我要吃饭了,哼~ 2020/9/19 11.49
          });
          wx.hideLoading();
          setTimeout(function () {
            wx.redirectTo({
              url: "/pages/register/register"
            });
          }, 2000)
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '注册成功',
            content: '请进行登录！'
          });
          setTimeout(function () {
            wx.redirectTo({
              url: "/pages/login/login"
            });
          }, 2000)
        }
      },
    })
  },
  login: function (event) {
    wx.redirectTo({
      url: "/pages/login/login"
    });
  }
})