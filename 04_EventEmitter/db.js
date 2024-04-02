var EventEmitter = require("events");


var db_data = [
    {id: 1,name: "Ilya", bday: "2004-08-02"},
    {id: 2,name: "Danya", bday: "2004-08-02"},
    {id: 3,name: "Alexey", bday: "2004-08-02"}
]

class DB extends EventEmitter {
    select = () => {
        return Promise.resolve(db_data);
    }
    insert = (user) => {
        if(db_data.find(userDB => userDB.id == user.id)){
            return Promise.reject("User already exists");
        }
        else{
            db_data.push(user);
            return Promise.resolve(user);
        } 
    }
    update = (user) => {
        let index = db_data.findIndex(userDB => userDB.id == user.id);

        if(index !== -1){
            db_data[index] = user;
            return Promise.resolve(user);
        }
        else return Promise.reject("User not found");
    }
    delete = (id) => {
        const index = db_data.findIndex(u => u.id == id);
        if (index !== -1) {
            const deletedUser = db_data.splice(index, 1);
            return Promise.resolve(deletedUser);
        }
        return Promise.reject('User not found');
    }
}

exports.DB = DB;