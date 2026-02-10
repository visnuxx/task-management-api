const app = require('./app');
const { checkConnection } = require('./db');

const PORT =  8000;

app.listen(PORT, async () => {
  console.log(`Server started at 8000`);

  try {
    await checkConnection();
    console.log('db installed');
  } catch (error) {
    console.log('db connection failed');
  }

 
  })
 