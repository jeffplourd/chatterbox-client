// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: []
};

app.init = function() {
  $('#chats').on('click', '.username', function() {
    app.addFriend($(this).text());
  });
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
}

app.addRoom = function(roomName) {
  var $roomOption = $('<option></option>');
  $roomOption.text(roomName);
  $roomOption.val(roomName);
  $('#roomSelect').append($roomOption);
};

app.addFriend = function(friend) {
  app.friends.push(friend);
};

$(document).ready(function() {
  app.init();
});