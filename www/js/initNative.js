document.addEventListener('deviceready', onDeviceReady, false)
window.$Native = {
    notification: null,
    permissions: null,
    diagnostic: null,
    permissions: null,
    toast: null,
    GaoDe: null,
    progress: null,
    CodePush: null
}

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('deviceready').classList.add('ready')

    $Native.notification = navigator.notification
    $Native.toast = window.plugins.toast
    $Native.toast.hide()
    $Native.GaoDe = window.GaoDe
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
}
function checkPermission() {
    console.log("run checkPermission")

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
    console.log("run requestPermission")

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
        if (!status.hasPermission) error()
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
        $Native.permissions.ACCESS_COARSE_LOCATION,
        $Native.permissions.ACCESS_FINE_LOCATION,
        $Native.permissions.READ_PHONE_STATE,
        $Native.permissions.WRITE_EXTERNAL_STORAGE
    ]
    let psall = []
    allNeedCheckPermission.forEach(per => {
        psall.push((() => {
            return new Promise((resolve, reject) => {
                $Native.permissions.checkPermission(per, function (status) {
                    console.log("status:", status)
                    if (status.hasPermission) {
                        resolve(true)
                    }
                    else {
                        reject(false)
                    }
                })
            })
        })())
    })
    Promise.all(psall)
        .then(res => {
            console.log("Promise.all", res)
        })
        .catch((err) => {
            $Native.permissions.requestPermissions(allNeedCheckPermission, status => {
                console.log("status:", status)
                if (!status.hasPermission) {
                    // 有权限没通过
                    console.log("有权限没通过")
                }
            }, error => {
                console.log(error)
                console.warn('all permission is not turned on')
            })

            // 校验必要权限
            var locationPermission = [
                $Native.permissions.ACCESS_COARSE_LOCATION,
                $Native.permissions.ACCESS_FINE_LOCATION,
            ]
            $Native.permissions.requestPermissions(locationPermission, status => {
                console.log("status:", status)
                if (!status.hasPermission) {
                    $Native.toast.showLongBottom('请授权定位权限')
                    $Native.notification.confirm(
                        '请允许数字公路访问您的位置',  // message
                        (buttonIndex) => {
                            if (buttonIndex == 1) {
                                $Native.diagnostic.switchToSettings()
                            }
                        }, // callback
                        '', // title
                        ['去设置', '暂不开启'] // buttonName
                    )
                }
            }, error => {
                console.log(error)
                console.warn('all permission is not turned on')
            })
        })
}
function checkUpdateApp() {
    codePush.sync(
        function (status) {
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
                console.log('Downloading ' + downloadProgress.receivedBytes + ' of ' + downloadProgress.totalBytes)
                $Native.progress.setProgress(
                    ((point) => {
                        return parseInt(Number(point * 100).toFixed(2))
                    })(downloadProgress.receivedBytes / downloadProgress.totalBytes)
                )
            }
        })
}