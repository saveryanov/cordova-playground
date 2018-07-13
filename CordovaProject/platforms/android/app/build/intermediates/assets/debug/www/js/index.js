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

        },

    };

    app.initialize();

})(jQuery);