export const imagerror = {
  // 指令对象
  inserted(dom, options) {
    dom.addEventListener("error", () => {
      dom.src = options.value;
    });
  },
};
