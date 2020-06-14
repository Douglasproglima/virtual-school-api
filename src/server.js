//import app from '../app';
import app from './app';

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Acessar http://localhost:${port}`);
  console.log(`Servidor executando na porta ${port}`);
});