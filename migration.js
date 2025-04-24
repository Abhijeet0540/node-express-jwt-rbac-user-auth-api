// import pool from './src/config/db.js';

// async function modifyUsersTable() {
//   try {
//     // Drop the age column
//     // await pool.query(`ALTER TABLE users DROP COLUMN age;`);
//     // console.log('Age column removed successfully ✅');
    
//     // Add role column with default value 'user'
//     await pool.query(`ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user';`);
//     console.log('Role column added successfully ✅');
    
//     // If you want to set specific roles for existing users, you can do:
//     // await pool.query(`UPDATE users SET role = 'admin' WHERE id = ?`, [1]);
    
//     process.exit(0);
//   } catch (error) {
//     console.error('Error modifying users table:', error.message);
//     process.exit(1);
//   }
// }

// modifyUsersTable();