document.addEventListener('deviceready', onDeviceReady, false)
window.$Native = {
  notification: null,
  permissions: null,
  diagnostic: null,
  toast: null,
  GaoDe: null,
  progress: null,
  CodePush: null,
  // AmapTrackPlugin: null
  checkPermission: () => {
    console.error("权限校验未初始化,请待初始化后校验")
    alert("权限校验未初始化")
    // 这个方法不建议用在功能调用前校验权限：比如获取定位时想要校验是否有权限，原因在于：如果用户已操作首次授权，且拒绝授权，则需要跳转至设置中修改，当修改app权限后可能会使app重启，所以可能回调失败，故不深究。（首次授权，会在登录时弹窗授权提示）
    /**
     * 如需要上面类型的授权 建议 加在initAllPermissions方法中
     * 或者基于 $Native.permissions 重新编写
     *  */
  }
}

function onDeviceReady() {
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)

  $Native.notification = navigator.notification
  $Native.toast = window.plugins.toast
  $Native.toast.hide()
  $Native.GaoDe = window.GaoDe
  // $Native.AmapTrackPlugin = cordova.plugins.AmapTrackPlugin
  $Native.permissions = cordova.plugins.permissions
  $Native.diagnostic = cordova.plugins.diagnostic
  $Native.progress = cordova.plugin.progressDialog

  initAllPermissions()
  checkUpdateApp()
}
window.onload = function () {
  new VConsole
  console.log(axios)
  axios("http://express.web-framework-bk89.1676369102958317.cn-shenzhen.fc.devsapp.net/hello2").then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })

  var buttonCheckPermission = document.querySelector("#buttonCheckPermission")
  var buttonRequestPermission = document.querySelector("#buttonRequestPermission")
  var buttonToCheckAllPermission = document.querySelector("#buttonToCheckAllPermission")
  var buttonToRequestAllPermission = document.querySelector("#buttonToRequestAllPermission")
  var buttonNotificationAlert = document.querySelector("#buttonNotificationAlert")
  var buttonNotificationConfirm = document.querySelector("#buttonNotificationConfirm")
  var buttonNotificationPrompt = document.querySelector("#buttonNotificationPrompt")
  var buttonSwitchToSettings = document.querySelector("#buttonSwitchToSettings")
  var buttonGetLocation = document.querySelector("#buttonGetLocation")
  var buttonGetSerialLocation = document.querySelector("#buttonGetSerialLocation")
  var buttonStopSerialLocation = document.querySelector("#buttonStopSerialLocation")
  var buttonDebugger = document.querySelector("#debugger")
  var buttonCheckForUpdate = document.querySelector("#checkForUpdate")

  buttonCheckPermission.addEventListener('click', checkPermission)
  buttonRequestPermission.addEventListener('click', requestPermission)
  buttonToCheckAllPermission.addEventListener('click', toCheckAllPermission)
  buttonToRequestAllPermission.addEventListener('click', toRequestAllPermission)
  buttonNotificationAlert.addEventListener('click', toNotificationAlert)
  buttonNotificationConfirm.addEventListener('click', toNotificationConfirm)
  buttonNotificationPrompt.addEventListener('click', toNotificationPrompt)
  buttonSwitchToSettings.addEventListener('click', switchToSettings)
  buttonGetLocation.addEventListener('click', getLocation)
  buttonGetSerialLocation.addEventListener('click', getSerialLocation)
  buttonStopSerialLocation.addEventListener('click', stopSerialLocation)
  buttonDebugger.addEventListener('click', initAllPermissions)
  buttonCheckForUpdate.addEventListener('click', checkUpdateApp)


  let buttton2 = document.querySelector("#button2")
  buttton2.addEventListener("click", () => {
    // startTrack().then().catch((e) => {
    //     console.log(e)
    // })
  })

  let button3 = document.querySelector("#button3")
  button3.addEventListener("click", () => {
    // stopTrack().then().catch((e) => {
    //     console.log(e)
    // })
  })
  let button4 = document.querySelector("#button4")
  button4.addEventListener("click", () => {
    // queryDistance().then().catch((e) => {
    //     console.log(e)
    // })
  })
}
function checkPermission() {
  console.info("run checkPermission")

  $Native.permissions.checkPermission($Native.permissions.CAMERA, function (status) {
    console.log("status:", status)
    if (status.hasPermission) {
      console.log("Yes :D ")
    }
    else {
      console.warn("No :( ")
    }
  })
}
function requestPermission() {
  console.info("run requestPermission")

  $Native.permissions.requestPermission($Native.permissions.CAMERA, status => {
    console.log("status:", status)
    if (!status.hasPermission) {
      console.error()
    }
  }, () => {
    console.warn('Camera permission is not turned on')
  })


}

