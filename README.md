#MEAN-App

#Project setup step

#1) clone the project from git:
run: git clone https://github.com/mdali602/MEAN-App.git

#2) install the server dependencies:
run: npm i

#3) install the client dependencies:
run: cd client
run: npm i

#4) client build
run: ng build

#5) lifting up the serer:
run: cd ..
run: nodemon