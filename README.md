# XPlore 

<div align="center">
<img src="src/xplore/public/imgs/Homepage.png" alt="">
</div>

# Table of contents

1. [Introduction](#Introduction)
2. [Implementation](#Implementation)
3. [Features](#Features)
4. [Challenges](#Challenges)

## 1. Introduction <a name="Introduction"></a>

<div style = "text-align: justify">
This project is part of our coursework for the Software Design course at HCMUS during Semester 2 (2023-2024). Xplore is a website that provides a platform where writers and readers can connect, share, and exchange knowledge, opinions, and stories on various topics.
</div>

### 1.1 Team Members

| Order |         Name          | Student ID |
|:-----:|:---------------------:|:----------:|
|   1   |     Ngo Ngoc Lien     |  21127341  |
|   2   |      Phan My Linh     |  21127637  |
|   3   | Nguyen Tran Hong Phuc |  21127672  |
|   4   |      Tran Bao Ngoc    |  21127738  |

## 2. Implementation <a name="Implementation"></a>

### 2.1 Database Setup

Ensure you have installed PostgreSQL on your computer. 

 - Open pgAdmin.
 
 - In the **Menubar**, click on Object -> **Register**-> **Server** to create a server for localhost. 
 
 - In the **General** tab, enter the **Name** as desired. 
 
 - In the **Connection** tab:
	 - Enter **Hostname** as "localhost"
	 - Enter **Username**, and **Password** as the postgres account information on your machine. 

 - Click **Save** to create the server. 
 
 - Select the postgres database in the newly created server:
	 - In the **Menubar**, click on **Tool** -> **Query** Tool. 
	 - Paste the contents of the `db.sql` file from the `db` folder into the Query frame. 

 - Select the postgres database in the newly created server:
	 - In the **Menubar**, click on **Object** -> **Properties**. 
	 - If the information in the **Owner** section is "postgres", click **Execute** (F5) to execute the query. Otherwise, click **Replace** (Ctrl + Shift + F) to replace the "postgres" string with the information in the **Owner** section. Click **Execute** (F5) to execute the query.

### 2.2 Source Code Installation
Ensure you have installed Node.js and npm on your computer. Open the project folder in Visual Studio Code or another popular source code editor.

 - Clone this repository
    ```sh
    git clone https://github.com/pmlinh21/SoftwareDesign-21KTPM3-Group04
    ```
### 2.2.1 Bacend
- Open the `config.json` file in the `Backend -> src -> config` folder. 
- In the development section, replace username and password with the postgres account information on your machine. 
- Open terminal and navigate to the BackEnd folder. 
- Run `npm install` to download the necessary packages. 
- Run `npm start` to start the server.
    
### 2.2.2 Front end
- Open terminal and navigate to the xplore folder. 
- Run `npm install` to download the necessary packages. 
- Run `npm start` to start the server.
 - Open a browser and access [http://localhost:3030](http://localhost:3030). After this step, you will be able to access the webpage on your computer.
<!-- Features -->

## Features <a name="Features"></a>

<div style = "text-align: justify">
  
</div>

<!-- Challenge -->

## Challenges <a name="Challenges"></a>

<div style = "text-align: justify">
   
</div>

<p align="right">(<a href="#top">Back to top</a>)</p>
