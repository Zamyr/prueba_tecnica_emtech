/* eslint-disable @typescript-eslint/no-require-imports */
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  };

  try {
    console.log('🔄 Conectando a MySQL...');
    const connection = await mysql.createConnection(config);
    
    // Crear la base de datos si no existe
    const dbName = process.env.DB_NAME || 'edutech_academy';
    console.log(`🔄 Creando base de datos ${dbName}...`);
    
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Base de datos ${dbName} creada exitosamente`);
    
    await connection.end();
    
    // Conectar a la base de datos específica
    const dbConfig = { ...config, database: dbName };
    const dbConnection = await mysql.createConnection(dbConfig);
    
    // Crear tabla students
    console.log('🔄 Creando tabla students...');
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        telefono VARCHAR(50),
        edad INT,
        nivelEducativo VARCHAR(50),
        experienciaProgramacion VARCHAR(50),
        fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Crear tabla assessment_results
    console.log('🔄 Creando tabla assessment_results...');
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS assessment_results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentId INT NOT NULL,
        puntuacion INT NOT NULL,
        respuestasCorrectas INT NOT NULL,
        totalPreguntas INT NOT NULL,
        nivel VARCHAR(50) NOT NULL,
        respuestas TEXT NOT NULL,
        recomendaciones TEXT NOT NULL,
        fechaRealizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
      )
    `);
    
    console.log('✅ Tablas creadas exitosamente');
    
    await dbConnection.end();
    
    console.log('✅ Configuración de base de datos completada');
    console.log(`📡 Puedes conectarte con: mysql -u ${config.user} -p ${dbName}`);
    
  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Sugerencias:');
      console.log('1. Asegúrate de que MySQL esté ejecutándose');
      console.log('2. Verifica las credenciales en el archivo .env');
      console.log('3. Si no tienes MySQL instalado, ejecuta: brew install mysql');
    }
    
    process.exit(1);
  }
}

setupDatabase();
