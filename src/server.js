require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./config/db');

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

start();
