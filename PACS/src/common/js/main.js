let preams = {   // 传入0or 不传代表今天    负数是代表昨天和以前的
  getDate(index) {
    var d = new Date();
    if (index != 0 && index != undefined) {
      d.setTime(d.getTime() + index * 24 * 60 * 60 * 1000);
    }
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var ds = d.getDate();
    if (ds <= 9) {
      ds = '0' + ds;
    }
    var h = d.getHours();
    if (h <= 9) {
      h = '0' + h;
    }
    var f = d.getMinutes();
    if (f <= 9) {
      f = '0' + f;
    }
    var s = d.getSeconds();
    if (s <= 9) {
      s = '0' + s;
    }
    var days = d.getDay();
    switch (days) {
      case 1:
        days = '星期一';
        break;
      case 2:
        days = '星期二';
        break;
      case 3:
        days = '星期三';
        break;
      case 4:
        days = '星期四';
        break;
      case 5:
        days = '星期五';
        break;
      case 6:
        days = '星期六';
        break;
      case 0:
        days = '星期日';
        break;

    }
    var mm=m;
    if(m<10){
       mm = "0"+m;
    }
    var thistime = m + '月' + ds + '日' + ' ' + days;
    var tt = y + "-" + mm + "-" + ds;
    var dates = {"thistime":thistime,"tt":tt};
    // return  m + '月' + ds + '日' + ' ' + days;
    return dates;
  }

}
export default preams
