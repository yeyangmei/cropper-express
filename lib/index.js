/**
 * Created by yeyangmei on 2017/6/1.
 */

export default function each(arr, callback) {
  var length = arr.length;
  var i;

  for (i = 0; i < length; i++) {
    callback.call(arr, arr[i], i, arr);
  }

  return arr;
}