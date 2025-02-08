import express from "express";
import {
    agregarEmpresa,
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
    LoginUsuario
} from "./database.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/usuariosc", async (req, res) => {
    console.log(req.body);
    const { nombre, apellido, correo, contrasena, telefono } = req.body;
    try {
        await crearUsuario(nombre, apellido, correo, contrasena, telefono);
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

app.get("/login", async (req, res) => {
    const { correo, contrasena } = req.query;
    try {
        const usuario = await LoginUsuario(correo, contrasena);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Error al intentar logearte" });
    }
});





//Empresas --------------------------------------------------
app.post("/empresas", async (req, res) => {
    const { nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen } = req.body;

    try {
        await agregarEmpresa( nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen );
        res.status(201).json({ message: "Empresa agregada exitosamente." });
    } catch (error) {
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
    const { empresa, nombre, descripcion, precio } = req.body;

    try {
        await agregarServicio({ empresa, nombre, descripcion, precio });
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
    const { empresa, nombre, descripcion, precio } = req.body;

    try {
        await actualizarServicio({ id: Number(id), empresa, nombre, descripcion, precio });
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
        await crearCita({ empresa, usuario, servicio, fecha, hora });
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
