# User Dashboard
### Description
A simple monolith dashboard app using mongodb.

**Stack details:**
* Database : Mongo DB
* Server Side Framework : Express JS
* Server : Node JS
**Other details:**
* Template Engine : EJS
* CSS Framework : NES.CSS

##### Notes
My personal notes to remember:
* **issue** Register Controller, redirect menuju login page setTimout method TypeError.

* **issue** Register Controller, kondisi pengecekan input email code block.

* **fix:** Register views, pastikan attribute 'name' ada pada input tags.
* **issue:** Register views, form tidak bisa menangkap request ke req.body/ req.params/ req.query.

* **fix:** Index views, link font local diganti kearah cdn font google.
* **issue:** Index views | Middleware, tidak bisa serving local font dengan pesan:
``The stylesheet http://localhost:3000/font/PressStart2P-Regular.ttf was not loaded because its MIME type, “font/ttf”, is not “text/css”.``

* **fix:** Index views, href diubah dengan menghapus prefix "/public" menjadi "/css.." mengingat express.static('public') mengambil direktori "public" menjadi root direktori static.
* **issue:** Index views | Middleware, tidak bisa serving css files. (request accent "text/css" diresponse "text/html" because MIME type blablabla)
