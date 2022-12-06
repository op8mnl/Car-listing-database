async function getAllVINS() {
  document.getElementById("username").innerText = "";
  document.getElementById("username").innerText =
    document.getElementById("usernameInput").value;
  const query = await fetch(
    `/api/users/${document.getElementById("usernameInput").value}`
  );
  const data = await query.json();
  const ul = document.getElementById("vins");
  ul.innerHTML = "";
  data.map((data) => {
    const wrapper = document.createElement("div");
    wrapper.appendChild(document.createTextNode(data.VIN));
    ul.appendChild(wrapper);
  });
}

async function getSellRequest() {
    const query = await fetch(`/api/users/${document.getElementById("usernameInput").innerText}`)
    const data = await query.json()
    const p1 = document.getElementById("sellRequest")
    const p2 = document.getElementById("duration")
    p1.innerHTML = ""
    p2.innerHTML = ""
    data.map(data=>{
        const wrapper = document.createElement("div");
        wrapper.appendChild(document.createTextNode("Current Asking Price: " + data.AskingPrice))
        const wrapper2 = document.createElement("div");
        wrapper.appendChild(document.createTextNode("Current Asking Price: " + data.RequestDuration))
        p1.appendChild(wrapper)
        p2.appendChild(wrapper2)
    })

}

async function updateSellRequest(){

    await fetch(`/api/sellrequest/${document.getElementById("usernameInput").value}/${document.getElementById("vinInput").value}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            askingprice : document.getElementById("newsell"),
            duration : document.getElementById("newdur"),
            
        })
    });

}


async function getEmployee() {
    const query = await fetch(`/api/dealership/${document.getElementById("pickDealership").value}`)
    const data = await query.json()
    for (var i =0; i < data.length;i++){
        await fetch(`/salesrep/${document.getElementById("raise").value}/${data[i].PhoneNumber}`)
    }
    alert (`Updated for ${data.length} employee(s).`)
}
