/**
 * Created by yeyangmei on 2017/6/1.
 */

import $ from 'jquery';

$('.tijiao').click(function() {
    $.ajax({
      method: 'post',
      url: 'http://localhost:2733/process_post',
      data: JSON.stringify({first_name: $('.nameInput').val(), last_name: $('.nameInputLast').val()}),
      contentType: 'application/json',
      dataType: 'json',
    })
      .done(function (res) {
        console.log(res);
      })
      .fail(function(err) {
        console.log(err);
      })
});
