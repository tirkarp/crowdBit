const {  
    Stitch, 
    AnonymousCredential,
} = require('mongodb-stitch-server-sdk');

const client = Stitch.initializeDefaultAppClient('datalyzer-kszwl');

const get_task = (name) => {return new Promise(function (resolve, reject) {
    client.auth.loginWithCredential(new AnonymousCredential())
    .then(user => {
        client.callFunction("get_obj", [name])
        .then(result => {
            client.close();
            resolve(result);
        });
    })
    .catch(err => {
        console.log(err);
        reject(err);
        client.close();
    })
    });
}

const get_all_tasks = () => {return new Promise(function (resolve, reject) {
    client.auth.loginWithCredential(new AnonymousCredential())
    .then(user => {
        client.callFunction("get_all_obj")
        .then(result => {
            client.close();
            resolve(result);
        });
    })
    .catch(err => {
        console.log(err);
        reject(err);
        client.close();
    })
    });
}

function submit(name, type, base64) {
    client.auth.loginWithCredential(new AnonymousCredential())
    .then(user => {
        client.callFunction("submit_obj", [name, type, base64])
        .then(result => {
            console.log(result)
        });

        client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    })
}

exports.submit = submit;
exports.get_task = get_task;
exports.get_all_tasks = get_all_tasks;