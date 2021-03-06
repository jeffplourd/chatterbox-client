// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: {},
  currentRoom: null,
  rooms: {}
};

app.init = function() {
  $('#chats').on('click', '.username', function() {
    app.addFriend($(this).text());
  });
  $('#send').on('submit', app.handleSubmit);

  $('#roomSelect').on('change', function() {
    app.currentRoom = $('#roomSelect').val();
  });

  setInterval(app.fetch, 200);

  $('#newRoom').on('click', function() {
    var roomname = prompt('What\'s the name of the room?');
    app.addRoom(roomname);
    app.currentRoom = roomname;
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
      app.clearMessages();
      for (var i = data.results.length-1; i >= 0; i--) {
        app.addMessage(data.results[i]);
        app.addRoom(data.results[i].roomname);
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
  if (message.roomname === app.currentRoom || app.currentRoom === null) {
    var $chat = $('<div class="chat"></div>').text(message.text);
    var $username = $('<span class="username"></span>').text(message.username);
    $chat.prepend($username);
    $('#chats').append($chat);
    if(app.friends.hasOwnProperty(message.username)) {
      $chat.addClass('friend');
    }
  }
};

app.addRoom = function(roomName) {
  if (roomName !== undefined && !app.rooms.hasOwnProperty(roomName)) {
    var $roomOption = $('<option></option>');
    $roomOption.text(roomName);
    $roomOption.val(roomName);
    $('#roomSelect').append($roomOption);
    app.rooms[roomName] = roomName;
  }
};

app.addFriend = function(friend) {
  app.friends[friend] = friend;
};

app.handleSubmit = function(event) {
  var text = $('#message').val();
  var username = window.location.search.slice(10);
  var room = $('#roomSelect').val();

  app.send({
    text: text,
    username: username,
    roomname: room
  });

  event.preventDefault();

  $('#message').val('');
};

$(document).ready(function() {
  app.init();
});