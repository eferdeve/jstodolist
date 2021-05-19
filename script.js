// Function définit d'office et appliqué au chargement de l'app
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
    };

    // Transition de la colonne "A FAIRE" -> "EN COURS"
    function progressItem() {
        $('.item').click((e) => {
                let target = e.target;
               
                $('.progressItemContainer').append(target);
                target.className = 'item' + ' progress';
                $('.progress').attr('onclick', finishItem());
            }
        );
    };

    // Transition de la colonne "EN COURS" -> "TERMINEE"
    function finishItem() {
        if ($('.item').hasClass('progress')) {
            $('.progress').click((e) => {
                let target = e.target;
    
                $('.finishItemContainer').append(target);
                target.className = 'item' + ' finish';
            })
        }
    };

    // Appel des functions qui ne peuvent être misent en onclick dans le DOM
    progressItem();
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
        console.log('Item ajouter à la liste avec l\'id : ' + itemId);
    } else {
        alert('Ce champ ne doit pas être vide !')
    }


}

