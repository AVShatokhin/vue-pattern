/* eslint-disable */
let api_url = "http://127.0.0.1:3000/api/";

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
        catch_CB(error.toJSON());
      });
  },
};
