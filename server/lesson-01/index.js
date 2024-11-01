import http from 'http';

const listStudent = [
    {
        id: 1,
        fullName: "Jackie",
        age: 5,
        class: "5A"
    },
    {
        id: 2,
        fullName: "Juli MTP",
        age: 5,
        class: "5A"
    },
    {
        id: 3,
        fullName: "Denis",
        age: 5,
        class: "5B"
    },
]

const app = http.createServer((request, response) => {
    // const data = { school: 'MindX technology school' };
    // response.end(JSON.stringify(data));

    const endPoint = request.url;
    const method = request.method;

    switch (endPoint) {
        case '/':
            response.end('Hello MindX');
            break;
        case '/students':
            if (method === "GET") {
                response.end(JSON.stringify(listStudent));
            } else {
                response.end(`Method ${method} not support!`);
            }
            break;
        default: 
            response.end('Error, Notfound API');
            break;
    }
});

app.listen(8080, () => {
    console.log('Server is running');
})