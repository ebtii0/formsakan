
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const emailMap = {
  YIBAL: {
    HouseKeeping: "Ganga@sakanoman.om",
    Facility: "Ganga@sakanoman.om",
    Catering: "Arshad@sakanoman.om",
    Security: "HSE@sakanoman.om",
   
  },
  RABAB: {
    HouseKeeping: "campboss@sakanoman.om",
    Facility: "campboss@sakanoman.om",
    Catering: "cateringsupervisor@sakanoman.om",
    Security: "hse-advisor@sakanoman.om",
   
  },
  DALEEL: {
    HouseKeeping: "dph.supervisor@sakanoman.om",
    Catering: "chef-daleel@sakanoman.om",
    Security: "dphse@sakanoman.om",
    Facility: "dpfm@sakanoman.om",
  },
  CCED: {
    HouseKeeping: "sakancced@sakanoman.om",
    Facility: "sakancced@sakanoman.om",
    Catering: "sakancced@sakanoman.om",
    Security: "hse.shahd@sakanoman.om, hse.farha@sakanoman.om",
  },
  ALSHAWAMIKH: {
    HouseKeeping: "aos-campboss@sakanoman.om",
    Catering: "aos-campboss@sakanoman.om",
    Security: "aos-campboss@sakanoman.om",
    Facility: "aos-campboss@sakanoman.om",
  },
  "PARK&RIDE": {
    HouseKeeping: "carpark@sakanoman.om",
    Catering: "carpark@sakanoman.om",
    Security: "carpark@sakanoman.om",
    Facility: "carpark@sakanoman.om",
  }
};


app.post('/submit-form', async (req, res) => {
  const data = req.body;
  const { Location, "Issue Type": issueType } = data;

  
  const recipient = emailMap[Location]?.[issueType] || process.env.EMAIL_USERNAME;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `"Emergency System" <${process.env.EMAIL_USERNAME}>`,
    to: recipient,
    subject: `📩 New Issue Report from ${Location}`,
    text: `
Emergency Report 

Location: ${Location}
Area/Dept: ${data["Area"]}
Emergency Level: ${data["Emergency Level"]}
Issue Type: ${issueType}
Responsible Dept: ${data["Responsible Department"]}
Description:
${data["Issue Description"]}

Name: ${data["Name"]}
Phone: ${data["Phone"]}
Room: ${data["Room No"]}
Email: ${data["Email"]}
Staff No: ${data["Staff No"]}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: '✅ The report has been sent successfully!' });
  } catch (error) {
    console.error('❌ Failed Send :', error);
    res.status(500).json({ message: '❌ Failed to send the report' });
  }
});

  
app.use(express.static("public"));       

app.listen(PORT, () => {
  console.log(`🚀 Server ready on: http://localhost:${PORT}`);
});
