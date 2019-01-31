const { DocumentStore } = require('ravendb');

class Db {

    createConnection() {
               
        const store = new DocumentStore('http://localhost:8080', 'heroes');
        store.initialize();

        const session = store.openSession();
        return session;
    }
}

module.exports = Db;