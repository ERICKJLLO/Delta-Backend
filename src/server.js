
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('=========================================');
  console.log('   DELTA BACKEND API RUNNING SUCCESSFULLY');
  console.log(`   URL: http://localhost:${PORT}`);
  console.log('   Environment variables loaded');
  console.log('=========================================');
});
