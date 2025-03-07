import express from "express";
import {
    agregarEmpresa,
    ObtenerEmpresasSuscripciones,
    obtenerEmpresas,
    verEmpresaUnica,
    actualizarEmpresa,
    eliminarEmpresa,
    agregarServicio,
    obtenerServicios,
    obtenerServiciosEmpresa,
    obtenerServicioEspecifico,
    actualizarServicio,
    eliminarServicio,
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioUnico,
    actualizarUsuario,
    eliminarUsuario,
    crearCita,
    obtenerCitasEmpresa,
    obtenerCitasUsuario,
    obtenerCitaUnica,
    cancelarCita,
    Login,
    Logins,
    obtenerEmpresasNoAdmitidas,
    ObtenerEmpresasActivas,
    ModificarAdmicion,
    ModificarSuscripcion,
    ModificarEstadoEmpresa
} from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";

import bcrypt from "bcryptjs";



const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/login", async (req, res) => {
    const { correo, contrasena } = req.body;
    console.log("Correo recibido:", correo);
    console.log("Contraseña recibida:", contrasena);

    try {
        const rows = await Login(correo);
        const usuario = rows[0][0];

        if (!usuario || !usuario.id) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }

        // Comparar la contraseña encriptada con bcrypt
        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }

        res.status(200).json({ id: usuario.id, tipo: usuario.tipo });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error al intentar logearte" });
    }
});



app.post("/logins", async (req, res) => {
    const { correo, contrasena } = req.body;
    console.log("Correo recibido:", correo);
    console.log("Contraseña recibida:", contrasena);
    try {
        const [rows] = await Logins(correo);
        console.log("Rows obtenidos:", rows);
        if (!rows || rows.length === 0) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }
        const usuario = rows[0];
        console.log("Usuario encontrado:", usuario);
        if (!usuario || !usuario.contrasena) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }
        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }

        res.status(200).json({ id: usuario.id, tipo: usuario.permiso });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error al intentar logearte" });
    }
});










//-----------------------------------------------------------------------------------14/02/2025



app.post("/modificarestadoemp", async (req, res) => {
    const { empresaid, nuevoestado } = req.body;
    console.log(empresaid, nuevoestado);
    
    try {
        const mod = await ModificarEstadoEmpresa(empresaid, nuevoestado);
        res.status(200).json(mod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al modificar la empresa" });
    }
});

app.post("/modificarsus", async (req, res) => {
    const { empresaid, nuevoestado } = req.body;
    console.log(empresaid, nuevoestado);
    
    try {
        const mod = await ModificarSuscripcion(empresaid, nuevoestado);
        res.status(200).json(mod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al modificar la empresa" });
    }
});

app.post("/modificaradm", async (req, res) => {
    const { empresaid, nuevoestado } = req.body;
    console.log(empresaid, nuevoestado);
    
    try {
        const mod = await ModificarAdmicion(empresaid, nuevoestado);
        res.status(200).json(mod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al modificar la empresa" });
    }
});

app.get("/empresasactivadas", async (req, res) => {
    try {
        const empresas = await ObtenerEmpresasActivas();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las empresas act" });
    }
});

app.get("/empresassuscripciones", async (req, res) => {
    try {
        const empresas = await ObtenerEmpresasSuscripciones();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las empresas" });
    }
});

app.get("/empresasnoadm", async (req, res) => {
    try {
        const empresas = await obtenerEmpresasNoAdmitidas();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las empresas adm" });
    }
});



//-----------------------------------------------------------------------------------14/02/2025



app.post("/usuariosc", async (req, res) => {
    const { nombre, apellido, correo, contrasena, telefono } = req.body;
    console.log(req.body);

    // Validamos que los campos no estén vacíos
    if (!nombre || !apellido || !correo || !contrasena || !telefono) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    try {
        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        // Llamamos a la función para crear el usuario en la base de datos
        await crearUsuario(nombre, apellido, correo, hashedPassword, telefono);

        res.status(201).json({ message: "Usuario creado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo crear el usuario." });
    }
});



app.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await obtenerUsuarioUnico(Number(id));
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener el usuario." });
    }
});





