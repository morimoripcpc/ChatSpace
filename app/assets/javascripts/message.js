
$(function(){ 

  // console.log(last_message_id);

  function buildHTML(message){
    if (message.image) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;

   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }

 $('#new_message').on('submit', function(e){
  e.preventDefault();
   var formData = new FormData(this);
   var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
 
   .done(function(messages){
     console.log('success');
     if (messages.length !== 0) {
       var insertHTML = '';
       $.each(messages, function(i, message) {
         insertHTML += buildHTML(message)
       });
 
     var html = buildHTML(message);
     $('.main-content').append(html);
     $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight});
     $('form')[0].reset();
     $('.form__submit').prop('disabled', false);
     }
     $('.messages').append(insertHTML);
   })
 
   .fail(function() {
     console.log('error');
     alert("メッセージ送信に失敗しました");
   });
 })

 });

$('#new_message').on('submit', function(e){
 e.preventDefault();
//  var formData = new FormData(this);
//  var url = $(this).attr('action')
 last_message_id = $('.message:last').data("message-id");
 console.log(last_message_id);
 $.ajax({
   url: "api/messages",
   type: 'get',
   dataType: 'json',
   data:  {id: last_message_id},
   processData: false,
   contentType: false
 })

  .done(function(messages){
    console.log('success');
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });

    var html = buildHTML(message);
    $('.main-content').append(html);
    $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight});
    $('form')[0].reset();
    $('.form__submit').prop('disabled', false);
    }
    $('.messages').append(insertHTML);
  })

  .fail(function() {
    console.log('error');
    alert("メッセージ送信に失敗しました");
  });
})
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


