export const verifyEmailTemplate = (name , email , otp) => {
    return `
         <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          *{
              margin: 0;
              padding: 0;
          }
              .heading{
                  margin-top: 20px;
                  color : white;
                  padding-left : 20px;
              }
          .welcomeText{
              width : 80%;
              margin-left : 10%;
              margin-top : 20px;
              font-style: bold;
          }
          .warningText{
              width : 80%;
              margin-left : 10%;
              margin-top : 20px;
          }
          .showmessage{
              font-style : bold;
              margin-top : 30px;
              padding-left : 10px;
          }
              .otp{
                  width : 80%;
                  margin-left : 10%;
                  margin-top:20px;
                  text-align : center;
                  color : white;
                  background-color : green;
                  font-size : 40px;
                  padding-top:20px;
                  padding-bottom:20px;
              }
  
      </style>
  </head>
  <body>
          <h1 class="heading"> welcome ${name}  </h1>
          <p class="welcomeText"> welcome to userAuth we are here to help you </p>
          <p class="warningText"> welcome to user auth you are new user i would like to say you thanks to join user auth </p>
          <p class="showmessage"> Your otp is given below </p>
          <h1 class="otp"> ${otp} </h1>
          <p class="warningText"> if you are facing any error contact with our team using the contact us page we are always ready for you :)</p>
          <p class="warningText" > if you have any query so feel free to contact us </p>
  </body>
  </html>
      
      `;
  };
  