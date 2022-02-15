import { createConnection } from 'typeorm';
import app from './app';

createConnection().then(connection => {})
.catch(error => {console.log("Database connection failed"); process.exit()} )

app.listen(3000, () => console.log('Server Listening on port 3000'))