function toCheckAllPermission() {
  console.log("run toCheckAllPermission")

  var allNeedCheckPermission = [
    $Native.permissions.ACCESS_COARSE_LOCATION,
    $Native.permissions.ACCESS_FINE_LOCATION,
    $Native.permissions.READ_PHONE_STATE,
    $Native.permissions.WRITE_EXTERNAL_STORAGE
  ]
  var res = {}
  allNeedCheckPermission.forEach(per => {
    $Native.permissions.checkPermission(per, function (status) {
      console.log("status:", status)
      if (status.hasPermission) {
        console.log("Yes :D ")
      }
      else {
        console.warn("No :( ")
      }
      res[per] = status.hasPermission
    })
  })
  console.log("所有权限校验结果：")
  console.table(res)

}
function toRequestAllPermission() {
  console.log("run toRequestAllPermission")

  var allNeedCheckPermission = [
    $Native.permissions.ACCESS_COARSE_LOCATION,
    $Native.permissions.ACCESS_FINE_LOCATION,
    $Native.permissions.READ_PHONE_STATE,
    $Native.permissions.WRITE_EXTERNAL_STORAGE
  ]

  $Native.permissions.requestPermissions(allNeedCheckPermission, status => {
    console.log("status:", status)
    if (!status.hasPermission) {
      console.error()
    }

  }, error => {
    console.log(error)
    console.warn('all permission is not turned on')
  })

}
// 带标题提示单按钮
function toNotificationAlert() {
  $Native.notification.beep(1)
  $Native.notification.alert(
    'You are the winner!',  // message
    (buttonIndex) => {
      alert('You selected button ' + buttonIndex)
    },         // callback
    'Game Over',            // title
    'OK'                // buttonName
  )
}
// 带标题多按钮无content提示
function toNotificationConfirm() {
  $Native.notification.beep(1)
  $Native.notification.confirm(
    'You are the winner!',  // message
    (buttonIndex) => {
      alert('You selected button ' + buttonIndex)
    },         // callback
    'Game Over',            // title
    ['OK', 'cancle', 'a']                // buttonName
  )
}
// 带标题多按钮+content + 额外内容
function toNotificationPrompt() {
  $Native.notification.beep(1)
  $Native.notification.prompt(
    'You are the winner!',  // message
    (buttonIndex, input1) => {
      alert('You selected button ' + buttonIndex + ' input1:' + input1)
    },         // callback
    'Game Over',            // title
    ['OK', 'cancle', 'a']                // buttonName
    , 'Jane Doe'
  )
}

function switchToSettings() {
  $Native.diagnostic.switchToSettings(function () {
    console.log("Successfully switched to Settings app")
  }, function (error) {
    console.error("The following error occurred: " + error)
  })
}

