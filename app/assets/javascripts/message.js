
$(function(){ 


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
// 非同期通信
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
   .done(function(data){
     var html = buildHTML(data);
     $('.main-content').append(html);
     $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight});
     $('form')[0].reset();
     $('.form__submit').prop('disabled', false);
   })
   .fail(function() {
     alert("メッセージ送信に失敗しました");
   });
 })

//  自動更新
    var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data:  {id: last_message_id},

    })

      .done(function(messages){
        
        if (messages.length !== 0) {
          var insertHTML = '';
          messages.forEach(function(message) {
            insertHTML += buildHTML(message);
          });
        console.log(insertHTML);
        $('.main-content').append(insertHTML);
        $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight});
        $('form')[0].reset();
        $('.form__submit').prop('disabled', false);
        }
        
      })

      .fail(function() {
        
        alert("メッセージ送信に失敗しました");
      });
    };
    
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


