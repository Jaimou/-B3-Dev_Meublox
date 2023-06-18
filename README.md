**PROJET MEUBLOX**

Pour installer le projet, cloner le repo github en local sur votre machine

**BACKEND**

technos utilisées :
    - Python
    - MongoDB
    ````bash
 py -3 -m venv .venv
 ````

 ````bash
.venv\Scripts\Activate.ps1
 ````

 ````bash
pip install -r requirements.txt # de préférence ouvrir le fichier requirements.txt dans le terminal (clique droit sur le ficier + open in integrated terminal) et exécuter la commande précédente
 ````

 ````bash
pip freeze > requirements.txt
 ````

## To start server in dev mode (live server):

````bash
uvicorn app.main:app --reload #si vous avez un problème faites un pip uninstall pymongo et pip uninstall bson et faire pip install pymongo puis réexécuter la commande précédente
 ````

 ### For Swagger OpenAPI doc
 ```
 http://localhost:8000/docs
 ```

 ```
 http://localhost:8000/redoc
 ```

**FRONTEND**

installation :  
    - cd frontend  
    - npm install  
    - nodemon start  


technos utilisées :  
    - React  
    - Sass  


**MOBILE**

techno à utiliser :  
    - Flutter
