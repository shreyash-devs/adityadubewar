# Resume Download Setup Guide

## ✅ What's Already Implemented

1. **Google Sign-In Integration**: The "My Resume" button now triggers Google Sign-In
2. **Email Capture**: When users sign in, their email and name are captured
3. **PDF Download**: Resume downloads automatically after sign-in
4. **Success Notification**: Users see a success message after download
5. **Email Notification Framework**: Ready for EmailJS integration

## 🔧 Setup Required

### Step 1: Add Your Resume PDF
- Replace the placeholder file `Aditya_Dubewar_Resume.pdf` with your actual resume
- Make sure the filename matches exactly: `Aditya_Dubewar_Resume.pdf`

### Step 2: Set Up EmailJS (for Email Notifications)

1. **Sign up at EmailJS**: Go to [https://www.emailjs.com/](https://www.emailjs.com/) and create a free account

2. **Create an Email Service**:
   - Go to "Email Services" in your EmailJS dashboard
   - Click "Add New Service"
   - Choose "Gmail" or your preferred email provider
   - Connect your email account

3. **Create an Email Template**:
   - Go to "Email Templates" in your EmailJS dashboard
   - Click "Create New Template"
   - Use this template content:

```
Subject: Resume Downloaded - {{user_name}}

Hi Aditya,

Someone has downloaded your resume from your portfolio website.

Details:
- Name: {{user_name}}
- Email: {{user_email}}
- Download Date: {{download_date}}

Best regards,
Your Portfolio Website
```

4. **Get Your IDs**:
   - **User ID**: Found in "Account" > "API Keys"
   - **Service ID**: Found in "Email Services" (e.g., "service_abc123")
   - **Template ID**: Found in "Email Templates" (e.g., "template_xyz789")

5. **Update the Code**:
   In `script.js`, replace these placeholders:
   ```javascript
   emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your actual User ID
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Replace with your actual IDs
   ```

## 🚀 How It Works

1. **User clicks "My Resume"** → Google Sign-In popup appears
2. **User selects their Google account** → Email and name are captured
3. **PDF downloads automatically** → User gets success notification
4. **You receive an email** → With user's details and download timestamp

## 📱 Testing

1. Open your website in a browser
2. Click the "My Resume" button
3. Sign in with your Google account
4. Check that the PDF downloads
5. Check your email for the notification

## 🔒 Privacy & Security

- Only the user's email and name are captured (no other data)
- Google handles all authentication securely
- No passwords or sensitive data are stored
- Email notifications are sent only to you

## 🛠 Troubleshooting

### PDF doesn't download:
- Make sure `Aditya_Dubewar_Resume.pdf` exists in your root directory
- Check browser console for errors

### Email notifications not working:
- Verify your EmailJS IDs are correct
- Check EmailJS dashboard for any errors
- Make sure your email service is connected

### Google Sign-In not working:
- Verify your Google OAuth Client ID is correct
- Make sure your domain is added to authorized origins in Google Cloud Console

## 📞 Support

If you need help with setup, check:
1. EmailJS documentation: https://www.emailjs.com/docs/
2. Google Sign-In documentation: https://developers.google.com/identity/gsi/web 