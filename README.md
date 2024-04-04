# API REST DE USUARIOS Y POSTEOS

En este proyecto se creó una API REST con diferentes endpoints que permiten la creación, obtención, actualización y eliminación de usuarios y posteos.
Para este proyecto se montó una base de datos de mongoDB, con una collection para usuarios y otra para los posts, y luego se vinculó la misma con los diferentes endpoints. 
Además se implementaron estrategias y middlewares de autenticación (con Passportlocal, Passport-Jwt y Guards) para proteger algunas rutas, por lo que es necesario enviar el token de acceso que uno obtiene cuando loguea un usuario, para hacer peticiones a los endpoints que estan protegidos.

Para ver la documentación en Swagger de todos los endpoints puedes ir a 'api/docs' luego de levantar el proyecto en tu servidor local 

## Instalación

$ npm install

## Ejecución

#Modo Dessarrollo

$ npm run start:dev

## Test

 #User.controller.spec.ts
 
 $ npx jest user.controller.spec.ts


 #Post.controller.spec.ts
 
 $ npx jest post.controller.spec.ts

 
 #App.controller.spec.ts
 
 $ npx jest app.controller.spec.ts




