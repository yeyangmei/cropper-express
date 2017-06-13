/**
 * Created by yeyangmei on 2017/6/13.
 */
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