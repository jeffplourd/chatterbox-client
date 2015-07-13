// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: {}
};

app.init = function() {
  $('#chats').on('click', '.username', function() {
    app.addFriend($(this).text());
  });
  $('#send').on('submit', app.handleSubmit);

  setInterval(app.fetch, 200);
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Messages fetched');
      app.clearMessages();
      for (var i = 0; i < data.results.length; i++) {
        app.addMessage(data.results[i]);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch messages');
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function(message) {
  var $chat = $('<div class="chat"></div>').text(message.text);
  var $username = $('<span class="username"></span>').text(message.username);
  $chat.prepend($username);
  $('#chats').append($chat);
  if(app.friends.hasOwnProperty(message.username)) {
    $chat.addClass('friend');
  }
};

app.addRoom = function(roomName) {
  var $roomOption = $('<option></option>');
  $roomOption.text(roomName);
  $roomOption.val(roomName);
  $('#roomSelect').append($roomOption);
};

app.addFriend = function(friend) {
  app.friends[friend] = friend;
};

app.handleSubmit = function() {
  //
  var text = $('#message').val();
  var username = window.location.search.slice(10);
  var room = $('#roomSelect').val();


};

$(document).ready(function() {
  app.init();
});