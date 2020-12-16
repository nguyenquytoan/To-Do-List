let form = document.getElementById("addForm")
let itemList = document.getElementById("items")
let search = document.getElementById("search")
let button = document.getElementById("button")
let userData
if (localStorage.getItem("data") == null) {
    userData = []
}
else {
    userData = Array(localStorage.getItem("data"))
}

form.addEventListener("submit", newItem)
itemList.addEventListener("click", deleteItem)
search.addEventListener("keyup", searchItem)
itemList.addEventListener("click", showHideItem)
button.addEventListener("click", showAdd)

// Create new list's item
function newItem(e) {
    e.preventDefault()

    // Get input's value
    let inputValue = document.getElementById("myItem").value

    // Check input's value
    if (inputValue === '') {
        alert("You must type something!")
    }
    else {
        // Create li element
        let li = document.createElement("li")
        li.className="list-group-item"
        li.appendChild(document.createTextNode(inputValue))

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

        // Save user's data
        userData.push(inputValue)
        localStorage.setItem("data", userData)
        //document.getElementById("test").innerHTML = userData
    }
    
}

// Delete item
function deleteItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Do you want to delete this item?")) {
            let li = e.target.parentElement
            itemList.removeChild(li) 
            if (localStorage.getItem("data")!=null){
                let data = localStorage.getItem("data").split(",")
                data = data.filter(item => item != e.target.parentElement.firstChild.textContent)
                if (data.length == 0) {
                    localStorage.removeItem("data")
                }
                else {
                    localStorage.setItem("data", data)
                }
                
            } 
        }
    }
}

// Search item
function searchItem(e) {
    let inputValue = e.target.value.toLowerCase()
    let items = itemList.querySelectorAll("li:not(.spec)")

    Array.from(items).forEach(item => {
            let itemName = item.firstChild.textContent.toLowerCase()
            if (itemName.indexOf(inputValue) != -1) {
                item.style.display = "block"
            }
            else {
                item.style.display = "none"
            }
        
        
    })
}

// Show/hide item
function showHideItem(e) {
    if (e.target.classList.contains("edit")) {
        if (e.target.parentElement.nextSibling.style.display === "none") {
            e.target.parentElement.nextSibling.style.display="block"
            e.target.parentElement.nextSibling.id = "editItem"
            e.target.parentElement.nextSibling.firstChild.id = "edit"
            
        }
        else {
            e.target.parentElement.nextSibling.style.display="none"
        }

        let edit = document.getElementById("edit")
        edit.addEventListener("keyup", function(e){
            if (e.keyCode === 13) {
                
                let input = document.getElementById("edit").value
                if (input === '') {
                    alert('You must type something or you could click "..." to hide!')
                }
                else {
                    if (confirm('Do you want to change this item into "' + input + '"?')) {
                        let oldValue = document.getElementById("editItem").previousSibling.firstChild.textContent
                        document.getElementById("editItem").previousSibling.firstChild.textContent = input
                        //document.getElementById("edit").placeholder="Edit item..."
                        document.getElementById("editItem").style.display="none"  
                        if (localStorage.getItem("data")!=null){
                            let data = localStorage.getItem("data").split(",")
                            if (data.length == 0|| data == null) {
                                localStorage.removeItem("data")
                            }
                            else {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i] == oldValue) {
                                        data[i] = input
                                    }
                                }
                                localStorage.setItem("data", data)
                            }
                            
                        }                  
                    }
                }
            }
        })
    }
}

// Show add
function showAdd(e) {
    if (document.getElementById("addForm").style.display=="none") {
        document.getElementById("addForm").style.display="block"
    }
    else {
        document.getElementById("addForm").style.display="none"
    }
    
}