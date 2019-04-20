// constants
const mysql = require('mysql'),
    inquirer = require('inquirer');
connection = mysql.createConnection({
    host: localhost,
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'great_bay_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);

    // functions
});

function open() {
    inquirer
        .prompt([
            {
                type: input
            }
        ])
        .then();
}

function postListing() {}

function bidListing() {}
