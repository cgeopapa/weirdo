async function displayInfo() {
    document.getElementById("info").innerHTML = JSON.stringify(await getInfo(), null, 2);
}