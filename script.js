let books = [];

function show(current, hide){
    let section_show = document.querySelector(current);
    let section_hide = document.querySelector(hide);
    section_show.style.display = "block";
    section_hide.style.display = "none";
}

function add_book(){
    let name = "book" + books.length;
    let title = document.getElementById("title");
    let front = document.getElementById("front");
    let author = document.getElementById("author");
    let genre = document.getElementById("genre");
    let year = document.getElementById("year");
    
    let inputs = document.querySelectorAll(".info_book input");
    let validation = true;
    inputs.forEach((input) =>{
        if (input.value.trim() == ""){
            console.log("vacio");
            validation = false
        }
    })
    if (validation){
        window[name]={
            title:title.value,
            front:front.value,
            author:author.value,
            genre:genre.value,
            year:year.value,
            avaliable:true,
            lend:false
        }
        books.push(window[name])
        console.log(books);
        localStorage.setItem("books_campus", JSON.stringify(books))
        load_books()
        show(`#books`,`#add`)
    }else{
        alert("No dejes campos vacios")
    }
}

function load_books(){
    books = JSON.parse(localStorage.getItem("books_campus"));
    console.log(books);
    let container = document.querySelector(".contain_books");
    container.textContent = "";
    for(let x = 0;x < books.length;x++){
        let div_book = document.createElement("div");
        div_book.classList.add("book");
        let div_img = document.createElement("div");
        let img = document.createElement("img")
        img.setAttribute("src", books[x].front);
        div_img.appendChild(img)

        let div_text = document.createElement("div")
        let p = document.createElement("p");
        let avaliable = "";
        let lend = ""

        let b_lend = document.createElement("button");
        b_lend.textContent = "Prestar";
        b_lend.setAttribute("data-id", x);
        b_lend.setAttribute("onclick", "to_lend(this)");
        b_lend.classList.add("button")
        let b_delete = document.createElement("button");
        b_delete.textContent = "Eliminar";
        b_delete.setAttribute("class","b_delete button");

        if(!books[x].lend){
            avaliable = "Disponible";
            lend = "-"
        }else{
            avaliable = "Prestado";
            lend = books[x].avaliable;
            b_lend.style.pointerEvents = "none";
        }
        
        p.innerHTML = "Titulo: "+ books[x].title + "<br>" +
             "Autor: "+ books[x].author + "<br>" +
             "Genero: "+ books[x].genre + "<br>" +
             "Año de publicacion: "+ books[x].year + "<br>" +
             "Estado: "+ avaliable + "<br>" +
             "Prestamo: "+ lend + "<br>";

        div_text.appendChild(p);
        div_text.appendChild(b_lend);
        div_text.appendChild(b_delete);
        div_book.appendChild(div_img);
        div_book.appendChild(div_text)
        container.appendChild(div_book);
    }
}

function change_back(link){
    let img = document.getElementById("img_add");
    img.setAttribute("src", link);
}

function to_lend(button){
    let container = button.parentElement
    let id = button.getAttribute("data-id");
    let p = container.querySelector("p");
    let buttons = document.querySelectorAll(".button");
    let hide_b = container.querySelectorAll(".button");
    hide_b.forEach((button)=>{
        button.style.display = "none"
    })
    buttons.forEach((button)=>{
        button.style.pointerEvents = "none"
    })

    p.style.display = "none";
    

    let label = document.createElement("label");
    label.textContent = "Digita el nombre del prestatario:";
    let input = document.createElement("input");
    input.setAttribute("id", "change");
    input.setAttribute("placeholder", "Nombre")
    let save = document.createElement("button");
    save.textContent = "Guardar";
    let back = document.createElement("button");
    back.textContent = "Cancelar";
    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(save);
    container.appendChild(back);
    save.addEventListener("click", function(){
        if (input.value.trim() == ""){
            input.setAttribute("placeholder", "Completa este campo")
        }else{
            books[id].avaliable = input.value;
            books[id].lend = true;
            localStorage.setItem("books_campus", JSON.stringify(books))
            load_books()
        }
    })
    back.addEventListener("click", function(){
        load_books()
    })
}

window.addEventListener("load", load_books)