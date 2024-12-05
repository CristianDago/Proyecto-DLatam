# Programa 

La propuesta consiste en desarrollar un programa cerrado, en el cual únicamente el administrador tendrá la autoridad para crear usuarios con diferentes roles. Además, se podrán agregar perfiles personalizados según las capacidades y necesidades específicas del cliente, asegurando una gestión eficiente y adaptada al sistema.

## Pantallas
Carpeta img_

- 0.1 - Ingreso a la ruta pública login, ingresando un correo no válido. (Método POST) 
- 0.2 - Ingreso a la ruta pública login, ingresando una contraseña no válida. (Método POST)
- 0.3 - Ingreso a la plataforma con credenciales válidas, obteniendo en la respuesta el token.(Método POST)
- 0.4 - Ingreso a la ruta protegida register sin el token de acceso.(Método POST)
- 0.5 - Ingreso a la ruta protegida register con el token de acceso, pero con un rol no admitido.(Método POST)
- 0.6 - Ingreso a la ruta protegida register con el token de acceso, pero con un email no admitido.(Método POST)
- 0.7 - Registro con el token de acceso y las credenciales necesarias. (Método POST)
- 0.8 - Ingreso a la ruta protegida profile sin el token de acceso.(Método POST)
- 0.9 - Creación del perfil con el token de acceso y las credenciales necesarias.(Método POST)
- 1.0 - Vista de los perfiles creados.(Método GET)
- 1.1 - Vista de la ruta protegida usuarios con el token de acceso. (Método GET)