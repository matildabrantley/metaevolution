
const saveMind = (mind) => {
        //fetch...
        return fetch(
            '/api/neural/saveMind', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
        '/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
}

const login = (user) => {
    //fetch...
    return fetch(
        '/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
}

const getThisUser = (token) => {
    //fetch
    return fetch(
        '/api/users/thisUser', {
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        });
    }
    
    module.exports = { register, login, getThisUser, saveMind }