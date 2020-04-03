/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site") {
    return true;
  }

  return window.location.hostname === "preview.pro.ant.design";
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === "development") {
    return true;
  }

  return isAntDesignPro();
};

const returnStepsStatus = data => {
  if (Array.isArray(data)) {
    if (data.length > 0) {
      return "finish";
    }
    return "pending";
  }
  if (typeof data === "object" && Object.keys(data).length > 0) {
    return "finish";
  }
  if (data) {
    return "finish";
  }
  return "wait";
};

// eslint-disable-next-line no-confusing-arrow
const documentsUploadStepsStatus = data =>
  [
    ...data.quoteCompanyAttachments,
    ...data.quoteProductAttachments,
    ...data.quoteSupplierAttachments,
    ...data.quoteAttachments
  ].filter(attachment => attachment.is_attached).length > 0
    ? "finish"
    : "pending";

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
const uncapitalizeFirstLetter = string =>
  string.charAt(0).toLowerCase() + string.slice(1);

/**
 *
 * @param {Object[]} source input to be filtered
 * @param {Object[]} target Filter Criteria
 * @returns {Boolean}  Source Contains target Values
 */
const containsAny = (source, target) => {
  const result = source.filter(item => target.indexOf(item) > -1);
  return result.length > 0;
};
const currencyParser = text => Number(text.replace(/[^\d.-]/g, ""));
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
/**
 *
 * @param {Number} inputNumber
 * @param {Number} step
 * @returns {Number}
 */
function setNumberDecimal(inputNumber, step) {
  return parseFloat(inputNumber.toFixed(step));
}

export {
  isAntDesignProOrDev,
  isAntDesignPro,
  isUrl,
  returnStepsStatus,
  capitalizeFirstLetter,
  uncapitalizeFirstLetter,
  containsAny,
  documentsUploadStepsStatus,
  currencyParser,
  currencyFormatter,
  setNumberDecimal
};

export default function debounceMethod(func, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}
