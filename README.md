````bash
 py -3 -m venv .venv
 ````

 ````bash
.venv\Scripts\Activate.ps1
 ````

 ````bash
pip install -r requirements.txt
 ````

 ````bash
pip freeze > requirements.txt
 ````

## To start server in dev mode (live server):

````bash
uvicorn app.main:app --reload
 ````

 ### For Swagger OpenAPI doc
 ```
 http://localhost:8000/docs
 ```

 ```
 http://localhost:8000/redoc
 ```