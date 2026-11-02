# Presencia — Clases de teatro

Landing de Presencia con tipografía editorial, collages fotográficos, texturas granuladas y una experiencia de scroll en tres actos.

## Ver la versión diseñada

[Vista publicada en Sites](https://presencia-teatro-escena.martinromandamato.chatgpt.site)

## Ejecutar en tu computadora

Requiere Node.js. No hay dependencias que instalar.

```sh
node scripts/serve.cjs
```

Abrí `http://127.0.0.1:5173`. También podés usar `npm run dev`.

## Archivos

- `index.html`: contenido y estructura de la landing.
- `styles.css`: estilos base, tipografías, texturas y piezas fotográficas.
- `stage.css`: composición centrada, escala tipográfica y transiciones de los tres actos.
- `app.js`: movimiento de fotos con el mouse y scroll, cambios de acto y formulario.
- `assets/`: fotografías, logo y favicon. El logo suministrado se conserva intacto en `presencia-logo-original.png`; `presencia-logo.svg` lo presenta completo, sin márgenes transparentes sobrantes y en negro para el fondo claro.
- `scripts/serve.cjs`: servidor local de desarrollo sin dependencias.

## Contacto y formulario

El formulario prepara una consulta para WhatsApp (`+54 9 11 3357-7872`). La persona completa sus datos y confirma el envío desde WhatsApp. No almacena consultas ni envía mensajes automáticamente.

Instagram: [@espacio.presencia](https://www.instagram.com/espacio.presencia/)

Mail: `Presenciaclasesdeteatro@gmail.com`

## Publicación

Es una web estática: se publica la raíz del repositorio, sin compilación. Las rutas de los recursos son relativas para poder servirla también desde una subcarpeta.

Los cambios que se hagan en este repositorio no se sincronizan automáticamente con la vista de Sites.

## Diseño adaptable y movimiento

Incluye versiones para escritorio y celular, navegación por teclado y una presentación con menos movimiento cuando la persona tiene activada la preferencia de movimiento reducido.

La carpeta `img/`, si está presente, conserva los recursos de la versión anterior del repositorio. La landing actual utiliza `assets/`.
