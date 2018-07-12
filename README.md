# cordova-playground #

Repository for experiments and learning cordova by tutorials at https://www.tutorialspoint.com/cordova. I'll run this tutorials by creating android app.

## Install ##

1. Install all dependencies to this project: ```npm install```
2. Install cordova by npm: ```npm install -g cordova```
3. Install Android SDK or XCode (for iOS).

Read more at: https://www.tutorialspoint.com/cordova/cordova_environment_setup.htm

## New project ##

Init new cordova project: ```cordova create CordovaProject io.cordova.hellocordova CordovaApp```

* **CordovaProject** is the directory name where the app is created.
* **io.cordova.hellocordova** is the default reverse domain value. You should use your own domain value if possible.
* **CordovaApp** is the title of your app.

And go to this directory: ```cd CordovaProject```

Then add android platform: ```cordova platform add android```

And build your app: ```cordova build android```

Read more at: https://www.tutorialspoint.com/cordova/cordova_first_application.htm

## Configure application ##

The **config.xml** file is the place where we can change the configuration of the app.

Read more at: https://www.tutorialspoint.com/cordova/cordova_config_xml.htm

