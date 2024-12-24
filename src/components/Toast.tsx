import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const showToast = (message: any, duration = 3000) => {
  Toastify({
    text: message,
    duration: duration,
    close: true, // 允许关闭按钮
    gravity: "top", // 顶部显示
    position: "right", // 右侧显示
    backgroundColor: "linear-gradient(to right, #504aff, #736eff)", // 自定义背景色
  }).showToast();
};

export default showToast;