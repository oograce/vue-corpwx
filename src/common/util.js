/**
 * 工具类
 * @author siye
 * */
export default {
  /**
   * 空对象判断，为空，则返回true
   * */
  isEmpty (v) {
    if (typeof v === "undefined") {
      return true;
    }
    if (v == null) {
      return true;
    }
    if (v === undefined) {
      return true;
    }
    if (v === "") {
      return true;
    }
    switch (typeof v) {
      case 'date':
        return true;
      case 'undefined' :
        return true;
      case 'string' :
        if (v.trim().length === 0)
          return true;
        break;
      case 'boolean' :
        if (!v)
          return true;
        break;
      case 'number' :
        if (0 === v)
          return true;
        break;
      case 'object' :
        if (null === v) {
          return true;
        } else if (undefined !== v.length && v.length === 0) {
          return true;
        } else {
          return false;
        }
      default: break;
    }
    return false;
  },
  /**
   * 邮件格式校验
   * */
  isEmailAddress(obj) {
    let pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return pattern.test(obj);
  },
  /**
   * 判断输入是否为十一位电话号码
   * */
  phoneNumber(str) {
    let reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    return reg.test(str)
  },
  /**
   * 手机号判断
   * */
  isPhoneNumber(str) {
    let reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    return reg.test(str)
  },
  /**
   * 校验固定电话
   * */
  isFixedNumber(str) {
    let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (reg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  /**
   * 校验字符串长度
   * */
  equalLength(str, length) {
    if (this.isEmpty(str)) {
      return false;
    }
    if (str.length === length) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 判断是否为数字
   * @param str
   * @returns {Array|{index: number, input: string}}
   */
  isNumber(str) {
    let reg = /^([0-9])+$/g;
    return reg.test(str);
  },
  /**
   * 数字校验(包括小数)
   * */
  isNumberPoint(str) {
    let reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
    return reg.test(str);
  },
  /**
   * 时间方法 年-月-日
   * */
  getNowDate() {
    let myDate = new Date();
    return myDate.getFullYear() + "-" + this.numberToLen2String(Number(myDate.getMonth()) + Number(1)) + "-" + this.numberToLen2String(myDate.getDate());
  },
  /**
   * 时间方法 年-月-日
   * */
  getNowDateByParam(myDate) {
    return myDate.getFullYear() + "-" + this.numberToLen2String(Number(myDate.getMonth()) + Number(1)) + "-" + this.numberToLen2String(myDate.getDate());
  },
  /**
   * 时间方法 当前时间增加 n 天
   * */
  getNowDateAddN(n) {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() + n);
    return myDate.getFullYear() + "-" + this.numberToLen2String(Number(myDate.getMonth()) + Number(1)) + "-" + this.numberToLen2String(myDate.getDate());
  },
  /**
   * 时间方法
   * */
  getNowDateLong () {
    let myDate = new Date();
    return myDate.getFullYear() + "-" + this.numberToLen2String(Number(myDate.getMonth()) + Number(1)) + "-" + this.numberToLen2String(myDate.getDate())
      + " " + this.numberToLen2String(myDate.getHours()) + ":" + this.numberToLen2String(myDate.getMinutes()) + ":" + this.numberToLen2String(myDate.getSeconds())
  },
  /**
   * 时间方法
   * */
  getNowDateLongByParam (myDate) {
    return myDate.getFullYear() + "-" + this.numberToLen2String(Number(myDate.getMonth()) + Number(1)) + "-" + this.numberToLen2String(myDate.getDate())
      + " " + this.numberToLen2String(myDate.getHours()) + ":" + this.numberToLen2String(myDate.getMinutes()) + ":" + this.numberToLen2String(myDate.getSeconds())
  },
  /**
   * 时间转换字符串
   * */
  numberToLen2String(n) {
    if (n.toString().length === 1) {
      return '0' + n.toString();
    } else {
      return n;
    }
  },
  /**
   * 格式化URL请求参数
   */
  formatRequest: function (data) {
    for (let filed in data) {
      if (typeof (data[filed]) === "object") {
        data[filed] = JSON.stringify(data[filed]);
      } else if (typeof (data[filed]) === "Array") {
        data[filed] = JSON.stringify(data[filed]);
      }
    }
    return data;
  },
  /**
   * 对象包含判断
   * */
  objContains(a, obj) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  },
  /**
   * 根据所给delId，删除指定数组中的某个对象
   * */
  spliceOne(list, delId) {
    for (let i = 0; i < list.length; i++) {
      let temp = list[i];
      if (temp.id === delId) {
        list.splice(i, 1);
        break;
      }
    }
    return list;
  }
}
