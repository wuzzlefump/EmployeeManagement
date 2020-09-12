//requires
const inquirer = require('inquirer')
const mysql = require('mysql')
const cTable = require('console.table')
const { generateKeyPair, generateKeyPairSync } = require("crypto");
var x;
var y;
var z;


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "macademiaNuts1",
    database: "employee_management_db"
  });



connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    welcome();
});



//prompts
async function welcome(){
    try{
        const initial = await inquirer.prompt({
            type:'list',
            message:"Welcome, what would you like to access",
            choices:['Employees','Departments','Roles','Exit'],
            name: "nav"
        })
        switch(initial.nav){
            case'Employees': 
            employees();
            break;
            case'Departments': 
            departments();
            break;
            case'Roles': 
            roles()
            break;
            default:
                connection.end()
        }
    }
        catch(err){
            console.log(err)
        }
    }

// employee screen
async function employees(){
    try{
        const employee = await inquirer.prompt({
            type:'list',
            message:"Welcome, to the employee system what would you like to do?",
            choices:['View Employees','Add Employees','Update Employees','back'],
            name: "nav"
        })
        switch(employee.nav){

            case'View Employees': 
            console.log("Viewing all employees...\n");
            connection.query("SELECT * FROM employees", function(err, res) {
              if (err) throw err;

           viewe(res);
            });
 
            break;
            case'Add Employees': 
            adde();
            break;
            case'Update Employees': 
 connection.query("SELECT * FROM employees", function(err, res) {
                if (err) throw err; 
            let arr = []
                res.forEach(item=>{
                    arr.push(item) 
                })
            updatee(arr);
                })
            break;
            case'back': 
            welcome()
            break;
        }

    }
        catch(err){
            console.log(err)
        }
    }
// dept screen
async function departments(){
    try{
        const dept = await inquirer.prompt({
            type:'list',
            message:"Welcome, what would you like to access",
            choices:['View Departments','Add Departments','Update Departments','back'],
            name: "nav"
        })
        switch(dept.nav){

            case'View Departments':
            console.log("Viewing all Departments...\n");
            connection.query("SELECT * FROM departments", function(err, res) {
              if (err) throw err;   
            viewd(res)
            });

            break;
            case'Add Departments': 
            addd()
            break;
            case'Update Departments': 
            connection.query("SELECT * FROM departments", function(err, res) {
                if (err) throw err; 
                let arr = []
                res.forEach(item=>{
                   arr.push(item) 
                })
                
                updated(arr)
              });
            break;
            case'back': 
            welcome();
            break;
        }
    }
        catch(err){
            console.log(err)
        }
    }

//roles screen
async function roles(){
    try{
        const role = await inquirer.prompt({
            type:'list',
            message:"Welcome, what would you like to access",
            choices:['View Roles','Add Roles','Update Roles','back'],
            name: "nav"
        })

        switch(role.nav){
            case'View Roles':
            console.log("Viewing roles...\n");
            connection.query("SELECT * FROM roles", function(err, res) {
              if (err) throw err;   
                viewr(res)
            });

            break;
            case'Add Roles': 
            addr()
            break;
            case'Update Roles':
            connection.query("SELECT * FROM roles", function(err, res) {
                if (err) throw err; 
                let arr = []
                res.forEach(item=>{
                   arr.push(item) 
                })
                
                updater(arr)
              });
            break;
            case'back': 
            welcome();
            break;
        }
    }
        catch(err){
            console.log(err)
        }
    }

//department functions

async function viewd(input){
    console.table(input);
    welcome()
}

async function addd(){
    let array =[["What is the New Department's name? ", 'title']]
    let simpleQ = array.map((prompt)=>{
        return{
            message:prompt[0],
            name:prompt[1]
        }
    })
    
    
    await inquirer.prompt(simpleQ).then((result)=>{
            console.log("Inserting a new department...\n");
            var query = connection.query(
              "INSERT INTO departments SET ?",
              {
                department_name: result.title,
              },
              function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Department inserted!\n");
              }
            );
    })

    welcome()
}

