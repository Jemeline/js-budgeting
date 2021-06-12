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
