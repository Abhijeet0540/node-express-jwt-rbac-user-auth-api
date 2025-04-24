import pool from "../config/db.js";

export const createUser = async (username, email, role, password) => {
    try {
        // Log the parameters to debug
        // console.log("Creating user with:", { username, email, role, password: "***" });

        const [result] = await pool.query(`
            INSERT INTO users (
                username,
                email,
                role,
                password
            )
            VALUES (?, ?, ?, ?)`,
            [username, email, role, password]);

        return result;
    }
    catch (error) {
        console.log("user model error createUser", error.message);
        throw error;
    }
}

export const getUserByEmail = async (email) => {
    try {
        const [result] = await pool.query(`
            SELECT * FROM users WHERE email = ?
        `, [email]);
        return result;
    }
    catch (error) {
        console.log("user model error getUserByEmail", error.message);
        throw error;
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`
            SELECT * FROM USER WHERE id = ?
        `, [id]);
        return res.status(200).json({ message: "User found successfully", result });
    }
    catch (error) {
        console.log("user model error updateUserById", error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`
            DELETE FROM USER WHERE id = ?
        `, [id]);
        return res.status(200).json({ message: "User deleted successfully", result });
    }
    catch (error) {
        console.log("user model error deleteUser", error.message);
    }
}

//store reset token in database
export const storeResetToken = async (email, token, expiresAt) => {
    try {
        const [result] = await pool.query(`
            UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?
        `, [token, expiresAt, email]);
        return result;
    }
    catch (error) {
        console.log("user model error storeResetToken", error.message);
        throw error;
    }
}

// get user by reset token
export const getUserByResetToken = async (token) => {
    try {
        const [result] = await pool.query(`
            SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()
        `, [token]);
        return result;
    }
    catch (error) {
        console.log("user model error getUserByResetToken", error.message);
        throw error;
    }
}

export const updateUserPassword = async (userId, password) => {
    try {
        const [result] = await pool.query(`
            UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?
        `, [password, userId]);
        return result;
    }
    catch (error) {
        console.log("user model error updateUserPassword", error.message);
        throw error;
    }
}


