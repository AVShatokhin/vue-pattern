/* eslint-disable */

//let api_url = "http://127.0.0.1:3000/api/  ";
let api_url = "http://apv.yelka.ru/api/";

let defaultCatch_CB = function (component, err) {
  component.$notify({
    message: `<h3>Ошибка ${err?.code}!</h3>` + `<p>${err?.message}.</p>`,
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "warning",
  });
};

export { api_url };
export default {
  //   logout: (component, data, when_CB, catch_CB) => {
  //     component
  //       .axios({
  //         method: "POST",
  //         timeout: 15000,
  //         url: `${api_url}logout/`,
  //         data,
  //       })
  //       .then((response) => {
  //         when_CB(response.data);
  //       })
  //       .catch((error) => {
  //         if (error) {
  //           let errorObject = error.toJSON();
  //           defaultCatch_CB(component, errorObject);
  //           catch_CB(errorObject);
  //         }
  //       });
  //   },
};
