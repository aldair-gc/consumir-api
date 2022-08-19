// Variaveis de ambiente
require("dotenv").config();

// Principais consts do app
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Conexao com banco de dados
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("Banco de dados conectado.");
        app.emit("pronto");
    }).catch((err) => console.error(err));

// Configuracao de sessao
const session = require("express-session"); //identif pc cliente com cookies
const MongoStore = require("connect-mongo"); //salvar sessao no db
const flash = require("connect-flash"); //mensagens de unica leitura

// Configuracao de routes
const routes = require("./routes");
const path = require("path");
const { middlewareGlobal, middlewareSegundo, checkCsrfError, csrfMiddleware } = require("./src/middlewares/middleware");

// Seguranca
const helmet = require("helmet");
const csrf = require("csurf");
app.use(helmet());

// Habilitar 'req.body' contendo form post
app.use(express.urlencoded({ extended: true }));
// Habilitar JSON forms
app.use(express.json());
// Pasta para conteudo estatico
app.use(express.static(path.resolve(__dirname, "public")));

// Configuracao de sessao
const sessionOptions = session({
    secret: "Segredo",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 24 * 7,
        httpOnly: true
    },
    store: MongoStore.create( { mongoUrl: process.env.CONNECTIONSTRING })
});
app.use(sessionOptions);
app.use(flash());

// Configurar view engine
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Seguranca
app.use(csrf());
// Middleware global
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
// Usar este modulo para gerenciar as rotas
app.use(routes);


// Iniciar o servidor quando o BD estiver conectado.
console.log("Aguardando conexão com o banco de dados...")
app.on("pronto", () => {
    app.listen(3000, () => {
        console.log("Servidor iniciado na porta 3000");
    });
});
