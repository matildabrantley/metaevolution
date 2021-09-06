
const saveMind = (userToken, mind) => {
    return fetch(
        '/api/neural/saveMind', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        authorization: `Bearer ${userToken}` },
            body: JSON.stringify(mind),
        });
}
// const getAllNets = () => {
//         //fetch...
//         return fetch(
//             '/api/users/getNet', {
//                 method: 'GET',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(net),
//             });
// }
const register = (user) => {
    //fetch...
    return fetch(
        '/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
}

const login = (user) => {
    //fetch...
    return fetch(
        '/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
}

const getThisUser = (token) => {
    //fetch
    return fetch(
        '/api/user/thisUser', {
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        });
    }
    
    module.exports = { register, login, getThisUser, saveMind }