const express = require('express');
var cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const morgan = require('morgan');
const router = require('../Controller/StudentApp.js').router;
const app = express();
app.use(cors());
app.use(morgan("dev"));

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Student Database API", // short title.
        description: "A secondary school database mangement system", //  desc.
        version: "1.0.0", // version number
        contact: {
          name: "Adeola Aderibibe", // your name
          email: "adeolaaderibigbe09@gmail.com", // your email
          url: "https://github.com/Adexandria", // your website
        },
      },
      schemes : ["http"],
      servers: [
        {
          url: "http://localhost:3000",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./Controller/*.js","./Repository/*.js"]
  };
  
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.use("/",router);

app.listen(3000, () => console.log(`Server runs on port 3000`));