async function updated(input){
    let arr =[]
input.forEach(item=>{
    arr.push(item.department_name)
})

    let array =[["Which department would you like to update? ",arr, 'update']]
    let simpleQ = array.map((prompt)=>{
        return{
            type:"list",
            message:prompt[0],
            choices: prompt[1],
            name:prompt[2]
        }
    })
    await inquirer.prompt(simpleQ).then((result)=>{
        input.forEach(item=>{
            if (result.update === item.department_name){
                x=item.id
            }
        })
     
    })


    try{
        const change = await inquirer.prompt({
            message:"What would you like to change it to?",
            name: "change"
        })

        console.log(change.change);
        var query = connection.query(
            "UPDATE departments SET ? WHERE ?",
            [
              {
                department_name: change.change
              },
              {
                id: x
              }
            ],
            function(err, res) {
              if (err) console.log(err);
              console.log(res.affectedRows + " products updated!\n");
            }
          );

        }
        catch(err){
            console.log(err)
        }

    welcome()
}
// role functions

async function viewr(input){
    console.table(input)
    welcome()
}

async function addr(){
    let array =[['What is the new Role called ?', 'title'],["What is the salary?", "salary"], ["What is the Id for the department?", "deptId"]]
let simpleQ = array.map((prompt)=>{
    return{
        message:prompt[0],
        name:prompt[1]
    }
})
await inquirer.prompt(simpleQ).then((result)=>{
    console.log("Inserting a new role...\n");
    var query = connection.query(
      "INSERT INTO roles SET ?",
      {
        title: result.title,
        salary: result.salary,
        department_id: result.deptId
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " Role inserted!\n");
      }
    );
})
welcome()
}

async function updater(input){
    let arr =[]
    input.forEach(item=>{
        arr.push(item.title)
    })
    let array =[["Which role would you like to update? ",arr, 'update'],["Which parameter would you like to update?",["title","salary","department_id"], "parameter"]]
    let simpleQ = array.map((prompt)=>{
        return{
            type:"list",
            message:prompt[0],
            choices: prompt[1],
            name:prompt[2]
        }
    })
    
    
    await inquirer.prompt(simpleQ).then((result)=>{
        input.forEach(item=>{
            if (result.update === item.title){
                x=item.id
            }
            y= result.parameter.toString()
        })
    })

    try{
        const change = await inquirer.prompt({
            message:"What would you like to change it to?",
            name: "change"
        })
        console.log(change)
            z=change.change
        var query = connection.query(
            "UPDATE roles SET "+y+" = ? WHERE id = ?",[z,x],
            function(err, res,fields) {
              if (err) console.log(err);
              console.log(res.affectedRows + " roles updated!\n");
            }
          );

        
        }
        catch(err){
            console.log(err)
        }

    
    welcome()
}


//employee functions


async function viewe(input){
console.table(input);
welcome();
}

async function adde(){

    let array =[['What is the employees first name?', 'first'],['What is the employees last name', 'last'],["What is the Employee's role Id?", "rid" ],["What is the Employee's Manager ID","mid" ]]
let simpleQ = array.map((prompt)=>{
    return{
        message:prompt[0],
        name:prompt[1]
    }

})


await inquirer.prompt(simpleQ).then((result)=>{
        console.log("Inserting a new Employee...\n");
        var query = connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: result.first,
            last_name:result.last,
            role_id:result.rid,
            manager_id:result.mid
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Employee inserted!\n");
          }
        );

})
welcome();
}

async function updatee(input){
    let arr =[]
    input.forEach(item=>{
        arr.push(item.first_name)
    })
    let array =[["Which Employee would you like to update? ",arr, 'update'],["Which parameter would you like to update?",["first_Name","last_Name","role_id", "manager_id"], "parameter"]]
    let simpleQ = array.map((prompt)=>{
        return{
            type:"list",
            message:prompt[0],
            choices: prompt[1],
            name:prompt[2]
        }
    })
    
    
    await inquirer.prompt(simpleQ).then((result)=>{
        console.log(result)
        input.forEach(item=>{
            if (result.update === item.first_name){
                x=item.id
            }
            y= result.parameter.toString()
        })
    
    })
    try{
        const change = await inquirer.prompt({
            message:"What would you like to change it to?",
            name: "change"
        })
        console.log(change)
        z = change.change
        var query = connection.query(
            "UPDATE employees SET "+y+" = ? WHERE id = ?",[z,x],
            function(err, res,fields) {
              if (err) console.log(err);
              console.log(res.affectedRows + " employees updated!\n");
            }
          );

        }
        catch(err){
            console.log(err)
        }

welcome()
}






    //run program
