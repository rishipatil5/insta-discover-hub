import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const ADMIN_EMAILS = ["mahajangunjan20@gmail.com"];

interface SubmissionData {
  name: string;
  handle: string;
  category: string;
  description: string;
  location?: string | null;
  image_url?: string | null;
  submitter_email?: string | null;
}

export const sendSubmissionNotification = createServerFn({ method: "POST" })
  .inputValidator((data: SubmissionData) => data)
  .handler(async ({ data: submission }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return { success: false, error: "Email service not configured" };
    }

    const resend = new Resend(apiKey);

    const emailContent = `
      <h2>New Shop Submission</h2>
      <p><strong>Shop Name:</strong> ${submission.name}</p>
      <p><strong>Instagram Handle:</strong> @${submission.handle}</p>
      <p><strong>Category:</strong> ${submission.category}</p>
      <p><strong>Description:</strong> ${submission.description}</p>
      ${submission.location ? `<p><strong>Location:</strong> ${submission.location}</p>` : ""}
      ${submission.image_url ? `<p><strong>Image URL:</strong> <a href="${submission.image_url}">${submission.image_url}</a></p>` : ""}
      ${submission.submitter_email ? `<p><strong>Submitter Email:</strong> ${submission.submitter_email}</p>` : ""}
    `;

    try {
      const results = await Promise.allSettled(
        ADMIN_EMAILS.map((email) =>
          resend.emails.send({
            from: "kiosk <onboarding@resend.dev>",
            to: email,
            subject: `New Shop Submission: ${submission.name}`,
            html: emailContent,
          })
        )
      );

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
      return { success: false, error: String(error) };
    }
  });
