export function formatData(data, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (data.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      );
    }
  }
  return fmt;
}

export function distinct(arr) {
  let newArr = [];
  let isExist = false;
  for (let i = 0, length = arr.length; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (arr[i].name == arr[j].name) {
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      newArr.push(arr[i]);
    }
    isExist = false;
  }
  return newArr;
}

export function debounce(fn, delay) {
  let timer = null;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn.apply(this, args);
    }, delay);
  };
}

export function lazyImgload(imgs) {
  let h = window.innerHeight - 205;
  let s = -this.$refs.wrapper.scroll.y - 15;
  for (let i in imgs) {
    let offsetT = imgs[i].offsetTop;
    if (h + s > offsetT) {
      (function(item) {
        setTimeout(function() {
          var temp = new Image();
          temp.src = item.getAttribute('data-src');
          temp.onload = function() {
            imgs[i].src = temp.src;
          };
        }, 2000);
      })(imgs[i]);
    }
  }
}

// function wait(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export default { wait };

// export const mixins = {
//   methods: {
//     wait(ms) {
//       return new Promise((resolve) => setTimeout(resolve, ms));
//     },
//   },
// };

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const plugin = {
  install: function(Vue) {
    Vue.prototype.$wait = wait;
  },
};

export default plugin;
