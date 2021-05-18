// Function définit d'office et appliqué sans au chargement de l'app
$(document).ready(function() {
    let addInput = $('#itemInput');

    addInput.on('keydown', function(e) {
        if (e.code === "Enter") {  
            addItem(e);
        }
    });

    // Récupère le localstorage en entier
    let itemIds = Object.keys(localStorage);
    let itemVal = Object.values(localStorage);

    // Boucle pour afficher les ids et values du localstorage
    for (let i = 0; i < itemIds.length; i++) {
        $('.todoItemsContainer').append(
           $('<span class="item"' + ' id="' + itemIds[i] + '">' + itemVal[i] + '</span>'))
    }
  

});

function addItem() {
    // Récupère la valeur de l'input
    let itemValue = $('#itemInput').val(); 
    let itemNumber = Math.floor(Math.random() * 200);
    // Attribut un id à chaque nouvel item
    let itemId = 'item_' + itemNumber;

    let itemDiv = $('<span class="item"' + ' id="' + itemId + '">' + itemValue + '</span>');

    // Condition si le champ est vide
    if (itemValue != "") {
        localStorage.setItem(itemId, itemValue);
        $('.todoItemsContainer').append(itemDiv);
        $('#itemInput').val("");
    } else {
        alert('Ce champ ne doit pas être vide !')
    }

    console.log('Item ajouter à la liste avec l\'id : ' + itemId);
}

