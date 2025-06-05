# Metric-catalog-tool
## Overview
This repository contains code for the Metric Catalog Tool, that consists of 43 software metrics and their attributes as extracted from the (ECSS-Q-HB-80-04A)[https://ecss.nl/hbstms/ecss-q-hb-80-04a-software-metrication-handbook/]. Another part of the Tool is its management capabilities, that allows users to select and export metrics for projects. 

## How to set up the project
This project consists of two parts: server and client. 
The server is based on Nodejs and Kraken, while the client is based on Vue.js.

To run the server you need to do the following:

```
cd backend
npm i
npm run start
```

### how to debug

To start the backend in a debugging session, run the `dev` npm script and attach a debugger to it, e.g. in visual Studio code

```shell
npm run dev
```

Additionally, a local database need to be set up. You will find inside the folder Backend the file `.env.example`. Make a copy of this file and rename it to `.env` and add the URL of the Database service of your choice (like mongodb).

A good way to do it is by using [MongoDB Compass](https://www.mongodb.com/products/tools/compass) to have a visual overview of the content of the db.

To run the client you need to do the following:

```
cd vue
npm i
npm run dev
```

## References
The code in this project was referred in the following papers:

Vasylieva, K., Brenner, T., Kuhrmann, M., Münch, J. (2025). Enhancing Transparency in Space Metrics Use: Insights from an Initial Study. In: Pfahl, D., Gonzalez Huerta, J., Klünder, J., Anwar, H. (eds) Product-Focused Software Process Improvement. PROFES 2024. Lecture Notes in Computer Science, vol 15452. Springer, Cham. [10.1007/978-3-031-78386-9_22](https://link.springer.com/chapter/10.1007/978-3-031-78386-9_22).

 Vasylieva, K., Kuhrmann, M., Xavier, M. K., & Klünder, J. (2023, September). How agile are you? discussing maturity levels of agile maturity models. In 2023 49th Euromicro Conference on Software Engineering and Advanced Applications (SEAA) (pp. 270-277). IEEE. [10.1109/SEAA60479.2023.00049](https://ieeexplore.ieee.org/document/10371582) 
