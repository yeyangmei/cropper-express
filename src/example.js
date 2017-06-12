/**
 * Created by yeyangmei on 2017/6/1.
 */
import Each from './../lib/index';
import $ from 'jquery';
import Cropper from 'cropperjs';


document.getElementById('container').innerHTML = 'HELLO';
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

$('.showBox').click(function(){
  $('.editPhoto').show();
});
var info = {};
var oFReader = new FileReader();
var image = document.getElementById('image');
var previews = document.querySelectorAll('.img-preview');
var arr = [];
var cropper = new Cropper(image, {
  aspectRatio: 16 / 9,
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
    console.log(e);
    // console.log(e.detail.x);
    // console.log(e.detail.y);
    // console.log(e.detail.width);
    // console.log(e.detail.height);
    // console.log(e.detail.rotate);
    // console.log(e.detail.scaleX);
    // console.log(e.detail.scaleY);

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

oFReader.onload = function (oFREvent) {
  image.src = oFREvent.target.result;
  console.log(image.src);
  cropper.replace(image.src);

};
$('#uploadImage').change(function(){
  if (document.getElementById("uploadImage").files.length === 0) { return; }
  var oFile = document.getElementById("uploadImage").files[0];
  console.log(oFile);
  oFReader.readAsDataURL(oFile);
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

// js 各种node

var sp1 = document.createElement('span');// node, nodeName = SPAN
sp1.setAttribute('id', 'newSpan');
sp1.setAttribute('data', 'hello');
var sp1_content = document.createTextNode('新的span元素的内容'); // text, nodeName = #text
sp1.appendChild(sp1_content);

var sp2 = document.getElementById('childSpan');
var parentDiv = sp2.parentNode;
parentDiv.replaceChild(sp1, sp2);
console.log(sp1.parentNode.children[0]);


function f1(){
  var mypic = document.getElementById('myhead').files[0];
  var fd = new FormData();
  fd.append("myhead",mypic);

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


$('#myhead').change(function(){
  $('#percentWrap').css('display','flex');
  //利用files获得被上传附件(图片)信息
  var mypic = document.getElementById('myhead').files[0];
  //利用mypic获得图像的url地址(二进制源码)
  //URL  html5新标准属性
  //window.URL.createObjectURL(mypic);
  document.getElementsByTagName('img')[0].src = window.URL.createObjectURL(mypic);
  f1();
});