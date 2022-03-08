/* eslint-disable */
let api_url = "http://127.0.0.1:3000/api/";

let defaultCatch_CB = function (component, err) {
  component.$notify({
    message: `<h3>Ошибка ${err?.code}!</h3>` + `<p>${err?.message}.</p>`,
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "warning",
  });
};

module.exports.ajax = {
  register: (component, data, when_CB, catch_CB) => {
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}register/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  recover: (component, data, when_CB, catch_CB) => {
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}recover/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  setPassword: (component, data, when_CB, catch_CB) => {
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}set_password/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  login: (component, data, when_CB, catch_CB) => {
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}login/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  logout: (component, data, when_CB, catch_CB) => {
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}logout/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  checkToken: (component, data, when_CB, catch_CB) => {
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}check_token/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  saveProfile: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}save_profile/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  uploadAva: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.append("token", token);
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}upload_ava/`,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
  deleteAva: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}delete_ava/`,
        data,
      })
      .then((response) => {
        when_CB(response.data);
      })
      .catch((error) => {
        if (error) {
          let errorObject = error.toJSON();
          defaultCatch_CB(component, errorObject);
          catch_CB(errorObject);
        }
      });
  },
};
