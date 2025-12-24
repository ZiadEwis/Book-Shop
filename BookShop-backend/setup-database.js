const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🔧 Setting up database...\n');

  // Connection config WITHOUT database selected (to create it first)
  const connectionConfig = {
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '', // Change this if you have a password
    multipleStatements: true
  };

  try {
    // Step 1: Connect to MySQL and create database
    console.log('📡 Connecting to MySQL...');
    const connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Connected to MySQL\n');

    // Step 2: Create database
    console.log('📦 Creating database "bookstore_db"...');
    await connection.query('CREATE DATABASE IF NOT EXISTS bookstore_db');
    console.log('✅ Database created\n');

    // Step 3: Use the database
    await connection.query('USE bookstore_db');
    console.log('✅ Using bookstore_db\n');

    // Step 4: Read and execute schema.sql
    console.log('📋 Loading schema.sql...');
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Split by queries and execute
    await connection.query(schemaSql);
    console.log('✅ Schema loaded - tables and sample data created\n');

    // Step 5: Read and execute triggers.sql
    console.log('⚡ Loading triggers.sql...');
    const triggersPath = path.join(__dirname, 'database', 'triggers.sql');
    let triggersSql = fs.readFileSync(triggersPath, 'utf8');

    // Remove DELIMITER statements (not supported in mysql2)
    triggersSql = triggersSql.replace(/DELIMITER \/\//g, '');
    triggersSql = triggersSql.replace(/DELIMITER ;/g, '');

    // Remove the '//' after each trigger END
    triggersSql = triggersSql.replace(/END\/\//g, 'END;');

    // Remove SHOW TRIGGERS at the end
    triggersSql = triggersSql.replace(/SHOW TRIGGERS;/g, '');

    await connection.query(triggersSql);
    console.log('✅ Triggers created\n');

    // Step 6: Verify tables
    console.log('🔍 Verifying tables...');
    const [tables] = await connection.query('SHOW TABLES');
    console.log('✅ Tables created:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`   - ${tableName}`);
    });

    // Step 7: Show sample data counts
    console.log('\n📊 Sample data loaded:');
    const [publishers] = await connection.query('SELECT COUNT(*) as count FROM Publishers');
    const [books] = await connection.query('SELECT COUNT(*) as count FROM Books');
    const [authors] = await connection.query('SELECT COUNT(*) as count FROM Authors');
    const [customers] = await connection.query('SELECT COUNT(*) as count FROM Customers');
    const [transactions] = await connection.query('SELECT COUNT(*) as count FROM SalesTransactions');

    console.log(`   - ${publishers[0].count} Publishers`);
    console.log(`   - ${books[0].count} Books`);
    console.log(`   - ${authors[0].count} Authors`);
    console.log(`   - ${customers[0].count} Customers`);
    console.log(`   - ${transactions[0].count} Sales Transactions`);

    await connection.end();
    console.log('\n✨ Database setup complete! You can now run: npm start\n');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Make sure MySQL is running on port 3307');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Check your MySQL username and password in this script');
    }

    process.exit(1);
  }
}

// Run the setup
setupDatabase();
