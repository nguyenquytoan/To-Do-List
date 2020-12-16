window.onload=startPage
function startPage() {
    let inputValue = localStorage.getItem("data")
    if (inputValue != "") {
        inputValue = inputValue.split(",")
        let itemList = document.getElementById("items")
        for (let i = 0; i < inputValue.length; i++) {
            // Create li element
            let li = document.createElement("li")
            li.className="list-group-item"
            li.appendChild(document.createTextNode(inputValue[i]))
     
            // Create span element
            let span = document.createElement("span")
            span.className="float-left delete mr-4 text-danger"
            span.appendChild(document.createTextNode("x"))
            li.appendChild(span)
     
            // Create another span element
            let anotherSpan = document.createElement("span")
            anotherSpan.className="float-right edit text-primary"
            anotherSpan.appendChild(document.createTextNode("..."))
            li.appendChild(anotherSpan)
     
            itemList.appendChild(li)
     
            // Create another li element
            let anotherLi = document.createElement("li")
            anotherLi.className="list-group-item spec"
            anotherLi.style.display="none"
             
            // Create input element
            let input = document.createElement("input")
            input.type="text"
            input.className="form-control"
            input.placeholder="Edit item..."
            anotherLi.appendChild(input)
     
            itemList.appendChild(anotherLi)
        }
    }
    
    
}
