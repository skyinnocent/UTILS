#!/bin/bash

# Ask for the path
read -p "Enter the path where you want to create the project: " path

# Print all files in the path
echo "Files in the path $path:"
ls "$path"


# Ask for the project name
read -p "Enter the project name: " project_name

# Create the project directory
mkdir -p "$path/$project_name"

# Create backend and frontend directories
mkdir "$path/$project_name/backend"
mkdir "$path/$project_name/frontend"

# Change directory to backend and initialize npm
cd "$path/$project_name/backend"
npm init -y
touch app.js
mkdir models routes controllers 
npm i express mongoose nodemon
echo "Backend setup completed"
# Change directory to frontend and create React app
cd ..
cd "frontend"
npx create-react-app .
rm -r public 
rm -r src
mkdir public src
cd "public"
touch index.html
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF
cd ..
cd "src"
touch index.js app.js
cat <<EOF > index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF
cat <<EOF > app.js
function App() {
 
}

export default App;
EOF
echo "Project created successfully!"
