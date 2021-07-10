var info;

async function displayInfo() {
    info = await getInfo("fd08d25dc92185d49eb6a2cfc20db33b");

    var jsonViewer = new JSONViewer();
    document.getElementById("info").appendChild(jsonViewer.getContainer());
    jsonViewer.showJSON(info, -1, -1);
}

function storeInfo() {
    if (confirm("Are you sure? Again, by clicking here your info will be stored in a remote database and will be accessible to be viewed here in this webpage.")) {
        if (confirm("Are you 100% sure? Anyway if you change your mind please email me here and I will delete your data asap: cgeocodgod@gmail.com")) {
            postInfo(info, "https://webhooks.mongodb-realm.com/api/client/v2.0/app/weirdoinaction-atuuo/service/WeirdoInActionAPI/incoming_webhook/AddInfo?secret=weirdo.jsinaction")
            .then(res => {
                document.getElementById("confirm")
                document.getElementById("PostMessage").innerHTML = res
            });
        }
    }
}

function Start() {
    displayInfo();

    var jsonViewer = new JSONViewer();
    fetch("https://webhooks.mongodb-realm.com/api/client/v2.0/app/weirdoinaction-atuuo/service/WeirdoInActionAPI/incoming_webhook/GetInfo?secret=weirdo.jsinaction")
    .then(res => res.json())
    .then(data => {
        document.getElementById("allinfo").appendChild(jsonViewer.getContainer());
        jsonViewer.showJSON(data, -1, -1);
    })
}
