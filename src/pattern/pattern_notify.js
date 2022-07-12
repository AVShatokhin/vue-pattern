/* eslint-disable */

let showErrorNotify = (proto, r) => {
  proto.$notify({
    message: `<h3>${r.errorCode}</h3>` + `<p>${r.errorMessage}</p>`,
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "warning",
  });
};

let showSuccessNotify = (proto, r) => {
  proto.$notify({
    message: `<h3>${r.title}</h3>` + `<p>${r.message}</p>`,
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "success",
  });
};

export { showErrorNotify, showSuccessNotify };
