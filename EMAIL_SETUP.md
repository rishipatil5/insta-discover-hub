# Email Notifications Setup Guide

## Overview
When a user submits a shop for review, emails are automatically sent to:
- rishipatil0048@gmail.com
- mahajangunjan20@gmail.com

## Setup Instructions

### 1. Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key
1. Go to the Resend dashboard
2. Navigate to the "API Keys" section
3. Copy your API key

### 3. Configure Environment Variables
Create a `.env.local` file in the project root (for development) or `.env` for production:

```
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Verify Email Domain (Production)
For production, you need to verify your email domain:
1. In the Resend dashboard, go to "Domains"
2. Add your domain (e.g., your-domain.com)
3. Follow the DNS verification steps
4. Update the "from" email in `src/api/send-notification.ts` to use your verified domain

### 5. Test the Email Flow
1. Start your development server: `npm run dev`
2. Navigate to the "List your shop" page
3. Fill out the form and submit
4. Check the admin email addresses for the notification

## Email Content
The email notification includes:
- Shop name
- Instagram handle
- Category
- Description
- Location (if provided)
- Cover image URL (if provided)
- Submitter email (if provided)
- Link to review submissions (admin panel - update as needed)

## Troubleshooting

### "Invalid API Key" Error
- Verify your API key is correct in `.env.local`
- Make sure it starts with `re_` prefix from Resend

### Emails Not Sending
- Check the server logs for error messages
- Verify the Resend API key is set correctly
- For development, check the terminal output for any email sending errors
- Verify the sender email is verified in your Resend dashboard

### Admin Emails List
To add or remove email addresses, edit the `ADMIN_EMAILS` array in `src/api/send-notification.ts`:

```typescript
const ADMIN_EMAILS = ["rishipatil0048@gmail.com", "mahajangunjan20@gmail.com"];
```

## Email Service Alternative
If you prefer not to use Resend, you can replace it with:
- SendGrid (update `src/api/send-notification.ts`)
- Nodemailer with SMTP
- Other email services

## Costs
- Resend: 100 emails free per day, then $0.20 per email
- Your app can send unlimited notifications with a paid plan
