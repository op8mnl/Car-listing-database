function createVINS() {

const para = document.createElement("div");

const newContent = document.createTextNode("abcdefg ");

const currentDiv = document.getElementById("vins");

para.appendChild(newContent);

currentDiv.appendChild(para);
}

function showSellRequest() {

    const para1 = document.createElement("div");
    const para2 = document.createElement("div");
    const para3 = document.createElement("div");
    
    const newContent1 = document.createTextNode("abcdefg ");
    const newContent2 = document.createTextNode("abcdefg ");
    const newContent3 = document.createTextNode("abcdefg ");
    
    const currentDiv1 = document.getElementById("sellrqst");
    const currentDiv2 = document.getElementById("sellrqst");
    const currentDiv3 = document.getElementById("sellrqst");
    
    para1.appendChild(newContent1);
    para2.appendChild(newContent2);
    para3.appendChild(newContent3);
    
    currentDiv1.appendChild(para1);
    currentDiv2.appendChild(para2);
    currentDiv3.appendChild(para3);
    }



