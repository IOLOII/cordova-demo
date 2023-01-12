由高德地图猎鹰SDK实例改装的cordova插件


ionic项目config.xml文件中需要配置权限和从高德地图申请的key。


        <config-file parent="/*" target="AndroidManifest.xml">
            <!--用于进行网络定位-->
            <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"></uses-permission>
            <!--用于访问GPS定位-->
            <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"></uses-permission>
            <!--用于获取运营商信息，用于支持提供运营商信息相关的接口-->
            <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
            <!--用于访问wifi网络信息，wifi信息会用于进行网络定位-->
            <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
            <!--用于获取wifi的获取权限，wifi信息会用来进行网络定位-->
            <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"></uses-permission>
            <!--用于访问网络，网络定位需要上网-->
            <uses-permission android:name="android.permission.INTERNET"></uses-permission>
            <!--用于读取手机当前的状态-->
            <uses-permission android:name="android.permission.READ_PHONE_STATE"></uses-permission>
            <!--用于写入缓存数据到扩展存储卡-->
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"></uses-permission>
            <!--用于申请调用A-GPS模块-->
            <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"></uses-permission>
            <!--用于申请获取蓝牙信息进行室内定位-->
            <uses-permission android:name="android.permission.BLUETOOTH"></uses-permission>
            <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"></uses-permission>
        </config-file>
        <config-file parent="/manifest/application" target="AndroidManifest.xml">
            <!--您申请的高德地图android key-->
            <meta-data android:name="com.amap.api.v2.apikey" android:value="你申请的key"/>
            <!-- 定位需要的服务 -->
            <service android:name="com.amap.api.location.APSService" />
            <!--轨迹上报需要的服务-->
            <service android:name="com.amap.api.track.AMapTrackService" />
        </config-file>


ionic项目调用


        declare let cordova:any;

        /**
        * 开始轨迹上报
        * @param terminalId 高德终端唯一标识mtscode
        */
        AmapTrackStart(terminalId:any):Promise<any>{
            return new Promise((resolve,reject)=>{
            cordova.plugins.AmapTrackPlugin.startTrack('高德地图创建的服务id',terminalId,false,data=>{
                resolve(data);
            },err=>{
                reject(err);
            }); 
            });
        }

        /**
        * 停止轨迹上报
        */
        AmapTrackStop():Promise<any>{
            return new Promise((resolve,reject)=>{
            cordova.plugins.AmapTrackPlugin.stopTrack(data=>{
                resolve(data);
            },err=>{
                reject(err);
            }); 
            });
        }

        /**
        * 获取行动轨迹距离
        * @param terminalId 高德终端唯一标识mtscode
        * @param startTime 开始时间
        * @param endTime   结束时间
        */
        AmapQueryDistance(terminalId:any, startTime:number,endTime?:number):Promise<any>{
            if(!endTime){
            endTime = (new Date()).getTime();
            }
            return new Promise((resolve,reject)=>{
            cordova.plugins.AmapTrackPlugin.queryDistance(高德地图创建的服务id, terminalId, startTime,endTime,data=>{
                resolve(data);
            },err=>{
                reject(err);
            });
            });
            
        }