/*
*
 * Write a simple web-based application that allows a user to post, edit, 
 * and delete to-do items on the server.  You may use the languages/technologies of your choice.
 * 
*/

var TODO = (function($, _){
  'use strict';

  var items = [], // current session 
    todo = {}; 

  todo.addItem = function(item){
    items.push(item);
  };
  
  todo.total = function(){
    return items.length;
  };

  todo.removeItem = function(itemId){
   _.remove(items, function(item){ 
      return (item === _.where(items, {id: +(itemId)})[0])
   });
  };

  todo.addRow = function(data){
   var item = JSON.parse(data);
    todo.addItem(item);

    var tr = $('<tr/>', {
      "class" : 'list-row',
      "data-item-id": item.id
    });
    $('<td></td>',{
    }).append($('<input />',{
      "class": "description",
      "data-item-id": item.id,
      "value" : item.description,
      "readonly":""
    })).append($('<a/>', {
      "class": 'edit',
      'href' : '#',
      'text' : 'edit'
    })).append($('<a/>', {
      "class": 'save',
      'href' : '#',
      'text' : 'save'
    })).appendTo(tr);

    $('<td></td>',{
    }).append($('<input>', {
      'type': 'checkbox',
      'class': 'status',
      'checked': data.done
    })).appendTo(tr);

    $('<td></td>').append($('<button />',{
      "class": "remove",
      "text" : 'remove'
    })).appendTo(tr);

    $("#tbody").append(tr);
  };

  todo.removeRow = function(itemId){
    var row = $('.list-row[data-item-id =' + itemId + ']');
    this.removeItem(itemId);
    row.remove();
  };

  todo.postItem = function(item){
    $.ajax({
      url: '/items',
      type: 'POST',
      data: {item: JSON.stringify(item)},
    })
    .done(function(data) {
      todo.addRow(data);
    })
    .fail(function(xhr) {
      console.log(jxhr.statusText);
    });

  };

  todo.updateItem = function(params){
    $.ajax({ 
      url: '/item/'+params.id,
      type: 'PUT',
      data: { item: params }
    })
    .done(function(data) {
      //
    })
    .fail(function(jxhr) {
      console.log(jxhr.statusText);
    });
  };

  todo.deleteItem = function(id){
    $.ajax({ 
      url: '/item/'+ id,
      type: 'DELETE'
    })
    .done(function(data) {
      todo.removeRow(JSON.parse(data).id);
    })
    .fail(function(xhr) {
      console.log(jxhr.statusText);
    });
  };

  return todo;
})(jQuery, _); // Inject dependencies: lodash and jQuery

  
$(document).on('click', '#add', function() {
 var item = {
    description: $('#add-input').val(),
    done: false
  };
  
  TODO.postItem(item);

  $('#add-input').val(" ");
});

$(document).on('click', '.remove', function() {
  var itemId = $(this).parents('.list-row').data('itemId');

  TODO.deleteItem(itemId);
});

$(document).on('click', '.edit', function() {
  $(this).prev().focus();
  $(this).prev().prop('readonly', '');
});

$(document).on('click', '.save', function() {
  var itemId = $(this).parents('.list-row').data('itemId');
  description = $(this).parents('.list-row').val();

  TODO.updateItem({description: description, id: itemId});
});

$(document).on('click', '.status', function() {
  var itemId = $(this).parents('.list-row').data('itemId');

  TODO.updateItem({done: $(this).is(':checked'), id: itemId});
});

