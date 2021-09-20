var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

    ourRequest.onload = function () {

        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        } else {
            console.log("We connected to the server, but it retuned an error.");
        }
    };

    ourRequest.onerror = function(){
        console.log("Connection error.");
    }
    ourRequest.send();
    pageCounter = pageCounter + 1;
    console.log(pageCounter);

    if (pageCounter > 3) {
        console.log(pageCounter);
        btn.classList.add("hide-me");
        // btn.innerHTML= 'do not click me anymore';
    }
});

function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i < data.length; i++) {
        htmlString = '<p>' + data[i].name + ' is a ' + data[i].species + ' that likes to eat  ';
        for (ii = 0; ii < data[i].foods.likes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii];

            }
            else {
                htmlString += ' and ' + data[i].foods.likes[ii];
            }
        }

        htmlString += ' and dislikes ';

        for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];

            }
            else {
                htmlString += ' and ' + data[i].foods.dislikes[ii];
            }
        }

        htmlString += '.<p>';

        animalContainer.insertAdjacentHTML("beforeend", htmlString);
    }

}
