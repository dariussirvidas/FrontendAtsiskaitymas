"use strict";
(function () {
    console.log("hello world");    
    const searchField = document.querySelector("input.searchField");
    const searchButton = document.querySelector("button.searchButton");
    const resultDiv = document.querySelector("div.result");
    
    searchButton.addEventListener("click", search);

    function showAlert(message) {
        let alert = document.createElement("p");      
        alert.textContent = message;        
        resultDiv.appendChild(alert);
    }

    function addRow(table, name, content) {
        let row = document.createElement("tr");
        table.appendChild(row);
        let cellName = document.createElement("th");
        cellName.textContent = name
        row.appendChild(cellName);
        let cellContent = document.createElement("td");
        cellContent.textContent = content;
        row.appendChild(cellContent);
    }

    function displayInfo(movie) {
        let table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-dark");
        table.classList.add("table-bordered");        
        resultDiv.appendChild(table);        
        addRow(table, "Pavadinimas", movie["Title"]);
        addRow(table, "Trumpa informacija apie filmą", movie["Plot"]);
        addRow(table, "IMDB reitingas", movie["imdbRating"]);
        addRow(table, "Trukmė", movie["Runtime"]);
        addRow(table, "Režisierius", movie["Director"]);
    }

    async function search() {
        const response = await fetch("https://www.omdbapi.com/?apikey=e4db3ced&t={" + searchField.value + "}");
        const movie = await response.json();
        while (resultDiv.hasChildNodes()) {
            resultDiv.removeChild(resultDiv.firstChild);
        }
        if (movie["Response"] == "True") {            
            displayInfo(movie);            
        }
        else {
            showAlert("filmas nerastas");
            //alert("filmas nerastas");
        }
    }
})();