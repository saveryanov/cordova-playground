(function ($) {
    var app = {
        // Application Constructor
        initialize: function () {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },

        // deviceready Event Handler
        //
        // Bind any cordova events here. Common events are:
        // 'pause', 'resume', etc.
        onDeviceReady: function () {

            // Tabs

            $('.tabs .tab').click(function () {
                var containerName = $(this).attr('data-container-name');
                $(`.tab-container`).hide();
                $(`.${containerName}`).show();
            });


            // Local storage

            var localStorage = window.localStorage;

            function printLocalStorage() {
                $('#local-storage-output').html('<pre>' + JSON.stringify(localStorage, null, 4) + '</pre>');
            }
            printLocalStorage();
            $("#setLocalStorage").click(function () {
                localStorage.setItem("Name", "John");
                localStorage.setItem("Job", "Developer");
                localStorage.setItem("Project", "Cordova Project");
                printLocalStorage();
            });
            $("#setLocalStorageByInput").click(function () {
                localStorage.setItem($("#localStorageKey").val(), $("#localStorageValue").val());
                printLocalStorage();
            });
            $("#removeLocalStorageByInput").click(function () {
                localStorage.removeItem($("#localStorageKey").val());
                printLocalStorage();
            });


            // Buttons handle

            document.addEventListener("volumeupbutton", function () {
                alert('Volume Up Button is pressed');
            }, false);
            document.addEventListener("volumedownbutton", function () {
                alert('Volume Down Button is pressed');
            }, false);
            document.addEventListener("backbutton", function () {
                alert('Back Button is pressed');
            }, false);


            // Battery

            window.addEventListener("batterystatus", function onBatteryStatus(info) {
                $('#battery-output').html("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
            }, false);
            window.addEventListener("batterycritical", function onBatteryStatus(info) {
                $('#battery-output').html("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
            }, false);
            window.addEventListener("batterylow", function onBatteryStatus(info) {
                $('#battery-output').html("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
            }, false);


            // Camera

            $("#cameraTakePicture").click(function cameraTakePicture() {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL
                });

                function onSuccess(imageData) {
                    var image = document.getElementById('cameraResultImage');
                    image.src = "data:image/jpeg;base64," + imageData;
                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }
            });

            $("#cameraGetPicture").click(function cameraGetPicture() {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                });

                function onSuccess(imageData) {
                    var image = document.getElementById('cameraResultImage');
                    image.src = "data:image/jpeg;base64," + imageData;
                }

                function onFail(message) {
                    alert('Failed because: ' + message);
                }

            });


            // Contacts

            $("#createContact").click(function createContact() {
                var myContact = navigator.contacts.create({
                    "displayName": $("#contactsDisplayName").val()
                });
                myContact.save(contactSuccess, contactError);

                function contactSuccess() {
                    alert("Contact is saved!");
                }

                function contactError(message) {
                    alert('Failed because: ' + message);
                }

            });
            $("#findContact").click(function findContacts() {
                var options = new ContactFindOptions();
                options.filter = $("#contactsDisplayName").val();
                options.multiple = true;
                var fields = ["displayName"];
                navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

                function contactfindSuccess(contacts) {
                    $('#contacts-output').html('<pre>' + JSON.stringify(contacts, null, 4) + '</pre>');
                }

                function contactfindError(message) {
                    alert('Failed because: ' + message);
                }

            });
            $("#deleteContact").click(function deleteContact() {
                var options = new ContactFindOptions();
                options.filter = $("#contactsDisplayName").val();
                options.multiple = false;
                var fields = ["displayName"];
                navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

                function contactfindSuccess(contacts) {
                    var contact = contacts[0];
                    contact.remove(contactRemoveSuccess, contactRemoveError);

                    function contactRemoveSuccess(contact) {
                        alert("Contact Deleted" + JSON.stringify(contact));
                    }

                    function contactRemoveError(message) {
                        alert('Failed because: ' + message);
                    }
                }

                function contactfindError(message) {
                    alert('Failed because: ' + message);
                }
            });


            // Device info
            $('#device-output').html('<pre>' + JSON.stringify(device, null, 4) + '</pre>');


            // Accelerometer
            $("#getAcceleration").click(function getAcceleration() {
                navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);

                function accelerometerSuccess(acceleration) {
                    $('#accelerometer-output').html('<pre>' + JSON.stringify(acceleration, null, 4) + '</pre>');
                }

                function accelerometerError() {
                    alert('onError!');
                }
            });
            var accelerationWatchID;
            $("#watchAcceleration").click(function watchAcceleration() {
                var accelerometerOptions = {
                    frequency: 50
                }
                accelerationWatchID = navigator.accelerometer.watchAcceleration(accelerometerSuccess, accelerometerError, accelerometerOptions);

                function accelerometerSuccess(acceleration) {
                    $('#accelerometer-output').html('<pre>' + JSON.stringify(acceleration, null, 4) + '</pre>');
                }

                function accelerometerError() {
                    alert('onError!');
                }
            });
            $("#stopWatchAcceleration").click(function stopWatchAcceleration() {
                navigator.accelerometer.clearWatch(accelerationWatchID);
            });


            // Device orientation
            function updateOrientation(heading) {
                $('#device-orientation-output').html('<pre>' + JSON.stringify(heading, null, 4) + '</pre>');
            }
            $("#getOrientation").click(function getOrientation() {
                navigator.compass.getCurrentHeading(compassSuccess, compassError);

                function compassSuccess(heading) {
                    updateOrientation(heading);
                }

                function compassError(error) {
                    alert('CompassError: ' + error.code);
                }
            });
            var orientationWatchID;
            $("#watchOrientation").click(function watchOrientation() {
                var compassOptions = {
                    frequency: 50
                }
                orientationWatchID = navigator.compass.watchHeading(compassSuccess, compassError, compassOptions);

                function compassSuccess(heading) {
                    updateOrientation(heading);
                }

                function compassError(error) {
                    alert('CompassError: ' + error.code);
                }
            });
            $("#stopWatchOrientation").click(function stopWatchAcceleration() {
                navigator.compass.clearWatch(orientationWatchID);
            });


            // Dialogs
            function printDialogOutput(str) {
                $('#dialog-output').html(str);
            }
            $("#dialogAlert").click(function dialogAlert() {
                var message = "I am Alert Dialog!";
                var title = "ALERT";
                var buttonName = "Alert Button";
                navigator.notification.alert(message, alertCallback, title, buttonName);

                function alertCallback() {
                    printDialogOutput("Alert is Dismissed!");
                }
            });
            $("#dialogConfirm").click(function dialogConfirm() {
                var message = "Am I Confirm Dialog?";
                var title = "CONFIRM";
                var buttonLabels = "YES,NO";
                navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

                function confirmCallback(buttonIndex) {
                    printDialogOutput("You clicked " + buttonIndex + " button!");
                }

            });
            $("#dialogPrompt").click(function dialogPrompt() {
                var message = "Am I Prompt Dialog?";
                var title = "PROMPT";
                var buttonLabels = ["YES", "NO"];
                var defaultText = "Default"
                navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);

                function promptCallback(result) {
                    printDialogOutput("You clicked " + result.buttonIndex + " button! \n" + "You entered " + result.input1);
                }

            });
            $("#dialogBeep").click(function dialogBeep() {
                var times = 2;
                navigator.notification.beep(times);
            });


            // Filesystem
            document.getElementById("createFile").addEventListener("click", function createFile() {
                var type = window.TEMPORARY;
                var size = 5 * 1024 * 1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {
                    fs.root.getFile('log.txt', {
                        create: true,
                        exclusive: true
                    }, function (fileEntry) {
                        alert('File creation successfull!')
                    }, errorCallback);
                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }

            });
            document.getElementById("writeFile").addEventListener("click", function writeFile() {
                var type = window.TEMPORARY;
                var size = 5 * 1024 * 1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {
                    fs.root.getFile('log.txt', {
                        create: true
                    }, function (fileEntry) {

                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.onwriteend = function (e) {
                                alert('Write completed.');
                            };

                            fileWriter.onerror = function (e) {
                                alert('Write failed: ' + e.toString());
                            };

                            var blob = new Blob(['Lorem Ipsum'], {
                                type: 'text/plain'
                            });
                            fileWriter.write(blob);
                        }, errorCallback);
                    }, errorCallback);
                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }
            });
            document.getElementById("readFile").addEventListener("click", function readFile() {
                var type = window.TEMPORARY;
                var size = 5 * 1024 * 1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {
                    fs.root.getFile('log.txt', {}, function (fileEntry) {

                        fileEntry.file(function (file) {
                            var reader = new FileReader();

                            reader.onloadend = function (e) {
                                var txtArea = document.getElementById('textarea');
                                txtArea.value = this.result;
                            };
                            reader.readAsText(file);
                        }, errorCallback);
                    }, errorCallback);
                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }
            });
            document.getElementById("removeFile").addEventListener("click", function removeFile() {
                var type = window.TEMPORARY;
                var size = 5 * 1024 * 1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)

                function successCallback(fs) {
                    fs.root.getFile('log.txt', {
                        create: false
                    }, function (fileEntry) {
                        fileEntry.remove(function () {
                            alert('File removed.');
                        }, errorCallback);
                    }, errorCallback);
                }

                function errorCallback(error) {
                    alert("ERROR: " + error.code)
                }
            });


            // Filetransfer
            document.getElementById("uploadFile").addEventListener("click", function uploadFile() {
                var fileURL = "///storage/emulated/0/DCIM/myFile"
                var uri = encodeURI("http://posttestserver.com/post.php");
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                options.mimeType = "text/plain";

                var headers = {
                    'headerParam': 'headerValue'
                };
                options.headers = headers;
                var ft = new FileTransfer();
                ft.upload(fileURL, uri, onSuccess, onError, options);

                function onSuccess(r) {
                    console.log("Code = " + r.responseCode);
                    console.log("Response = " + r.response);
                    console.log("Sent = " + r.bytesSent);
                }

                function onError(error) {
                    alert("An error has occurred: Code = " + error.code);
                    console.log("upload error source " + error.source);
                    console.log("upload error target " + error.target);
                }

            });
            document.getElementById("downloadFile").addEventListener("click", function downloadFile() {
                var fileTransfer = new FileTransfer();
                var uri = encodeURI("https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg");
                var fileURL = "///storage/emulated/0/DCIM/myFile";

                fileTransfer.download(
                    uri, fileURL,
                    function (entry) {
                        console.log("download complete: " + entry.toURL());
                    },

                    function (error) {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("download error code" + error.code);
                    },

                    false, {
                        headers: {
                            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                        }
                    }
                );
            });


            // Geoposition
            function printPositionOutput(position) {
                $('#position-output').html(
                    '<pre>' +
                    'Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n' +
                    '</pre>'
                );
            }
            document.getElementById("getPosition").addEventListener("click", function getPosition() {
                var options = {
                    enableHighAccuracy: true,
                    maximumAge: 3600000
                }
                navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    printPositionOutput(position);
                }

                function onError(error) {
                    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                }
            });
            var geopositionWatchID;
            document.getElementById("watchPosition").addEventListener("click", function watchPosition() {
                var options = {
                    maximumAge: 3600000,
                    timeout: 5000,
                    enableHighAccuracy: true,
                }
                geopositionWatchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    printPositionOutput(position);
                }

                function onError(error) {
                    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                }
            });
            $("#stopWatchPosition").click(function stopWatchPosition() {
                navigator.compass.clearWatch(geopositionWatchID);
            });



            // Globalization
            document.getElementById("getLanguage").addEventListener("click", function getLanguage() {
                navigator.globalization.getPreferredLanguage(onSuccess, onError);

                function onSuccess(language) {
                    alert('language: ' + language.value + '\n');
                }

                function onError() {
                    alert('Error getting language');
                }
            });
            document.getElementById("getLocaleName").addEventListener("click", function getLocaleName() {
                navigator.globalization.getLocaleName(onSuccess, onError);

                function onSuccess(locale) {
                    alert('locale: ' + locale.value);
                }

                function onError() {
                    alert('Error getting locale');
                }
            });
            document.getElementById("getDate").addEventListener("click", function getDate() {
                var date = new Date();

                var options = {
                    formatLength: 'short',
                    selector: 'date and time'
                }
                navigator.globalization.dateToString(date, onSuccess, onError, options);

                function onSuccess(date) {
                    alert('date: ' + date.value);
                }

                function onError() {
                    alert('Error getting dateString');
                }
            });
            document.getElementById("getCurrency").addEventListener("click", function getCurrency() {
                var currencyCode = 'EUR';
                navigator.globalization.getCurrencyPattern(currencyCode, onSuccess, onError);

                function onSuccess(pattern) {
                    alert('pattern: ' + pattern.pattern + '\n' +
                        'code: ' + pattern.code + '\n' +
                        'fraction: ' + pattern.fraction + '\n' +
                        'rounding: ' + pattern.rounding + '\n' +
                        'decimal: ' + pattern.decimal + '\n' +
                        'grouping: ' + pattern.grouping);
                }

                function onError() {
                    alert('Error getting pattern');
                }
            });


            // inAppBrowser
            document.getElementById("inappbrowserButton").addEventListener("click", function openBrowser() {
                var url = $('#inappbrowserUrl').val();
                var target = '_blank';
                var options = "location = yes"
                var ref = cordova.InAppBrowser.open(url, target, options);

                ref.addEventListener('loadstart', function loadstartCallback(event) {
                    console.log('Loading started: ' + event.url)
                });
                ref.addEventListener('loadstop', function loadstopCallback(event) {
                    console.log('Loading finished: ' + event.url)
                });
                ref.addEventListener('loaderror', function loaderrorCallback(error) {
                    console.log('Loading error: ' + error.message)
                });
                ref.addEventListener('exit', function exitCallback() {
                    console.log('Browser is closed...')
                });
            });
        },

    };

    app.initialize();

})(jQuery);