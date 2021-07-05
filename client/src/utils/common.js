require("dotenv").config();

export function logout() {
    sessionStorage.removeItem('id');
};

export function login (id){
    sessionStorage.setItem('id', id);
};

export function capitalizeFirst(s){
    return s.charAt(0).toUpperCase()+s.slice(1).toLowerCase();
};

export function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
};
