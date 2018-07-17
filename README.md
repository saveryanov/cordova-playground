# cordova-playground #

Repository for experiments and learning cordova by tutorials at https://www.tutorialspoint.com/cordova. I will go through these tutorials when creating an application for android.

My cordova project is located in the CordovaProject directory. You can download it by command:

```git clone https://github.com/saveryanov/cordova-playground```

It was built as single page app with simple navigation on tutorials where:
  
* **/CordovaProject/www/index.html** - index html page
* **/CordovaProject/www/js/index.js** - all main code for tutorials
* **/CordovaProject/www/css/index.css** - css for this page

I didn't bother at the expense of the correct architecture of building single-page applications and tried to use the most simple approach for studying Cordova. I just use jQuery, because it's very simple :)

There are some scripts in the **/CordovaProject/package.json** for comfortable usage:

* **npm run output** - print all your console.log() messages in terminal by logcat
* **npm run build** - build android app (apk will created at /CordovaProject/platforms/android/app/build/outputs/apk/debug/app-debug.apk)
* **npm run emulate** - run android emulator and load your app

## Install ##

1. Install all dependencies to this project: ```npm install```
2. Install cordova by npm: ```npm install -g cordova```
3. Install Android SDK or XCode (for iOS).

If you want to use emulator then you should create virtual device by AVD Manager.

Read more at: https://www.tutorialspoint.com/cordova/cordova_environment_setup.htm

## New project ##

Init new cordova project:

```cordova create CordovaProject io.cordova.hellocordova CordovaApp```

* **CordovaProject** is the directory name where the app is created.
* **io.cordova.hellocordova** is the default reverse domain value. You should use your own domain value if possible.
* **CordovaApp** is the title of your app.

And go to this directory:

```cd CordovaProject```

Then add android platform:

```cordova platform add android```

And build your app:

```cordova build android```

Run your app with emulator:

```cordova emulate android```

You can check cordova requirements for platforms specified:

```cordova requirements android```

Read more at: https://www.tutorialspoint.com/cordova/cordova_first_application.htm

## Configure application ##

The **config.xml** file is the place where we can change the configuration of the app.

Read more at: https://www.tutorialspoint.com/cordova/cordova_config_xml.htm

## console.log ##

If you using emulator you can output some data to console by simple console.log() method. For seing your logged messages from app just open Google Chrome and go to: ```chrome://inspect```.

Also you can use **logcat** output from the terminal:

```adb logcat | grep -i "console"```

There you can find your emulated device, then click **inpect**. You can find app output at the **console** tab.

## Plugin manager ##

Cordova Plugman is a useful command line tool for installing and managing plugins. You should use **plugman** if your app needs to run on one specific platform. If you want to create a cross-platform app you should use **cordova-cli** which will modify plugins for different platforms.

To install plugman just run this command:

```npm install -g plugman```

To install plugins via plugman:

```plugman install --platform android --project platforms\android --plugin cordova-plugin-camera```

To uninstall plugins via plugman:

```plugman uninstall --platform android --project platforms\android  --plugin cordova-plugin-camera```

To install plugins via Cordova CLI:

```cordova plugin add cordova-plugin-battery-status``` (battery plugin)

To uninstall plugins via Cordova CLI:

```cordova plugin remove cordova-plugin-battery-status``` (battery plugin)

Read more at: https://www.tutorialspoint.com/cordova/cordova_plugman.htm

## Results ##

If you run this app you can see tabs at the top. They are used for navigation between pages with some tutorial results.

### Events ###

Pressing the volume control buttons is handled using events and causing alert message.

![Volume button press handle](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/volume-button-press-handle.png?raw=true)

Read more at:  https://www.tutorialspoint.com/cordova/cordova_events.htm

### Local storage page ###

Results of experiments with local storage values. At this page you can see a simple form with two input fields for setting/removing values in local storage by key.

![Local storage tab](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/local-storage-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_storage.htm

### Battery page ###

Results of tutorial about battery status plugin. At this page you can see information about battery level and charging status.

Plugin install command: ```cordova plugin add cordova-plugin-battery-status```

![Battery tab](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/battery-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_battery_status.htm

### Camera page ###

Results of tutorial about camera plugin usage. At this page you can use camera for taking picture or load image from local file system.

Plugin install command: ```cordova plugin add cordova-plugin-camera```

![Camera page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/camera-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_camera.htm

### Contacts page ###

At this page you can create, find and delete contacts by contacts plugin.

Plugin install command: ```cordova plugin add cordova-plugin-contacts```

![Contacts page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/contacts-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_contacts.htm

### Device info page ###

At this page you can get info about your device.

Plugin install command: ```cordova plugin add cordova-plugin-device```

![Device info page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/device-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_device.htm

### Accelerometer page ###

At this page you can get info from accelerometer (x, y, z).

Plugin install command: ```cordova plugin add cordova-plugin-device-motion```

![Accelerometer page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/accelerometer-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_accelometer.htm

### Device Orientation page ###

At this page you can get info about device orientation. The compass plugin is almost the same as the acceleration plugin.

Plugin install command: ```cordova plugin add cordova-plugin-device-orientation```

Some devices do not have the magnetic sensor that is needed for the compass to work. If your device doesn't have it, the following error will be displayed.

![Orientation page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/device-orientation-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_device_orientation.htm

### Dialogs ###

Results of tutorial about native dialogs usage.

Plugin install command: ```cordova plugin add cordova-plugin-dialogs```

![Dialogs page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/dialogs-tab.png?raw=true)
![Promt dialog](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/dialogs-promt-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_dialogs.htm

### File system ###

Results of tutorial about writing/reading/editing/deleting files.

Plugin install command: ```cordova plugin add cordova-plugin-file```

![Filesystem page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/filesystem-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_file_system.htm


### File transfer ###

Results of tutorial about uploading and downloading files.

Plugin install command: ```cordova plugin add cordova-plugin-file-transfer```

![Filetransfer page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/filetransfer-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_file_transfer.htm


### Geolocation ###

Results of tutorial about geolocation.

Plugin install command: ```cordova plugin add cordova-plugin-geolocation```

![Geolocation page](https://github.com/saveryanov/cordova-playground/blob/master/screenshots/geolocation-tab.png?raw=true)

Read more at: https://www.tutorialspoint.com/cordova/cordova_geolocation.htm

