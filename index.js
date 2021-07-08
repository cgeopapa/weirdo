console.log(getInfo())
console.log(navigator)

function getBrowserInfo() {
    return {
        "Browser": navigator.appCodeName,
        "Version": navigator.appVersion
    };
}

function getLocation() {
    return "Will be done"
}

function getInfo(){
    const info = {
        "Browser": getBrowserInfo(),
        "OS": navigator.platform,
        "UserAgent": navigator.userAgent,
        "GeoLocation": getLocation(),
        "Screen": {
            "Width": window.screen.width,
            "Height": window.screen.height,
        },
        "Available Memory": navigator.deviceMemory ? navigator.deviceMemory : "Unavailable",
        "Logical CPU cores": navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "Unavailable",
        "Connection": navigator.connection ? navigator.connection : "Unavailable",
        "Device": {
            "Type": WURFL.form_factor,
            "Mobile": WURFL.is_mobile
        },
    };
    return info;
}
