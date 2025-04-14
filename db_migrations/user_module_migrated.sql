
-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_superadmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Table: permissions
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Table: user_roles (Many-to-Many between users and roles)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Table: role_permissions (Many-to-Many between roles and permissions)
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Table: system_modules
CREATE TABLE IF NOT EXISTS system_modules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Table: module_permissions (Many-to-Many between system_modules and permissions)
CREATE TABLE IF NOT EXISTS module_permissions (
    module_id INT REFERENCES system_modules(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (module_id, permission_id)
);

-- Table: logs_users
CREATE TABLE IF NOT EXISTS logs_users (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: logs_roles
CREATE TABLE IF NOT EXISTS logs_roles (
    id SERIAL PRIMARY KEY,
    role_id INT REFERENCES roles(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: logs_permissions
CREATE TABLE IF NOT EXISTS logs_permissions (
    id SERIAL PRIMARY KEY,
    permission_id INT REFERENCES permissions(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: logs_system_modules
CREATE TABLE IF NOT EXISTS logs_system_modules (
    id SERIAL PRIMARY KEY,
    module_id INT REFERENCES system_modules(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ensure SuperAdmin user exists
INSERT INTO users (username, email, password_hash, is_superadmin)
SELECT 'superadmin', 'superadmin@example.com', 'hashed_password', TRUE
WHERE NOT EXISTS (SELECT 1 FROM users WHERE is_superadmin = TRUE);
