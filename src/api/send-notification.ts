import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAILS = ["rishipatil0048@gmail.com", "mahajangunjan20@gmail.com"];

interface SubmissionData {
  name: string;
  handle: string;
  category: string;
  description: string;
  location?: string | null;
  image_url?: string | null;
  submitter_email?: string | null;
}

async function sendEmailsToAdmins(submission: SubmissionData) {
  try {
    const emailContent = `
      <h2>New Shop Submission</h2>
      <p><strong>Shop Name:</strong> ${submission.name}</p>
      <p><strong>Instagram Handle:</strong> @${submission.handle}</p>
      <p><strong>Category:</strong> ${submission.category}</p>
      <p><strong>Description:</strong> ${submission.description}</p>
      ${submission.location ? `<p><strong>Location:</strong> ${submission.location}</p>` : ""}
      ${submission.image_url ? `<p><strong>Image URL:</strong> <a href="${submission.image_url}">${submission.image_url}</a></p>` : ""}
      ${submission.submitter_email ? `<p><strong>Submitter Email:</strong> ${submission.submitter_email}</p>` : ""}
      <p><br><a href="https://your-admin-panel.com/submissions" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Review Submission</a></p>
    `;

    const results = await Promise.allSettled(
      ADMIN_EMAILS.map((email) =>
        resend.emails.send({
          from: "noreply@insta-discover-hub.com",
          to: email,
          subject: `New Shop Submission: ${submission.name}`,
          html: emailContent,
        })
      )
    );

    // Log results
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Email sent to ${ADMIN_EMAILS[index]}:`, result.value);
      } else {
        console.error(`Email failed for ${ADMIN_EMAILS[index]}:`, result.reason);
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending notification email:", error);
    throw error;
  }
}

export const sendSubmissionNotification = createServerFn({
  method: "POST",
}).handler(sendEmailsToAdmins);
