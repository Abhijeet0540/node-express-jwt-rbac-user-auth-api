import pool from '../config/db.js';

async function addResetTokenColumns() {
  try {
    // Add reset_token and reset_token_expires columns
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN reset_token VARCHAR(255) NULL,
      ADD COLUMN reset_token_expires DATETIME NULL
    `);
    console.log('Reset token columns added successfully ✅');
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding reset token columns:', error.message);
    process.exit(1);
  }
}

// Run the migration
addResetTokenColumns();