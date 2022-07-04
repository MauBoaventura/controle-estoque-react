// eslint-disable-next-line
export default {
    login: async ({ email, password }) => {
        const request = new Request(process.env.NODE_ENV !== 'production' ? 'http://localhost:3035/login' : 'https://mauboa.com.br/login', {
        // const request = new Request(process.env.NODE_ENV !== 'production' ? 'http://localhost:3035/login' : 'https://controledevenda.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('auth')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};
 // in src/authProvider.js
// const authProvider = {
//     login: ({ auth, password }) =>  {
//         const request = new Request(process.env.NODE_ENV !== 'production'?'http://localhost:3035/login':'https://controledevenda.herokuapp.com/login', {
//             method: 'POST',
//             body: JSON.stringify({ auth, password }),
//             headers: new Headers({ 'Content-Type': 'application/json' }),
//         });
//         return fetch(request)
//             .then(response => {
//                 if (response.status < 200 || response.status >= 300) {
//                     throw new Error(response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(auth => {
//                 localStorage.setItem('auth', JSON.stringify(auth));
//             })
//             .catch(() => {
//                 throw new Error('Network error')
//             });
//     },
//     checkAuth: () => localStorage.getItem('auth')
//         ? Promise.resolve()
//         : Promise.reject({ message: 'login.required' }), 
//     // ...
// };

// export default authProvider;