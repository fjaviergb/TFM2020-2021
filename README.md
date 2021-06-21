# *APP* PARA BÚSQUEDA Y ALMACENAMIENTO ESPECÍFICOS DE TXs EN *IOTA*

### Autor: F. Javier González Betegón
### Escuela: ETSII - UPM

## **Advertencia**
* *SO Unix*. El despliegue de la aplicación no está diseñado para otros sistemas operativos. 
* Base de datos *MySQL* o *MariaDB* ejecutándose en red local.
* La arquitectura del sistema está diseñada para su funcionamiento en red local.
* En caso de emplear múltiples nodos u ordenadores, requerirán de una conexión *SSH* para el funcionamiento de *Ansible*.

## **Fichero de interés**
Los únicos ficheros de interés son *Ansible_deploy* y *Docker_deploy*, en función del método de instalación a emplear.
El resto de documentos se encuentran obsoletos y se han empleado como aprendizaje, testeo y revisión, a excepción de la carpeta *spammer*, donde se puede encontrar el sistema empleado para emitir los mensajes de la tesis a la *testnet* de Chrysalis.

## **Arquitectura**
Ampliamente inspirado en: https://bezkoder.com/react-node-express-mysql/

1. *frontend*. **REACT** + **CORS** + **AXIOS**
    - Escrito: javascript + css
    - Conexiones: *backend*

2. *backend*. **REST** (**EXPRESS**) + **CORS**
    - Escrito: javascript
    - Conexiones: *frontend* + base de datos

3. *fetcher*. Se encarga de actualizar la base de datos con las transacciones realizadas a direcciones y etiquetas guardadas por los usuarios del servicio.
    - Escrito: python
    - Conexiones: nodo *Iota* + base de datos

4. *DB*
    - Gestor: *MySQL* o *MariaDB*
    - Conexiones: *backend* + *fetcher*

5. *Nodo Iota* (OPCIONAL)
    - Estado del arte: *HORNET* Chronycles
    - Objetivo: permitir *queries* con mucha frecuencia o de gran tamaño


## **Despliegue por Ansible**

1. Clonar el repositorio y disponer de la carpeta indicada de interés: *Ansible_deploy*.
    - Instalación: git clone o *download* zip

2. Disponer de *Ansible* para
    - Instalación: 
        1. *sudo add-apt-repository ppa:ansible/ansible*
        2. *sudo apt update -y*
        3. *sudo apt install ansible -y*

3. Modificar el archivo *cors.js* para indicar la dirección *IPV4* local con la que se debe comunicar el *frontend* y el *backend*. Es decir, en "frontend", especificar la del "backend" y viceversa.

**Nota**: no modificar los puertos, pues requeriría modificar las variables de entorno de nodejs para la inicialización.

4. **Recomendación**: disponer de un usuario con todos los privilegios en su base de datos de antemano. Proceso de creación con los permisos necesarios
    - Pasos de creación:
    1. (SOLO MARIADB) SET old_passwords=0;
    2. CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
    3. CREATE USER 'username'@'%' IDENTIFIED BY 'password';
    4. GRANT ALL PRIVILEGES ON * . * TO 'username'@'localhost'; (elimine los espacios en * . *)
    5. GRANT ALL PRIVILEGES ON * . * TO 'username'@'%'; (elimine los espacios en * . *)
    6. CREATE DATABASE db;
    7. GRANT ALL PRIVILEGES ON db.* TO 'username'@'localhost';
    8. GRANT ALL PRIVILEGES ON db.* TO 'username'@'%';

5. En *Ansible_deploy* se encuentran distintas carpetas con contenido de interés/modificable:
 
    - hosts.yml: partes del sistema, divididos en distintos *hosts* para una disposición flexible
    - folder.yml: *playbook* del sistema
    - group_vars: a disposición del usuario, contiene la versión de python a emplear y una variable que dio errores de lectura.
    - host_vars: un fichero yml por parte
        - backend: a cambiar, **dir** (directorio del *host* de destino, predeterminado /usr/src/TFM), **ansible_connection** (tipo de conexión con el host, predeterminado local, pero puede ser *SSH*), **ansible_host** (*host* de destino, predeterminado localhost, pero puede ser cualquier otro conectado en red local y con *SSH*) y **ansible_user** (usuario del *host* de destino, puede ser cualquier otro). OPCIONAL: añadir **ansible_port** para especificar puerto del *host* destinatario, especificado por el protocolo ssh (default 22) y **ansible_ssh_pass** para especificar la contraseña del usuario de destino (requerirá la instalación en el *host* de origen de sshpass: sudo apt-get install sshpass)
        - fetcher. idem + particularidades de la base de datos: **fet_ifuser** (si yes ~ empleará dicho usuario; si otra cosa, se creará un usuario a partir del *root*), **fet_host** (el *host* donde se encuentra el gestor de la base de datos), **fet_port** (el puerto que escucha la base de datos; en MySQL o MariaDB, es el 3306 por defecto), **fet_user** (usuario que dispone de los privilegios necesarios), **fet_pass** (contraseña de dicho usuario), **fet_db** (nombre de la base de datos que desea crear, o acceder en caso de que ya existiera, y almacenar la informacion), **fet_rootpass** (contraseña del *root*, en caso de necesitarse).
        - frontend. idem.
    - roles: contiene las funciones a ejecutar por el playbook en diferentes *tasks*. NO CAMBIAR
        - fetcher/tasks/main.yml
        - folders/tasks/main.yml
        - instnodejs/tasks/main.yml

6. Ejecute en el directorio general: *ansible-playbook -v folder.yml -i hosts.yml*

**Nota**: si todo ha salido correctamente, debería de disponer de todos los archivos en las direcciones que se han especificado en el *playbook*. En concreto, tres directorios:

    1.  backend
            - app.js
            - models.js
            - package.json
            - cors.js
        config.txt

    2.  frontned
            - public
            - src
                - cors.js
            - package.json

    3.  fetcher
            - update/
            - __init__.py
            - __install__.py
            - creator.py
        requirements.txt
        config.txt


7. Inicialice todas las partes:
    1. En el directorio instalado, en backend/, ejecute: *npm start*
    2. En el directorio instalado, en frontend/, ejecute: *npm start*
    4. En el directorio instalado, en fetcher/, ejecute: python3 __init__.py

8. **Observaciones**:
- El programa __init__.py crea un archivo output.txt donde puede comprobar el resultado (satisfactorio o no), de los procesos asíncronos que se llevan a cabo en la actualización.

## **Despliegue por Ansible**

1. Clonar el repositorio y disponer de la carpeta indicada de interés: *Ansible_deploy*.
    - Instalación: git clone o *download* zip

2. Disponer del sistema de imágenes y contenedores Docker. 

3. Acceder a la ruta donde haya localizado *Docker_deploy* e introducir desde la terminal:
    **docker compose up**

4. Se ha realizado de forma rígida, no permite gran interacción y ejecuta todos los servicios (incluida la base de datos) desde un mismo servidor. A cambio, se obtiene el despliegue a través de un único comando.