//Empresas --------------------------------------------------
app.post("/empresas", async (req, res) => {
    const { nombre, rfc, direccion, correoEmpresa, correoAdmin, telefono, contrasena, imagen } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        await agregarEmpresa(nombre, rfc, direccion, correoEmpresa, correoAdmin, telefono, hashedPassword, imagen);
        res.status(201).json({ message: "Empresa agregada exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo agregar la empresa." });
    }
});

app.get("/empresas", async (req, res) => {
    try {
        const empresas = await obtenerEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las empresas." });
    }
});

app.get("/empresas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const empresa = await verEmpresaUnica(Number(id));
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener la empresa." });
    }
});

app.put("/empresas/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen } = req.body;
    try {
        await actualizarEmpresa({ id: Number(id), nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen });
        res.status(200).json({ message: "Empresa actualizada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar la empresa." });
    }
});

app.delete("/empresas/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await eliminarEmpresa(Number(id));
        res.status(200).json({ message: "Empresa eliminada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar la empresa." });
    }
});

//Servicios --------------------------------------
app.post("/servicios", async (req, res) => {
    const { empresa, nombre, descripcion, precio, duracion } = req.body;

    try {
        await agregarServicio( empresa, nombre, descripcion, precio, duracion );
        res.status(201).json({ message: "Servicio agregado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo agregar el servicio." });
    }
});

app.get("/servicios", async (req, res) => {
    try {
        const servicios = await obtenerServicios();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener los servicios." });
    }
});

app.get("/servicios/empresa/:empresa_id", async (req, res) => {
    const { empresa_id } = req.params;

    try {
        const servicios = await obtenerServiciosEmpresa(Number(empresa_id));
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener los servicios de la empresa." });
    }
});

app.get("/servicios/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const servicio = await obtenerServicioEspecifico(Number(id));
        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener el servicio." });
    }
});

app.put("/servicios/:id", async (req, res) => {
    const { id } = req.params;
    const { empresa, nombre, descripcion, precio, duracion } = req.body;

    console.log("ID recibido:", id);
    console.log("Datos recibidos:", req.body);

    try {
        await actualizarServicio( Number(id), empresa, nombre, descripcion, precio, duracion );
        res.status(200).json({ message: "Servicio actualizado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el servicio." });
    }
});

app.delete("/servicios/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await eliminarServicio(Number(id));
        res.status(200).json({ message: "Servicio eliminado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el servicio." });
    }
});

//Usuarios -------------------

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener los usuarios." });
    }
});


app.put("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, contrasena } = req.body;

    try {
        await actualizarUsuario({ id: Number(id), nombre, apellido, correo, contrasena });
        res.status(200).json({ message: "Usuario actualizado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo actualizar el usuario." });
    }
});

app.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await eliminarUsuario(Number(id));
        res.status(200).json({ message: "Usuario eliminado exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo eliminar el usuario." });
    }
});

//Citas------------------------------------------------
app.post("/citas", async (req, res) => {
    const { empresa, usuario, servicio, fecha, hora } = req.body;

    try {
        await crearCita( empresa, usuario, servicio, fecha, hora );
        res.status(201).json({ message: "Cita creada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo crear la cita." });
    }
});

app.get("/citas/empresa/:empresa_id", async (req, res) => {
    const { empresa_id } = req.params;

    try {
        const citas = await obtenerCitasEmpresa(Number(empresa_id));
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las citas de la empresa." });
    }
});

app.get("/citas/usuario/:usuario_id", async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const citas = await obtenerCitasUsuario(Number(usuario_id));
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: "No se pudieron obtener las citas del usuario." });
    }
});

app.get("/citas/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cita = await obtenerCitaUnica(Number(id));
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener la cita." });
    }
});

app.put("/citas/:id/cancelar", async (req, res) => {
    const { id } = req.params;

    try {
        await cancelarCita(Number(id));
        res.status(200).json({ message: "Cita cancelada exitosamente." });
    } catch (error) {
        res.status(500).json({ error: "No se pudo cancelar la cita." });
    }
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en el puerto 3000");
});
