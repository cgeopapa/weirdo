async function getLocation() {
    const url = "http://api.ipstack.com/check?access_key=fd08d25dc92185d49eb6a2cfc20db33b";
    let loc;
    await fetch(url)
    .then(data=>{return data.json()})
    .then(res=>{loc = res});
    return {
        "Continent": loc.continent_name,
        "Country": loc.country_name,
        "Region": loc.region_name,
        "City": loc.city,
        "Zip": loc.zip,
        "Latitude": loc.latitude,
        "Longitude": loc.longitude,
    };
}

async function getInfo(){
    await dynamicallyLoadScript();

    const info = {
        "Browser": WURFL.complete_device_name,
        "OS": navigator.platform,
        "UserAgent": navigator.userAgent,
        "GeoLocation": await getLocation(),
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
            flag = true;
            while(flag) {
                flag = false;
                try {
                    WURFL
                } catch(err) {
                    flag = true;
                    await sleep(1000)
                }
            }
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}