function getLocation() {
  $Native.GaoDe.getCurrentPosition(res => {
    console.log(res)
  }, err => {
    console.log(err)
  }, {
    androidOption: {
      locationMode: 1,//定位精度 1.精确定位 2.仅设备定位模式；3.低功耗定位模式
      gpsFirst: false,//设置是否gps优先，只在高精度模式下有效。默认关闭
      HttpTimeOut: 30000,//设置网络请求超时时间。默认为30秒。在仅设备模式下无效
      interval: 2000,//设置定位间隔。默认为2秒 连续定位有效
      needAddress: true,//设置是否返回逆地理地址信息。默认是true
      onceLocation: false,//设置是否单次定位。默认是false
      onceLocationLatest: false,//设置是否等待wifi刷新，默认为false.如果设置为true,会自动变为单次定位，持续定位时不要使用
      locationProtocol: 1,// 设置网络请求的协议。可选HTTP或者HTTPS。默认为HTTP。1.http 2.https
      sensorEnable: false,//设置是否使用传感器。默认是false
      wifiScan: true,//设置是否开启wifi扫描。默认为true，如果设置为false会同时停止主动刷新，停止以后完全依赖于系统刷新，定位位置可能存在误差
      locationCacheEnable: false//设置是否使用缓存定位，默认为true
    },
    // iosOption: {
    //     desiredAccuracy: 4,// 1。最适合导航用的定位  iOS4.0以后新增 2.精度最高的定位 3.定位精度在10米以内定位精度在10米以内 4.定位精度在100米以内 5.定位精度在1000米以内 6.3000m
    //     pausesLocationUpdatesAutomatically: "YES",//指定定位是否会被系统自动暂停。默认为NO。
    //     allowsBackgroundLocationUpdates: "NO",//是否允许后台定位。默认为NO。只在iOS 9.0及之后起作用。设置为YES的时候必须保证 Background Modes 中的 Location updates 处于选中状态，否则会抛出异常。由于iOS系统限制，需要在定位未开始之前或定位停止之后，修改该属性的值才会有效果。
    //     locationTimeout: 10, //指定单次定位超时时间,默认为10s。最小值是2s。注意单次定位请求前设置。注意: 单次定位超时时间从确定了定位权限(非kCLAuthorizationStatusNotDetermined状态)后开始计算
    //     reGeocodeTimeout: 5, //指定单次定位逆地理超时时间,默认为5s。最小值是2s。注意单次定位请求前设置。
    //     locatingWithReGeocode: "YES" //是否 启用逆地址定位 默认YES
    // }
  })
}
function getSerialLocation() {
  $Native.GaoDe.startSerialLocation(res => {
    console.log(res)
    console.log(res.latitude, res.longitude)
  }, err => {
    console.log(err)
  }, {
    androidOption: {
      locationMode: 1,//定位精度 1.精确定位 2.仅设备定位模式；3.低功耗定位模式
      gpsFirst: false,//设置是否gps优先，只在高精度模式下有效。默认关闭
      HttpTimeOut: 30000,//设置网络请求超时时间。默认为30秒。在仅设备模式下无效
      interval: 2000,//设置定位间隔。默认为2秒 连续定位有效
      needAddress: true,//设置是否返回逆地理地址信息。默认是true
      onceLocation: false,//设置是否单次定位。默认是false
      onceLocationLatest: false,//设置是否等待wifi刷新，默认为false.如果设置为true,会自动变为单次定位，持续定位时不要使用
      locationProtocol: 1,// 设置网络请求的协议。可选HTTP或者HTTPS。默认为HTTP。1.http 2.https
      sensorEnable: false,//设置是否使用传感器。默认是false
      wifiScan: true,//设置是否开启wifi扫描。默认为true，如果设置为false会同时停止主动刷新，停止以后完全依赖于系统刷新，定位位置可能存在误差
      locationCacheEnable: false//设置是否使用缓存定位，默认为true
    },
    // iosOption: {
    //     pausesLocationUpdatesAutomatically: "YES",//指定定位是否会被系统自动暂停。默认为NO。
    //     allowsBackgroundLocationUpdates: "NO",//是否允许后台定位。默认为NO。只在iOS 9.0及之后起作用。设置为YES的时候必须保证 Background Modes 中的 Location updates 处于选中状态，否则会抛出异常。由于iOS系统限制，需要在定位未开始之前或定位停止之后，修改该属性的值才会有效果。
    //     locatingWithReGeocode: "YES" //是否 启用逆地址定位 默认YES
    // }
  })
}

function stopSerialLocation() {
  $Native.GaoDe.stopSerialLocation()
}

