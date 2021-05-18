// Function définit d'office et appliqué sans au chargement de l'app
$(document).ready(function() {
    let addInput = $('#itemInput');

    addInput.on('keydown', function(e) {
        if (e.code === "Enter") {  
            addItem(e);
        }
    })
});


function addItem() {
    // Récupère la valeur de l'input
    let itemValue = $('#itemInput').val(); 
    let itemNumber = Math.floor(Math.random() * 200);
    // Attribut un id à chaque nouvel item
    let itemId = 'item_' + itemNumber;

    let itemDiv = $('<span class="item"' + ' id="' + itemId + '">' + itemValue + '</span>');
    
    $('.todoItemsContainer').append(itemDiv);
    $('#itemInput').val("");
    console.log('Item ajouter à la liste avec l\'id : ' + itemId);
}