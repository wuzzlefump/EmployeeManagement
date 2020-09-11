//requires
const inquirer = require('inquirer')
const mysql = require('mysql')
const cTable = require('console.table')



//prompts
async function welcome(){
    try{
        const initial = await inquirer.prompt({
            type:'list',
            message:"Welcome, what would you like to access",
            choices:['Employees','Departments','Roles','Exit'],
            name: "nav"
        })
        console.log(initial)
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
        console.log(employee)
        switch(employee.nav){
            case'View Employees': 
            viewe();
            break;
            case'Add Employees': 
            adde();
            break;
            case'Update Employees': 
            updatee();
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
        console.log(dept)
        switch(dept.nav){

            case'View Departments': 
            viewd()
            break;
            case'Add Departments': 
            addd()
            break;
            case'Update Departments': 
            updated()
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
        console.log(role)

        switch(role.nav){
            case'View Roles': 
            viewr()
            break;
            case'Add Roles': 
            addr()
            break;
            case'Update Roles': 
            updater()
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

async function viewd(){

    welcome()
}

async function addd(){
    let array =[["What is the New Department's name? ", 'first']]
    let simpleQ = array.map((prompt)=>{
        return{
            message:prompt[0],
            name:prompt[1]
        }
    })
    
    
    await inquirer.prompt(simpleQ).then((result)=>{
        console.log(result)
    })

    welcome()
}

async function updated(){
    let array =[["Which department would you like to update? ",["placeholder"], 'update']]
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
    })

    try{
        const change = await inquirer.prompt({
            message:"What would you like to change it to?",
            name: "change"
        })
        console.log(change)
    
        }
        catch(err){
            console.log(err)
        }

    welcome()
}
// role functions

async function viewr(){

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
    console.log(result)
})
welcome()
}

async function updater(){
    let array =[["Which role would you like to update? ",["placeholder"], 'update'],["Which parameter would you like to update?",["title","salary","department Id"], "parameter"]]
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
    })
    try{
        const change = await inquirer.prompt({
            message:"What would you like to change it to?",
            name: "change"
        })
        console.log(change)
    
        }
        catch(err){
            console.log(err)
        }

    
    welcome()
}


//employee functions


async function viewe(){

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
    console.log(result)
})





welcome();
}

async function updatee(){
    let array =[["Which Employee would you like to update? ",["placeholder"], 'update'],["Which parameter would you like to update?",["First Name","Last Name","Role Id", "Manager Id"], "parameter"]]
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
    })
    try{
        const change = await inquirer.prompt({
            message:"What would you like to change it to?",
            name: "change"
        })
        console.log(change)
    
        }
        catch(err){
            console.log(err)
        }

welcome()
}






    //run program
    welcome();