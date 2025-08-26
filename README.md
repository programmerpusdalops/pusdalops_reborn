# pusdalops

* Cara Connect Ke database
1. Buat folder dengan nama "config"
2. Buat File "Database.js" di dalam folder config tersebut

* Jika Menggunakan database MYSQL gunakan code berikut ini :

const { Sequelize } = require("sequelize");
const db = new Sequelize("pusdalops", "", "root", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = db;


* Jika Menggunakan database POSTGRESQL gunakan code berikut ini :

const { Sequelize } = require("sequelize");
const db = new Sequelize('pusdalops', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: "postgres"
});
module.exports = db;


* Untuk pembuatan tabel otomatis aktifkan code berikut ini :
const PembuatanTabel = require("./models/UserModel.js");
// arahkan ke tabel yang ingin dibuat
try {
   db.authenticate();
  console.log('Database connected...');
  PembuatanTabel.sync();
} catch (error) {
  console.error('Connection error:', error);
}


* "nodemon index" untuk menjalankan backend