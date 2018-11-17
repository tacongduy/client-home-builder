'use strict';


import setting from './setting';

export default {

    postData: function (url = ``, data = {}) {
        // Default options are marked with *
          return fetch(url, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
            //   mode: "cors", // no-cors, cors, *same-origin
            //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'include',
              headers: {
                  Accept: 'application/json',
                  "Content-Type": "application/json; charset=utf-8",
                  // "Content-Type": "application/x-www-form-urlencoded",
              },
            //   redirect: "follow", // manual, *follow, error
            //   referrer: "no-referrer", // no-referrer, *client
              body: JSON.stringify(data), // body data type must match "Content-Type" header
          })
          .then(response => {
              return response.json()}
        ); // parses response to JSON
      },
    
    sendRequest:function (url) {
        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.d
            credentials: 'include',
        })
            .then( response => {
                
                return response.json()}
            )
    },
    
    
    getCookie: function (cname) {
        let decodedCookie = decodeURIComponent(document.cookie);
        
        if (cname !== 'user_id') {
            var name = cname + "=";
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    let _raw_cookies =  c.substring(name.length, c.length).split('.');
                    let _cookie = _raw_cookies[0].substring(2)
                    return _cookie
                }
            }
        } else {
            return decodedCookie.split("\"")[1]
        }
    
        return "";
    },

    sendDelete: function (url = ``) {
        // Default options are marked with *
          return fetch(url, {
              method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            //   mode: "cors", // no-cors, cors, *same-origin
            //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'include',
              headers: {
                  Accept: 'application/json',
                  "Content-Type": "application/json; charset=utf-8",
                  // "Content-Type": "application/x-www-form-urlencoded",
              },
            //   redirect: "follow", // manual, *follow, error
            //   referrer: "no-referrer", // no-referrer, *client
              // body data type must match "Content-Type" header
          })
          .then(response => {
              return response.json()}
        ); // parses response to JSON
      },

    verifyLogin: async function() {
      let _token = this.getCookie('access_token');
      let _userId = this.getCookie('user_id');
      // if _token or _userId is valid, then return false
      if(!_token || !_userId) {
        return false;
      }

      let _url = `${setting.baseApiUrl}${setting.urlGetUser}/${_userId}`;
      // send request then check;
      let requestResult = await this.sendRequest(_url);
      return requestResult.id ? true : false
    }
}