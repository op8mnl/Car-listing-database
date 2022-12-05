async function getAllVINS() {
    document.getElementById("username").innerText = ""
    document.getElementById("username").innerText = document.getElementById("usernameInput").value
    const query = await fetch(`/api/users/${document.getElementById("usernameInput").value}`)
    const data = await query.json()
    const ul = document.getElementById("vins")
    ul.innerHTML="";
    data.map(data=>{
        const wrapper = document.createElement("div");
        wrapper.appendChild(document.createTextNode(data.VIN))
        ul.appendChild(wrapper)
    })
}

async function getSellRequest() {
    const query = await fetch(`/api/users/${document.getElementById("username").innerText}`)
    const data = await query.json()
    const p1 = document.getElementById("sellRequest")
    const p2 = document.getElementById("duration")
    p1.innerText = data[0].AskingPrice
    p2.innerText = data[0].RequestDuration
        alert(data)

}


