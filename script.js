function getRestData(url) {
    return new Promise(function (resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status >= 200 && this.status <= 300) {
                resolve(this.responseText);
            }
        };
        xhttp.open("GET", url, false);
        xhttp.onerror = () => reject(xhttp.statusText);
        xhttp.send();
    })
}
function callApi() {
    getRestData("https://restcountries.eu/rest/v2/all").then(function (data) {

        let realData = JSON.parse(data);
        let len = realData.length;

        var mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'container text-center');

        var row = document.createElement('div');
        row.setAttribute('class', 'row');

        var col = document.createElement('div');
        col.setAttribute('class', 'col-sm-12');

        for (let i = 0; i < len; i++) {

            var card = document.createElement('div');
            card.setAttribute('class', 'card col-sm-12');

            let name = document.createElement('div');
            name.setAttribute('class', 'card-title');
            name.innerHTML = "<h1> Country : " + realData[i]["name"] + "</h1> <br> <h3>National Flag </h3>";

            let img = document.createElement('img');
            img.setAttribute('class', 'card-img-top');
            img.src = realData[i]["flag"];

            let bodyDiv = document.createElement('div');
            bodyDiv.setAttribute('class', 'card-title');
            bodyDiv.innerHTML = "<h3>Capital : " + realData[i]["capital"] + "</h3>" + " <h4> Region : " + realData[i]["region"] + "</h4>";

            let currencies = document.createElement('div');
            currencies.setAttribute('class', 'card-body')

            let currenciesLength = realData[i]["currencies"].length;
            for (let j = 0; j < currenciesLength; j++) {
                bodyDiv.innerHTML += "Currencies Code : " + realData[i]["currencies"][j]['code']+"<br><h4> Currency Name : "+ realData[i]["currencies"][j]['name'] +"</h4> <br> <h4> Currency Symbol : "+ realData[i]["currencies"][j]['symbol']+"</h4>";

            }

            card.appendChild(name);
            card.appendChild(img);
            card.appendChild(bodyDiv);
            col.appendChild(card);

        }
        row.appendChild(col);
        mainDiv.appendChild(row);

        var body = document.getElementsByTagName('body');
        document.body.appendChild(mainDiv);


    }).catch(function (err) {
        console.log("error")
        console.log(err);
    })
}