# cordova-playground #

Repository for experiments and learning cordova by tutorials at https://www.tutorialspoint.com/cordova. I will go through these tutorials when creating an application for android.

## Install ##

1. Install all dependencies to this project: ```npm install```
2. Install cordova by npm: ```npm install -g cordova```
3. Install Android SDK or XCode (for iOS).

If you want to use emulator then you should create virtual device by AVD Manager.

Read more at: https://www.tutorialspoint.com/cordova/cordova_environment_setup.htm

## New project ##

Init new cordova project: ```cordova create CordovaProject io.cordova.hellocordova CordovaApp```

* **CordovaProject** is the directory name where the app is created.
* **io.cordova.hellocordova** is the default reverse domain value. You should use your own domain value if possible.
* **CordovaApp** is the title of your app.

And go to this directory: ```cd CordovaProject```

Then add android platform: ```cordova platform add android```

And build your app: ```cordova build android```

Run your app with emulator: ```cordova emulate android```

You can check cordova requirements for platforms specified: ```cordova requirements android```

Read more at: https://www.tutorialspoint.com/cordova/cordova_first_application.htm

## Configure application ##

The **config.xml** file is the place where we can change the configuration of the app.

Read more at: https://www.tutorialspoint.com/cordova/cordova_config_xml.htm

## console.log ##

If you using emulator you can output some data to console by simple console.log() method. For seing your logged messages from app just open Google Chrome and go to: ```chrome://inspect```.

Also you can use **logcat** output from the terminal: ```adb logcat | grep -i "console"```

There you can find your emulated device, then click **inpect**. You can find app output at the **console** tab.

## Plugin manager ##

Cordova Plugman is a useful command line tool for installing and managing plugins. You should use **plugman** if your app needs to run on one specific platform. If you want to create a cross-platform app you should use **cordova-cli** which will modify plugins for different platforms.

To install plugman just run this command: ```npm install -g plugman```

To install plugins via plugman: ```plugman install --platform android --project platforms\android --plugin cordova-plugin-camera```

To uninstall plugins via plugman: ```plugman uninstall --platform android --project platforms\android  --plugin cordova-plugin-camera```

To install plugins via Cordova CLI: ```cordova plugin add cordova-plugin-battery-status``` (battery plugin)

To uninstall plugins via Cordova CLI: ```cordova plugin remove cordova-plugin-battery-status``` (battery plugin)

Read more at: https://www.tutorialspoint.com/cordova/cordova_plugman.htm
