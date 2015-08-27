function supportsLocalStorage() {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        console.log("localstorage is not supported");
        return false;
    }
}


function generateUniqueId() {
    function _p8() {
        return (Math.random().toString(16) + "000000000").substr(2, 8);
    }
    return _p8() + _p8() + _p8() + _p8();
}

function Settings(conferenceID) {
    this.email = '';
    this.displayName = '';
    this.userId;
    this.language = null;
    this.confSettings = null;
    if (supportsLocalStorage()) {
        if(!window.localStorage.jitsiConferences)
            window.localStorage.jitsiConferences = {}
        if (!window.localStorage.jitsiConferences[conferenceID]) {
            window.localStorage.jitsiConferences[conferenceID] = {}
        }
        this.confSettings = window.localStorage.jitsiConferences[conferenceID];
        if(!this.confSettings.jitsiMeetId) {
            this.confSettings.jitsiMeetId = generateUniqueId();
            console.log("generated id",
                this.confSettings.jitsiMeetId);
        }
        this.userId = this.confSettings.jitsiMeetId || '';
        this.email = this.confSettings.email || '';
        this.displayName = this.confSettings.displayname || '';
        this.language = this.confSettings.language;
    } else {
        console.log("local storage is not supported");
        this.userId = generateUniqueId();
    }
}

Settings.prototype.setDisplayName = function (newDisplayName) {
    this.displayName = newDisplayName;
    if(this.confSettings != null)
        this.confSettings.displayname = displayName;
    return this.displayName;
},
Settings.prototype.setEmail = function (newEmail) {
    this.email = newEmail;
    if(this.confSettings != null)
        this.confSettings.email = newEmail;
    return this.email;
},
Settings.prototype.getSettings = function () {
    return {
        email: this.email,
        displayName: this.displayName,
        uid: this.userId,
        language: this.language
    };
},
Settings.prototype.setLanguage = function (lang) {
    this.language = lang;
    if(this.confSettings != null)
        this.confSettings.language = lang;
}

module.exports = Settings;
