# Simple phone book application take home assignment


## Dependencies

Here are the backend dependencies for python django server:

```bash
python = "^3.9"
Django = "^3.2.9"
djangorestframework = "^3.12.4"
django-phonenumber-field[phonenumbers]
django-cors-headers = "^3.10.0"
```

## Instructions

To run the application, you would require both the frontend and the backend component to be running.


### Running the backend

Start by installing components for the backend.

```bash
cd backend # Go into the backend folder directory
poetry install # Install required dependencies using poetry
```

If you don't have poetry installed, you can go to the [dependencies section](#Dependencies) to do manual installation.

Then you'll have to do the database migration using django's built in ORM. Django by default uses sqlite3 for development so you don't have to worry about database.


Make sure you are in the `/backend` directory when you run this.

```bash
python manage.py migrate
```

Finally, you can run the server by doing `python manage.py runserver`, and the server would be hosted at `localhost:8000` by default.



### Running the frontend

Start again by installing dependencies for the frontend. Frontend is using the React web framework (or library, depending on what camp you are on :) )

```bash
cd frontend # Or cd ../frontend if you are still in the backend directory
yarn install # Or npm install. Although this is only tested with yarn v1
```

After everything is installed you can just do a `yarn start` to get things running at `localhost:3000` !