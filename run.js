// constants
const mysql = require('mysql'),
    inquirer = require('inquirer');
connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'great_bay_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    // functions
    open();
});

function open() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Welcome to Great Bay. What do you want?',
                choices: [
                    'POST A LISTING',
                    'BID ON AN EXISTING LISTING',
                    'LEAVE'
                ]
            }
        ])
        .then(function(answer) {
            switch (answer.action) {
                case 'POST A LISTING':
                    postListing();
                    break;
                case 'BID ON AN EXISTING LISTING':
                    bidListing();
                    break;
                case 'LEAVE':
                    process.exit();
                    break;
            }
        });
}

function atleast5(val) {
    if (val.length >= 5) return true;
    return 'Make title at least 5 characters long';
}

function isNumber(val) {
    if (!Number.isNaN(parseInt(val))) return true;
    return 'Please enter a number';
}

function postListing() {
    const postQuestions = [
        {
            type: 'input',
            name: 'title',
            message: 'Provide a title for your listing',
            validate: atleast5
        },
        {
            type: 'list',
            name: 'category',
            message:
                "Select a category for your listing. An Item for sale; a Task you'll do for money; a Job you are seeking; or a Project (aka BIG TASK) you'll do for (BIG) money.",
            choices: ['Item', 'Task', 'Job', 'Project']
        },
        {
            type: 'input',
            name: 'init_price',
            message: 'Enter an initial (base) price for your listing',
            validate: isNumber
        }
    ];

    inquirer.prompt(postQuestions).then(function(answers) {
        connection.query(
            'INSERT INTO listings SET ?',
            {
                title: answers.title,
                category: answers.category,
                init_price: answers.init_price
            },
            function(err, res) {
                if (err) throw err;
                console.log('\nNew Listing:\n');

                connection.query(
                    'SELECT * FROM listings WHERE ?',
                    {
                        id: res.insertId
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log(res);
                        connection.end();
                    }
                );
            }
        );
    });
}

function bidListing() {
    // Make query to db to get all listings
    // Use Inquirer to show all active listings (use a loop to create choices from db response)
    // Keep track of selected listing ID
    // Bid: if higher than curr_price, replace curr_price with bid
}
