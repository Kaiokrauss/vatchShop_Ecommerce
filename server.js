// --- 1. HACK PARA EVITAR CRASH (Variáveis Falsas) ---
process.env.RAZORPAY_KEY_ID = "123456";
process.env.RAZORPAY_KEY_SECRET = "123456";
process.env.SESSION_SECRET = "segredo123";

require('dotenv').config();

// --- 2. IMPORTAÇÕES ---
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// --- 3. INICIALIZAR O APP (Aqui estava o seu erro antes!) ---
const app = express();

// --- 4. CONFIGURAÇÕES ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', './views');

// --- 5. IMPORTAR ROTAS ---
// Certifique-se que os arquivos existem na pasta 'routes'
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

// --- 6. USAR ROTAS ---
app.use('/', userRoute);
app.use('/admin', adminRoute);

// --- 7. CONEXÃO COM BANCO DE DADOS ---
// Se você não tiver o MongoDB rodando, isso vai dar erro de conexão,
// mas o servidor vai tentar subir mesmo assim.
mongoose.connect('mongodb://127.0.0.1:27017/vatchShop')
    .then(() => console.log('✅ MongoDB Conectado!'))
    .catch((err) => console.log('❌ Erro no Mongo (mas o server continua):', err.message));

// --- 8. INICIAR O SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`---------------------------------------`);
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`👉 Acesse: http://localhost:${PORT}`);
    console.log(`---------------------------------------`);
});