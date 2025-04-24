// import mysql from 'mysql2/promise';


// const db = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Abhi@007',
//     database: 'user_details_db',
// })
// console.log('Database connected successfully ✅');

// // create a database
// // await db.execute(`CREATE DATABASE IF NOT EXISTS user_details_db`);
// // console.log('Database created successfully ✅');


// // create a table 
// // await db.execute(`CREATE TABLE IF NOT EXISTS user_details_db.user_details (
// //     id INT AUTO_INCREMENT PRIMARY KEY,
// //     name VARCHAR(255) NOT NULL,
// //     email VARCHAR(255) NOT NULL,
// //     password VARCHAR(255) NOT NULL UNIQUE
// // )`);
// // console.log('Table created successfully ✅');


// //10users data
// // const users = [
// //     ['Abhishek', 'abhishek01@gmail.com', 'Abhi@007'],
// //     ['Rahul', 'rahul01@gmail.com', 'Rahul@123'],
// //     ['Raj', 'raj01@gmail.com', 'Raj@007'],
// //     ['Rohit', 'rohit01@gmail.com', 'Rohit@123'],
// //     ['Virat', 'virat01@gmail.com', 'Virat@007'],
// //     ['Dhoni', 'dhoni01@gmail.com', 'Dhoni@123'],
// //     ['Sachin', 'sachin01@gmail.com', 'Sachin@007'],
// //     ['Saurav', 'saurav01@gmail.com', 'Saurav@123'],
// //     ['Yuvraj', 'yuvraj01@gmail.com', 'Yuvraj@007'],
// //     ['Gambhir', 'gambhir01@gmail.com', 'Gauti@007']
// // ];


// // update the table with 10 users data

// // try {
// //     const [result] = await db.query(`INSERT INTO user_details (name, email, password) VALUES ?`, [users]);
// //     console.log('Data inserted successfully ✅');
// // }
// // catch (error) {
// //     console.log(error);
// // }


// //read the data

// // const [rows] = await db.execute(`SELECT * FROM user_details`);
// // console.log(rows);


// //updete the data

// // try{
// //     await db.execute(`UPDATE user_details SET email = 'abhi@gmail.com' WHERE id = '1'`);
// //     console.log('Data updated successfully ✅');

// // }
// // catch(error){
// //     console.log(error);
// // }

// // delete the data
// // try {
// //     await db.execute(`DELETE FROM user_details WHERE id = '1'`);
// //     console.log('Data deleted successfully ✅');
// // }
// // catch (error) {
// //     console.log(error);
// // }

// add in schema in age of users table migration
// await pool.query(`ALTER TABLE users ADD COLUMN  age INT NOT NULL;`);