/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false)
var permissions
var notification
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log(navigator.notification)
    if (navigator.notification) {
        notification = navigator.notification
    }
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('deviceready').classList.add('ready')

    permissions = cordova.plugins.permissions
    permissions.hasPermission(permissions.CAMERA, function (status) {
        if (status.hasPermission) {
            console.log("Yes :D ")
        }
        else {
            console.warn("No :( ")
        }
    })
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

    buttonCheckPermission.addEventListener('click', checkPermission)
    buttonRequestPermission.addEventListener('click', requestPermission)
    buttonToCheckAllPermission.addEventListener('click', toCheckAllPermission)
    buttonToRequestAllPermission.addEventListener('click', toRequestAllPermission)
    buttonNotificationAlert.addEventListener('click', toNotificationAlert)
    buttonNotificationConfirm.addEventListener('click', toNotificationConfirm)
    buttonNotificationPrompt.addEventListener('click', toNotificationPrompt)
}
function checkPermission() {
    console.log("run checkPermission")
    if (!permissions) {
        console.log("permissions init fail")
        return
    }
    permissions = cordova.plugins.permissions
    permissions.checkPermission(permissions.CAMERA, function (status) {
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
    if (!permissions) {
        console.log("permissions init fail")
        return
    }
    permissions.requestPermission(permissions.CAMERA, success, error)

    function error() {
        console.warn('Camera permission is not turned on')
    }

    function success(status) {
        console.log("status:", status)
        if (!status.hasPermission) error()
    }
}

function toCheckAllPermission() {
    console.log("run toCheckAllPermission")
    if (!permissions) {
        console.log("permissions init fail")
        return
    }
    var toCheckPermission = [
        permissions.ACCESS_COARSE_LOCATION,
        permissions.ACCESS_FINE_LOCATION,
        permissions.READ_PHONE_STATE,
        permissions.WRITE_EXTERNAL_STORAGE
    ]
    var res = {}
    toCheckPermission.forEach(per => {
        permissions.checkPermission(per, function (status) {
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
    if (!permissions) {
        console.log("permissions init fail")
        return
    }
    var toCheckPermission = [
        permissions.ACCESS_COARSE_LOCATION,
        permissions.ACCESS_FINE_LOCATION,
        permissions.READ_PHONE_STATE,
        permissions.WRITE_EXTERNAL_STORAGE
    ]

    permissions.requestPermissions(toCheckPermission, success, error)
    function error(error) {
        console.log(error)
        console.warn('all permission is not turned on')
    }
    function success(status) {
        console.log("status:", status)
        if (!status.hasPermission) error()
    }
}
function toNotificationAlert() {
    notification.beep(1);
    notification.alert(
        'You are the winner!',  // message
        (buttonIndex) => {
            alert('You selected button ' + buttonIndex)
        },         // callback
        'Game Over',            // title
        'OK'                // buttonName
    )
}
function toNotificationConfirm() {
    notification.beep(1);
    notification.confirm(
        'You are the winner!',  // message
        (buttonIndex) => {
            alert('You selected button ' + buttonIndex)
        },         // callback
        'Game Over',            // title
        ['OK', 'cancle', 'a']                // buttonName
    )
}
function toNotificationPrompt() {
    notification.beep(1);
    notification.prompt(
        'You are the winner!',  // message
        (buttonIndex, input1) => {
            alert('You selected button ' + buttonIndex + ' input1:' + input1)
        },         // callback
        'Game Over',            // title
        ['OK', 'cancle', 'a']                // buttonName
        , 'Jane Doe'
    )
}
