$(document).ready(function() {

  $.ajax({
    url: '/contacts',
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(data) {
      $.each(data, function(index, element) {
        $('tbody').append(`<tr class='row'><td>${element.firstname}</td> <td>${element.lastname}</td> <td>${element.email}</td> </tr>`)
      });
    }
  });

  // ##################################################################

  $('.row').click();

  // $('.row').on('click', update_cb);

  // function  update_cb(ev) {
  //   ev.preventDefault();
  // }




  // ##################################################################

  $('#new_contact').on('submit', function(ev) {
    ev.preventDefault();

    let items = $(this).serializeArray(); //'this' refers to #new_contact
    let emptyObject = {};

    items.forEach(function(item) {
      emptyObject[item.name] = item.value;
    });

    $.post('/contacts/new', emptyObject)
    .done( function(results) {
      console.log(results);
      results = JSON.parse(results);
      $('tbody').append(
        `<tr><td>${results.firstname}</td><td>${results.lastname}</td><td>${results.email}</td></tr>`)
    })

  });

  // ##################################################################

$('#search_contact').on('submit', function(ev) {
  ev.preventDefault();

  let search_id = $(this).serializeArray();
  let search_j = {};

  console.log(search_id);

  search_id.forEach(function(search) {
    search_j[search.name] = search.value;
  });
  $.getJSON(`/contacts/search?id=${search_j.id}`)
  .done( function(results) {
    console.log(results);
    $('#search_display').append(`<p>You searched: ${results.id} = ${results.firstname} ${results.lastname}</p>`)
  })

});

$('#delete_contact').on('submit', function(ev) {
  ev.preventDefault();

  let id_to_delete = $(this).serializeArray();
  let json_delete = {};

  console.log(id_to_delete)

  id_to_delete.forEach(function(element) {
    json_delete[element.name] = element.value;
  });

  $.post(`/contacts/delete?id=${json_delete.id}`)
  .done( function() {

    $('#display_deleted').append(`<p>Deleted!</p>`)
  })
  .fail( function() {
    $('#display_deleted').append(`<p>Record Not Found!</p>`)
  })
});

});


