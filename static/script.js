async function getAllVINS() {
  document.getElementById("username").innerText = "";
  document.getElementById("username").innerText = document.getElementById("usernameInput").value
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
    const query = await fetch(`/api/users/${document.getElementById("username").innerText}`)
    const data = await query.json()
    const p1 = document.getElementById("sellrqst")
    p1.innerHTML = ""
    data.map(data=>{
        if (data.VIN == document.getElementById("vinInput").value){
          const wrapper = document.createElement("div");
          wrapper.appendChild(document.createTextNode("Current Asking Price: " + data.AskingPrice +" "))
          const wrapper2 = document.createElement("div");
          wrapper.appendChild(document.createTextNode("Current Duration: " + data.RequestDuration + " days"))
          p1.appendChild(wrapper)
          p1.appendChild(wrapper2)
        }
    })

}

async function updateSellRequest(){

    const res = await fetch(`/api/sellrequest/${document.getElementById("usernameInput").value}/${document.getElementById("vinInput").value}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            askingprice : document.getElementById("newsell").value,
            duration : document.getElementById("newdur").value,
        })
    });
    if (res.ok){
      alert("Updated Successfully");
    }
}


async function getEmployee() {
    const query = await fetch(`/api/dealership/${document.getElementById("pickDealership").value}`)
    const data = await query.json()
    alert(JSON.stringify(data))
    for (var i =0; i < data.length;i++){
        await fetch(`/api/salesrep/${document.getElementById("raise").value}/${data[i].PhoneNumber}`)
    }
    alert (`Updated for ${data.length} employee(s).`)
    const query2 = await fetch(`/api/dealership/${document.getElementById("pickDealership").value}`)
    const data2 = await query2.json()
    alert(JSON.stringify(data2))
}

async function findAdmin(){
  const query = await fetch(`/api/minAdmin`)
  const data = await query.json()
  const min = data[0].smallest
  const query2 = await fetch(`/api/useraccount/${min}`)
  const data2 = await query2.json()
  document.getElementById('admin').innerText = ""
  document.getElementById('admin').innerText = data2[0].Email
}
async function addSalesRep(){
  const res = await fetch(`/api/salesrep/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        pn : document.getElementById("pn").value,
        name : document.getElementById("name").value,
        age : document.getElementById("a").value,
        gender : document.getElementById("g").value,
        salary : document.getElementById("s").value,
        hours : document.getElementById("h").value,
        email : document.getElementById("admin").innerText,
      
    })
  });
  if (res.ok){
    alert("Salesrep added Successfully");
  }
}

async function getAllTransactions() {
  const query = await fetch(`/api/transaction`);
  const data = await query.json();
  const ul = document.getElementById("transactions");
  ul.innerHTML = "";
  data.map((data) => {
    const wrapper = document.createElement("div");
    wrapper.appendChild(document.createTextNode("Transaction Num: " + data.TransactionNum + "  " + "Transaction Amount: " + data.TransactionAmt + "  " + "Transaction Date: " + data.TransactionDate + "  " + "Buyer: " + data.BuyerInfo + "  " + "Seller: " + data.SellerInfo + "  " + "VIN: " + data.VIN + "\n"));
    ul.appendChild(wrapper);
  });
}

async function deleteTransaction(){

  const res = await fetch(`/api/transaction/${document.getElementById("delete-transaction").value}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({})
  });
  if(res.ok){
      alert("Transaction deleted sucessfully")
  }
}

async function createSellRequest(){
  const res = await fetch(`/api/requests/${document.getElementById("v").value}/${document.getElementById("u").value}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          ap : document.getElementById("ap").value,
          dur : document.getElementById("d").value
          
      })
  });
  
  if(res.ok){
      alert("Created sell request sucessfully")
  }
}