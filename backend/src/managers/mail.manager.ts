import { transporter } from "../config/nodemailer";

export class EmailManager {
  async sendEmail(
    subject: string,
    message: string,
    toEmail: string
  ): Promise<{ status: string; message?: string }> {
    try {
      const htmlMessage = `
             <!DOCTYPE html>
             <html lang="en">
               <head>
                 <meta charset="UTF-8" />   
                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                 <title>${subject}</title>
                 <style>
   /* Importing Google Font */
   @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

   body {
     font-family: "Roboto", Arial, sans-serif;
     background-color: #f4f4f4;
     margin: 0;
     padding: 0;
   }
   .container {
     width: 100%;
     max-width: 600px;
     margin: 20px auto;
     background: #ffffff;
     padding: 20px;
     border: 1px solid #dddddd;
     border-radius: 8px;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   }
   .header {
     text-align: center;
     margin-bottom: 20px;
   }
   .header img {
     width: 120px;
     height: auto;
   }
   .title {
     font-size: 26px;
     font-weight: 700;
     color: #333333;
     margin-bottom: 15px;
     text-align: center;
   }
   .content {
     font-size: 16px;
     color: #555555;
     line-height: 1.6;
   }
   .footer {
     margin-top: 20px;
     font-size: 14px;
     color: #777777;
     text-align: center;
   }
   .footer a {
     color: #1a73e8;
     text-decoration: none;
   }
   .footer a:hover {
     text-decoration: underline;
   }
   @media only screen and (max-width: 600px) {
     .container {
       padding: 15px;
     }
     .title {
       font-size: 22px;
     }
     .content {
       font-size: 14px;
     }
   }
 </style>
               </head>
               <body>
 <div class="container">
   <div class="header">
     <img
       src="https://st3.depositphotos.com/1020091/12754/v/450/depositphotos_127542692-stock-illustration-tennis-sneaker-icon.jpg"
       alt="Company Logo"
     />
   </div>
    
   <div class="title">${subject}</div>
   <div class="content">${message}</div>
   <div>
     <a href="https://fulldjangoangular.netlify.app/user/">For More Information</a>
   </div>
   <div>
     <a href="https://fulldjangoangular.netlify.app/user/purchase-history"
       >View Your Purchase History</a
     >
   </div>
   <div class="footer">
     &copy; 2024 Full Store. All rights reserved. <br />
   </div>
 </div>
 
                
              
</body>
              
             </html>
         `;

      const mailOptions = {
        from: "fullstorefullstore3@gmail.com",
        to: toEmail,
        subject: subject,
        html: htmlMessage,
      };

      await transporter.sendMail(mailOptions);
      return { status: "success" };
    } catch (error) {
      console.error("Error in EmailManager sendEmail:", error);
      return { status: "error", message: error.message };
    }
  }
}
