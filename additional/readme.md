# 下载到本地插件

## AmapTrackPlugin-master
### 安装
> cordova plugin add ./additional/AmapTrackPlugin-master
### 配置
```xml
<platform name="android">
  <config-file target="AndroidManifest.xml" parent="/manifest/application" mode="merge">
    <!-- 高德地图 android key -->
    <meta-data android:name="com.amap.api.v2.apikey" android:value="72ecd018b48e21a8e85d556b56765505" />
    <!-- 定位需要的服务 -->
    <service android:name="com.amap.api.location.APSService" />
    <!-- 轨迹上报需要的服务 -->
    <service android:name="com.amap.api.track.AMapTrackService" />
  </config-file>
</platform>
```
注意该插件与其他高德插件使用中：
如果同时安装有cordova-plugin-gaodelocation-chenyu 这种插件
且cordova-plugin-gaodelocation-chenyu插件中已经配置高德androidkey 则不需配置上方内容