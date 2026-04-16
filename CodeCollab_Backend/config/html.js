export const getOtpHtml = ({ email, otp }) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>Verification Code</title>
</head>
<body style="margin:0;padding:0;background:#f6f7fb;color:#111;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%;background:#f6f7fb;">
    <tr>
      <td align="center" style="padding:24px;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9ecf3;">

          <!-- Header -->
          <tr>
            <td style="background:#111827;padding:18px 24px;text-align:center;">
              <span style="display:inline-block;color:#ffffff;font-weight:700;font-size:16px;letter-spacing:0.3px;text-decoration:none;">
                Authentication App
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;color:#111;font-weight:700;">
                Verify your email - ${email}
              </h1>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#444;">
                Use the verification code below to complete your sign-in to Authentication App.
              </p>

              <!-- OTP -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:20px 0;width:100%;">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;padding:14px 28px;font-size:32px;letter-spacing:10px;font-weight:700;color:#111;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 12px 0;">
                This code will expire in <strong>5 minutes</strong>.
              </p>
              <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 12px 0;">
                If this wasn't initiated, this email can be safely ignored.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;color:#6b7280;font-size:12px;line-height:1.6;padding:16px 24px 0 24px;">
              &copy; 2025 Authentication App. All rights reserved.
            </td>
          </tr>
          <tr>
            <td height="16" aria-hidden="true"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  return html;
};

export const getVerifyEmailHtml = ({ email, token }) => {
  const appName = process.env.APP_NAME || "Authentication App";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(token)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>${appName} - Verify Your Account</title>
</head>
<body style="margin:0;padding:0;background:#f6f7fb;color:#111;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%;background:#f6f7fb;">
    <tr>
      <td align="center" style="padding:24px;">
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9ecf3;">

          <!-- Header -->
          <tr>
            <td style="background:#111827;padding:18px 24px;text-align:center;">
              <span style="display:inline-block;color:#ffffff;font-weight:700;font-size:16px;letter-spacing:0.3px;text-decoration:none;">
                ${appName}
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;color:#111;font-weight:700;">
                Verify your account - ${email}
              </h1>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#444;">
                Thanks for registering with ${appName}. Click the button below to verify your account.
              </p>

              <!-- Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:16px 0 20px 0;">
                <tr>
                  <td align="center" style="border-radius:8px;background:#111827;">
                    <a href="${verifyUrl}" target="_blank" rel="noopener"
                      style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                      Verify account
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 12px 0;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin:0 0 12px 0;">
                <a href="${verifyUrl}" target="_blank" rel="noopener"
                  style="color:#111827;text-decoration:underline;word-break:break-all;font-size:14px;line-height:1.6;">
                  ${verifyUrl}
                </a>
              </p>
              <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 12px 0;">
                If this wasn't you, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;color:#6b7280;font-size:12px;line-height:1.6;padding:16px 24px 0 24px;">
              &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
            </td>
          </tr>
          <tr>
            <td height="16" aria-hidden="true"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  return html;
};