function initAllPermissions() {
  var allNeedCheckPermission = [
    {
      group: '位置信息',
      needCheck: true, // 影响到功能使用的权限 二次校验
      permissions: [
        $Native.permissions.ACCESS_COARSE_LOCATION,
        $Native.permissions.ACCESS_FINE_LOCATION,
      ],
    }, {
      group: '设备状态',
      needCheck: false,
      permissions: [
        $Native.permissions.READ_PHONE_STATE,
      ],
    }, {
      group: '媒体存储',
      needCheck: true,
      permissions: [
        $Native.permissions.WRITE_EXTERNAL_STORAGE,
        $Native.permissions.READ_EXTERNAL_STORAGE,
      ],
    }
  ]

  let allPermissionsPromise = []
  allNeedCheckPermission.forEach(per => {
    allPermissionsPromise.push((() => {
      return new Promise((resolve, reject) => {
        $Native.permissions.checkPermission(per.permissions, function (status) {
          if (status.hasPermission) {
            per.needCheck = false
            resolve({
              status: true,
              ...per
            })
          }
          else {
            $Native.permissions.requestPermissions(per.permissions, status => {
              if (!status.hasPermission && per.needCheck) {
                console.warn("权限没通过")
                reject({
                  status: false,
                  ...per
                })
              } else {
                per.needCheck = false
                resolve({
                  status: true,
                  ...per
                })
              }
            })

          }
        })
      })
    })())
  })
  Promise.all(allPermissionsPromise)
    .then(() => {
      $Native.checkPermission = () => {
        // TODO: 见注释14
      }
    })
    .catch(() => {

      // $Native.permissions.requestPermissions(allNeedCheckPermission, status => {
      //   if (!status.hasPermission) {
      //     console.warn("权限没通过")
      let todoTurnonPermissions = []
      allNeedCheckPermission.forEach(item => {
        if (item.needCheck) todoTurnonPermissions.push(item)
      })
      $Native.checkPermission = () => {
        // return new Promise((resolve,reject) => {
          // todoTurnonPermissions 校验必要权限
          let tips = `请授权访问此设备的${todoTurnonPermissions.map(item => item.group).join("，")}权限`
          todoTurnonPermissions.forEach(item => { // 实际只会第一个正常提示，在设置完一个权限后，app会被重启
            $Native.permissions.requestPermissions(item.permissions, status => {
              if (!status.hasPermission) {
                $Native.toast.showLongBottom(tips)
                $Native.notification.confirm(
                  tips,  // message
                  (buttonIndex) => {
                    if (buttonIndex == 1) {
                      $Native.diagnostic.switchToSettings()
                      // TODO:
                    }
                    if (buttonIndex == 2) {
                      // TODO:
                    }
                  }, // callback
                  '', // title
                  ['去设置', '暂不开启'] // buttonName
                )
              }
            }, error => {
              console.warn('todoTurnonPermissions is not turned on')
            })
          })
        // })
      }
      $Native.checkPermission.todoTurnonPermissions = todoTurnonPermissions
      $Native.checkPermission()
      //   }
      // }, error => {
      //   console.warn('all permission is not turned on')
      // })
    })
}
function checkUpdateApp() {
  codePush.sync(
    status => {
      switch (status) {
        case SyncStatus.UP_TO_DATE:
          $Native.toast.showLongBottom('已经是最新版本')
          break
        case SyncStatus.AWAITING_USER_ACTION:
          // 等待用户确认是否更新
          $Native.notification.beep(1)
          break
        case SyncStatus.DOWNLOADING_PACKAGE:
          // 下载最新安装包
          $Native.progress.init({
            progressStyle: 'HORIZONTAL',
            title: '请稍等...',
            cancelable: false,
            message: '正在下载最新资源包...'
          })
          break
        case SyncStatus.ERROR:
          $Native.progress.dismiss()
          $Native.toast.showLongBottom('下载失败，访问资源网络异常. 不用担心，下次启动软件会重新提示更新')
          break
        case SyncStatus.INSTALLING_UPDATE:
          $Native.progress.dismiss()
          // 下载安装包完成，准备安装更新，请勿退出软件
          $Native.progress.init({
            // theme: 'HOLO_DARK',
            // progressStyle: 'HORIZONTAL',
            cancelable: false,
            title: '请稍等...',
            message: '准备安装更新，请勿退出软件 ...'
          })
          break
        case SyncStatus.UPDATE_INSTALLED:
          $Native.progress.dismiss()
          $Native.toast.showShortBottom('安装成功,准备重启')
          break
        case SyncStatus.UPDATE_IGNORED:
          $Native.progress.dismiss()
          $Native.toast.showLongBottom('您取消了更新，请下次点击确认更新，保证软件新功能能够服务到您')
          break
      }
    },
    {
      updateDialog: {
        updateTitle: '发现有新的资源包',//用作向最终用户显示的更新通知的标头的文本。默认值为 。"Update available"
        appendReleaseDescription: true,//指示是否要将可用版本的描述附加到向最终用户显示的通知消息中。默认值为 。false
        descriptionPrefix: '更新内容：',//指示在向最终用户显示更新通知时，您希望在版本说明中加上前缀的字符串（如果有）。默认值为 。" Description: "
        mandatoryContinueButtonLabel: '继续',//用于最终用户必须按下才能安装强制更新的按钮的文本。默认值为 。"Continue"
        mandatoryUpdateMessage: '按继续以完成更新！',//将更新指定为必需时用作更新通知正文的文本。默认值为 。"An update is available that must be installed."
        optionalUpdateMessage: '是否要下载更新？',//当更新是可选的时，用作更新通知正文的文本。默认值为 。"An update is available. Would you like to install it?"
        optionalIgnoreButtonLabel: '忽略',
        optionalInstallButtonLabel: '立即更新',
      },
      installMode: 'InstallMode.ON_NEXT_RESTART'
    }, downloadProgress => {
      if (downloadProgress) {
        $Native.progress.setProgress(
          ((point) => {
            return parseInt(Number(point * 100).toFixed(2))
          })(downloadProgress.receivedBytes / downloadProgress.totalBytes)
        )
      }
    })
}

