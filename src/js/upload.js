/**
 * Created by yeyangmei on 2017/6/13.
 */
import Cropper from 'cropperjs';
import Each from './../../lib/index';
import $ from 'jquery';

var info = {};
var image = document.getElementById('image');
var previews = document.querySelectorAll('.img-preview');
var arr = [];
var cropper = new Cropper(image, {
  viewMode: 1,
  aspectRatio: 4 / 3,
  ready: function(e) {
    console.log(this);// this就是image
    var clone = this.cloneNode();
    clone.className = '';
    clone.style.cssText = (
      'display: block;' +
      'width: 100%;' +
      'min-width: 0;' +
      'min-height: 0;' +
      'max-width: none;' +
      'max-height: none;'
    );
    arr.forEach(x => $(x).remove());// 把跟arr数组里面相同的node节点都删除
    arr = [];
    Each(previews, function (elem) {
      console.log(elem);
      var node = clone.cloneNode();
      arr.push(node);
      elem.appendChild(node);
    });
  },
  crop: function (e) {
    info = e.detail;
    console.log(info);
    var data = e.detail;
    var cropper = this.cropper;
    var imageData = cropper.getImageData();
    var previewAspectRatio = data.width / data.height;

    Each(previews, function (elem) {
      var previewImage = elem.getElementsByTagName('img').item(0);
      var previewWidth = elem.offsetWidth;
      var previewHeight = previewWidth / previewAspectRatio;
      var imageScaledRatio = data.width / previewWidth;

      elem.style.height = previewHeight + 'px';
      previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
      previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
      previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px';
      previewImage.style.marginTop = -data.y / imageScaledRatio + 'px';
    });
  }
});

function upload_file(){
  var mypic = document.getElementById('uploadImage').files[0];
  var fd = new FormData();
  fd.append("uploadImage",mypic);

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){
      alert(xhr.responseText);
    }
  }

  //侦查当前附件上传情况
  xhr.upload.onprogress = function(evt){
    //侦查附件上传情况
    //通过事件对象侦查
    //该匿名函数表达式大概0.05-0.1秒执行一次
    //console.log(evt);
    //console.log(evt.loaded);  //已经上传大小情况
    //evt.total; 附件总大小
    var loaded = evt.loaded;
    var tot = evt.total;
    var per = Math.floor(100*loaded/tot);  //已经上传的百分比
    var son =  document.getElementById('son');
    var percent = document.getElementById('percent');
    percent.innerHTML = per+"%";
    son.style.width=per+"%";
  }

  xhr.open("post","./file_up");
  xhr.send(fd);
}


$('#uploadImage').change(function(){
  $('#percentWrap').css('display','flex');
  var mypic = document.getElementById('uploadImage').files[0];
  image.src = window.URL.createObjectURL(mypic);
  upload_file();
  cropper.replace(image.src);
});


$('.photoSubmit').click(function() {
  $.ajax({
      method: 'post',
      url: 'http://localhost:2733/file_up',
      data: JSON.stringify({ x: info.x, y: info.y, width: info.width, height: info.height }),
      dataType: 'json',
      contentType: 'application/json',
    })
    .done(function(res) {

    })
    .fail(function(err) {

    })
});