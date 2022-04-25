/* eslint-disable */

import app_ajax from "@/app/app_ajax.js";
import { api_url } from "@/app/app_ajax.js";

let defaultCatch_CB = function (component, err) {
  component.$notify({
    message: `<h3>Ошибка ${err?.code}!</h3>` + `<p>${err?.message}.</p>`,
    icon: "add_alert",
    horizontalAlign: "center",
    verticalAlign: "top",
    type: "warning",
  });
};

let pattern_ajax = {
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
  changePassword: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST",
        timeout: 15000,
        url: `${api_url}change_password/`,
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
  getUsers: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "GET", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_get_users/`,
        params: data, // вот здесь или params или data
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
  adminAddUser: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_add_user/`,
        data, // вот здесь или params или data
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
  adminUpdateUserInfo: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_update_user_info/`,
        data, // вот здесь или params или data
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
  adminDeleteUser: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_delete_user/`,
        data, // вот здесь или params или data
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
  adminUpdateUserPassword: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_update_user_password/`,
        data, // вот здесь или params или data
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
  adminConfirmEmail: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_confirm_email/`,
        data, // вот здесь или params или data
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
  adminRequestConfirmation: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_request_confirmation/`,
        data, // вот здесь или params или data
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
  adminBlockUser: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_block_user/`,
        data, // вот здесь или params или data
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
  adminUnBlockUser: (component, data, when_CB, catch_CB) => {
    let token = JSON.parse(localStorage.getItem("userData"))?.token;
    data.token = token;
    component
      .axios({
        method: "POST", // важное замечание: когда отправляем GET, то параметры в поле params, когда POST, то данные в поле data
        timeout: 15000,
        url: `${api_url}admin_unblock_user/`,
        data, // вот здесь или params или data
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

for (let method in app) {
  pattern_ajax[method] = app_ajax[method];
}

export default pattern_ajax;
