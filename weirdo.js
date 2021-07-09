function getBrowserInfo() {
    return {
        "Browser": navigator.appCodeName,
        "Version": navigator.appVersion
    };
}

function getLocation() {
    return "Will be done"
}

async function getInfo(){
    await dynamicallyLoadScript();

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

async function dynamicallyLoadScript(url) {
    try {
        WURFL;
    } catch (err) {
        if (err instanceof ReferenceError) {
            var script = document.createElement("script");
            script.src = '//wurfl.io/wurfl.js';
        
            document.head.appendChild(script);

            await sleep(1000);
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}
