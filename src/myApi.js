export const empleados = [
        {nombre: 'Camila', telefono: "245 54 54", correo: 'camila@hotmail.com'},
        {nombre: 'Jose', telefono: "422 23 23", correo: 'jose@correo.com'},
        {nombre: 'Francisco', telefono: "278 93 54", correo: 'francisco@gmail.com'},
        {nombre: 'Monica', telefono: "255 55 55", correo: 'monica@gmail.com'},
        {nombre: 'Guillermo', telefono: "378 64 23", correo: 'guillermo@correo.com'},
        {nombre: 'Maria', telefono: "123 46 87", correo: 'maria@hotmail.com'},
    ];

export default function getInvitado(name){
    return empleados.filter(empleado => empleado.nombre.toLowerCase().match(name.toLowerCase()));
}