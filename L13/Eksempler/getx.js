// getx.js
const userUrl = 'https://jsonplaceholder.typicode.com/users';
//const userUrl = 'https://jsonplaceholder.typicode.com/users/9';
// const userUrl = 'httpz://jsonplaceholder.typicode.com/users';

async function main(url) {
    try {
        let respons = await get(url);
        //console.log(respons);
        for (let i = 0;i<respons.length;i++) {
            console.log(respons[i].name);
        }
    } catch (fejl) {
        console.log(fejl);
    }
}
main(userUrl);