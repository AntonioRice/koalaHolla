console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    $.ajax({
      type: 'POST',
      url: '/koalas',
      data: objectToSend,
      success: function(response){
        getKoalas();
      }
    });
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      appendToDom(data.koalas);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){

      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
}


function appendToDom(koalas){
  $('#viewKoalas').empty();

  for(i=0;i<koalas.length;i++){
    var k = koalas[i];
    var tr = $('<tr></tr>');

    // id serial PRIMARY KEY,
    // name character varying(12),
    // gender character varying(7),
    // age integer,
    // ready_for_transfer boolean,
    // notes character varying(12)
    tr.data('koalas', k);

    tr.append('<td>' + k.id + '</td>');
    tr.append('<td>' + k.name + '</td>');
    tr.append('<td>' + k.gender + '</td>');
    tr.append('<td>' + k.age + '</td>');
    tr.append('<td>' + k.ready_for_transfer + '</td>');
    tr.append('<td>' + k.notes + '</td>');
    if(k.ready_for_transfer == false){
      tr.append('<td><button class="transferButton" data-k.ready_for_transfer="' + k.ready_for_transfer + '">Ready For Transfer</button></td>');
    }else{
      tr.append('<td></td>');
    }
    tr.append('<td><button class="deleteButton" data-k.id="' + k.id + '">Delete</button></td>');
    $('#viewKoalas').append(tr);


  }

}
