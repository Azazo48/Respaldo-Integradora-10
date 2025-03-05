import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();


export async function ModificarEstadoEmpresa(empresaid, nuevoestado) {
  const [rows] = await pool.query(
    'CALL ModificarEstadoEmpresa(?, ?)',
    [empresaid, nuevoestado]
);
return rows;
}

export async function ModificarAdmicion(empresaid, nuevoestado) {
  const [rows] = await pool.query(
    'CALL ModificarAdmicion(?, ?)',
    [empresaid, nuevoestado]
);
return rows;
}

export async function ModificarSuscripcion(empresaid, nuevoestado) {
  const [rows] = await pool.query(
    'CALL ModificarSuscripcion(?, ?)',
    [empresaid, nuevoestado]
);
return rows;
}

export async function ObtenerEmpresasActivas() {
  const [rows] = await pool.query(
    'CALL ObtenerEmpresasActivas()'
);
return rows;
}

export async function obtenerEmpresasNoAdmitidas() {
  const [rows] = await pool.query(
    'CALL ObtenerEmpresasNoAdmitidas()'
);
return rows;
}

// Procedimientos para Empresas
export async function agregarEmpresa(nombre, rfc, direccion, correoEmpresa, correoAdmin, telefono, contrasena, imagen) {
  const [rows] = await pool.query(
    'CALL AgregarEmpresa(?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, rfc, direccion, correoEmpresa, correoAdmin, telefono, contrasena, imagen]
);
return rows;

}

export async function obtenerEmpresas() {
  const [rows] = await pool.query(
    'CALL ObtenerEmpresas()'
);
return rows;
}

export async function verEmpresaUnica(empresa_id) {
  const [rows] = await pool.query(
    'CALL VerEmpresaUnica(?)',
    [empresa_id]
);
return rows;
}

export async function actualizarEmpresa(empresa_id, nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen) {
  const [rows] = await pool.query(
    'CALL ActualizarEmpresa(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [empresa_id, nombre, rfc, direccion, correo, correo_admin, telefono, contrasena, imagen]
);
return rows;
}

export async function eliminarEmpresa(empresa_id) {
  const [rows] = await pool.query(
    'CALL EliminarEmpresa(?)',
    [empresa_id]
);
return rows;
}

// Procedimientos para Servicios
export async function agregarServicio(empresa, nombre, descripcion, precio, duracion) {
  const [rows] = await pool.query(
    'CALL AgregarServicio(?, ?, ?, ?, ?)',
    [empresa, nombre, descripcion, precio, duracion]
);
return rows;
}

export async function obtenerServicios() {
  const [rows] = await pool.query(
    'CALL ObtenerServicios()'
);
return rows;
}

export async function ObtenerEmpresasSuscripciones() {
  const [rows] = await pool.query(
    'CALL ObtenerEmpresasSuscripciones()'
);
return rows;
}

export async function obtenerServiciosEmpresa(empresa_id) {
  const [rows] = await pool.query(
    'CALL ObtenerServiciosEmpresa(?)',
    [empresa_id]
);
return rows;
}

export async function obtenerServicioEspecifico(servicio_id) {
  const [rows] = await pool.query(
    'CALL ObtenerServicioEspecifico(?)',
    [servicio_id]
);
return rows;
}

export async function actualizarServicio(servicio_id, empresa, nombre, descripcion, precio, duracion) {
  const [rows] = await pool.query(
    'CALL ActualizarServicio(?, ?, ?, ?, ?, ?)',
    [servicio_id, empresa, nombre, descripcion, precio, duracion]
);
return rows;
}

export async function eliminarServicio(servicio_id) {
  const [rows] = await pool.query(
    'CALL EliminarServicio(?)',
    [servicio_id]
);
return rows;
}

// Procedimientos para Usuarios//////////////////////////////////////////////////////////////////////////////////////////////
export async function Login(correo, contrasena) {
  const [rows] = await pool.query(
    'call Login(?,?)',
    [correo, contrasena]
);
return rows;
}

export async function Logins(correo, contrasena) {
  const [rows] = await pool.query(
    'call LoginUsuario(?,?)',
    [correo, contrasena]
);
return rows;
}

export async function crearUsuario(nombre, apellido, correo, contrasena, telefono) {
  const [rows] = await pool.query(
    'CALL CrearUsuario(?,?,?,?,?)',
    [nombre, apellido, correo, contrasena, telefono]
);
return rows;
}

export async function obtenerUsuarios() {
  const [rows] = await pool.query(
    'CALL ObtenerUsuarios()'
);
return rows;
}

export async function obtenerUsuarioUnico(usuario_id) {
  const [rows] = await pool.query(
    'CALL ObtenerUsuarioUnico(?)',
    [usuario_id]
);
return rows;
}

export async function actualizarUsuario(usuario_id, nombre, apellido, correo, contrasena) {
  const [rows] = await pool.query(
    'CALL ActualizarUsuario(?, ?, ?, ?, ?)',
    [usuario_id, nombre, apellido, correo, contrasena]
);
return rows;
}

export async function eliminarUsuario(usuario_id) {
  const [rows] = await pool.query(
    'CALL EliminarUsuario(?)',
    [usuario_id]
);
return rows;
}

// Procedimientos para Citas
export async function crearCita(empresa, usuario, servicio, fecha, hora) {
  const [rows] = await pool.query(
    'CALL CrearCita(?, ?, ?, ?, ?)',
    [empresa, usuario, servicio, fecha, hora]
);
return rows;
}

export async function obtenerCitasEmpresa(empresa_id) {
  const [rows] = await pool.query('CALL ObtenerCitasEmpresa(?)', [empresa_id]);
  if (rows[0] && Array.isArray(rows[0])) {
      rows[0] = rows[0].map(cita => ({
          ...cita,
          fecha: cita.fecha ? cita.fecha.toISOString().split('T')[0] : null
      }));
  }
  return rows;
}


export async function obtenerCitasUsuario(usuario_id) {
  const [rows] = await pool.query(
    'CALL ObtenerCitasUsuario(?)',
    [usuario_id]
);
return rows;
}

export async function obtenerCitaUnica(cita_id) {
  const [rows] = await pool.query(
    'CALL ObtenerCitaUnica(?)',
    [cita_id]
);
return rows;
}

export async function cancelarCita(cita_id) {
  const [rows] = await pool.query(
    'CALL CancelarCita(?)',
    [cita_id]
);
return rows;
}