/**
 * @deprecated
 * @description 开始轨迹上报
 * @param {number} sid 服务id
 * @param {string} terminalId 用户终端的唯一标识比如phone
 */
function startTrack(sid = 868198, terminalId = "13570274429") {
  return new Promise((resolve, reject) => {
    $Native.AmapTrackPlugin.startTrack(sid, terminalId, false, function (tid) {
      // tid 获取到该sid下的该用户的终端id
      console.log("服务已启动成功,tid：", tid)
      $Native.toast.showShortBottom('定位采集服务已启动')
      resolve(tid)
    }, err => {
      console.log("服务启动失败，是否再次尝试？")
      reject(err)
    })
  })
}
/**
 * @deprecated
 * @description 停止轨迹上报
 */
function stopTrack() {
  return new Promise((resolve, reject) => {
    $Native.AmapTrackPlugin.stopTrack(data => {
      console.log("服务已停止,data:", data)
      $Native.toast.showShortBottom('已停止定位采集')
      resolve(data)
    }, err => {
      reject(err)
    })
  })
}
/**
 * @deprecated
 * @description 获取行动轨迹距离
 * @param {number} sid 服务id
 * @param {number | string} terminalId 用户终端的唯一标识比如phone
 * @param {date} startTime 时间戳
 * @param {date} endTime 时间戳
 * @returns
 */
function queryDistance(sid = 868198, terminalId = 13570274429, startTime = 1673503772000, endTime = 1673503855000) {
  console.log(sid, terminalId, startTime, endTime)
  // if (!endTime) {
  // endTime = (new Date()).getTime()
  // }
  return new Promise((resolve, reject) => {
    $Native.AmapTrackPlugin.queryDistance(sid, terminalId, startTime, endTime, data => {
      console.log("距离查询,data:", data)
      $Native.toast.showLongBottom(`距离查询：${data}`)
      resolve(data)
    }, err => {
      reject(err)
    })
  })
}
