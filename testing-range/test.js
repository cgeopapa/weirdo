var info;

async function get() {
    info = await getInfo("fd08d25dc92185d49eb6a2cfc20db33b");
    post();
}

function post() {
    postInfo("http://localhost:5000/info", info, true);
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:5000/weirdo")
    .then(res => {
        if(!res.headers.get('cached')) {
            return res.blob();
        }
        return false;
    }).then((wierdo) => {
        if (wierdo !== false) {
            const url = URL.createObjectURL(wierdo);
            new Promise((resolve, reject) => {
                const script = document.createElement('script');
                document.body.appendChild(script);
                script.onload = resolve;
                script.onerror = reject;
                script.async = true;
                script.src = url;
            }).then(() => {
                get();
            });
        }
    })
    .catch(err => console.log(err))
})
