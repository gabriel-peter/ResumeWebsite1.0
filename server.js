const express = require('express');
const app = express();
const port = 5000;

const mysql = require('mysql');
const SELECT_ALL = "SELECT * FROM customer";
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ' ',
    database: 'mydb',
})
connection.connect(err => {
    if(err) {
        return err;
    }
})
console.log(connection);

const cors = require('cors');
app.use(cors());


app.get('/api/customer', (req, res) => {
    const customers = [
        {id: 0, firstName: 'John', lastName: 'Doe'},
        {id: 1, firstName: 'SD', lastName: 'SD'},
        {id: 2, firstName: 'JoDGDGhn', lastName: 'DSDoe'},
        {id: 3, firstName: 'JoDGDGDhn', lastName: 'DoDGDGe'},
    ];
    res.json(customers);
});

app.get('/api/contact', (req, res) => {
    const contacts = [
        {id: 0, name: 'LinkedIn', img_src: '/images/linkedin.png', link: 'https://www.linkedin.com/in/gabriel-peter/', content: '/in/gabriel-peter/'},
        {id: 1, name: 'Email', img_src: '/images/email.jpg', link: 'mailto:peter.g@husky.neu.edu', content: 'peter.g@husky.neu.edu'},
        {id: 2, name: 'Address', img_src: '/images/house.jpg', link: 'https://www.google.com/search?q=hollywood+google+maps&oq=hollywood+googl&aqs=chrome.0.0j69i57j0l6.5496j0j7&sourceid=chrome&ie=UTF-8#', content: '225 North Gramercy Place Los Angeles, CA 90004'},
        {id: 3, name: 'Phone', img_src: '/images/phone.png', link: '', content: '(323)-533-1894' },
        {id: 4, name: 'Github', img_src: '/images/github.png', link: 'https://github.com/gabriel-peter', content: '/gabriel-peter' },
    ];
    res.json(contacts);
});

app.listen(port, () => console.log(`Server started on port ${port}`));