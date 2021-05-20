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
    // Récupère le sessionStorage en entier
    let itemSessionId = Object.keys(sessionStorage);
    let itemSessionValue = Object.values(sessionStorage);

    // Boucle pour afficher les ids et values du localstorage
    for (let i = 0; i < itemIds.length; i++) {
        $('.todoItemsContainer').append(
           $('<span class="item"' + ' id="' + itemIds[i] + '">' + itemVal[i] + '</span>'));
        $(`#${itemIds}`).attr('onclick', 'progressItem()');
    };

    if (itemSessionValue != "true") {
        for (let i = 0; i < itemSessionId.length; i++) {
            $('.progressItemContainer').append(
                $('<span class="item"' + ' id="' + itemSessionId[i] + '">' + itemSessionValue[i] + '</span>')
            );
        }
    }

    // Appel des functions qui ne peuvent être misent en onclick dans le DOM
    progressItem();
});

function addItem() {
    // Récupère la valeur de l'input
    let itemValue = $('#itemInput').val(); 
    let itemNumber = Math.floor(Math.random() * 200);
    // Attribut un id à chaque nouvel item
    let itemId = `item_${itemNumber}`;

    let itemDiv = $(`<span class="item" onclick="progressItem();" id="${itemId}">${itemValue}</span>`);

    // Condition si le champ est vide
    if (itemValue != "") {
        localStorage.setItem(itemId, itemValue);
        $('.todoItemsContainer').append(itemDiv);
        $('#itemInput').val("");
        console.log(`Item ajouter à la liste avec l'id : ${itemId}`);
    } else {
        alert('Ce champ ne doit pas être vide !')
    }
}

    // Transition de la colonne "A FAIRE" -> "EN COURS"
    function progressItem() {
        $('.item').click((e) => {
                let target = e.target;
                let id = '#' + e.target.id;
                let value = $(target).html();
               
                $('.progressItemContainer').append(target);
                target.className = `item progress`;
                $(id).attr('onclick', finishItem());

                sessionStorage.setItem(target.id, value);
                localStorage.removeItem(target.id, value);
                console.log();
            }
        );
    };

    // Transition de la colonne "EN COURS" -> "TERMINEE"
    function finishItem() {
        if ($('.item').hasClass('progress')) {
            $('.progress').click((e) => {
                let target = e.target;
                let value = $(target).html();
                let id = '#' + e.target.id;
    
                $('.finishItemContainer').append(target);
                target.className = `item finish`;
                sessionStorage.removeItem(target.id, value);
                $(id).attr('onclick', 'trashItem();');
            })
        }
    };

    // Faire la function de suppression des tâches
    function trashItem() {
        if ($('.item').hasClass('finish')) {
            $('.finish').click((e) => {
            let target = e.target;
            let value = $(target).html();
            let id = '#' + target.id;

            $('.deletedItemsContainer').append(target);
            $(id).addClass('ghost fas fa-ghost');
            $(id).addClass('deletedItems');
            $(id).removeClass('item');
            $(id).removeClass('finish');

            
            $(id).removeAttr('onclick');
            })
        }
    }



