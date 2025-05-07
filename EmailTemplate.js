const generatePasswordUpdateTemplate = (name = "Customer") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Updated | Montex</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); max-width: 400px;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #004aad; padding: 20px; text-align: center; color: #ffffff; border-top-left-radius: 10px; border-top-right-radius: 10px;">
              <h2 style="margin: 0; font-size: 22px;">Password Changed Successfully</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 20px; color: #333333;">
              <p style="font-size: 16px; margin-top: 0;">Hello ${name},</p>
              <p style="font-size: 16px;">We wanted to let you know that your password has been updated successfully for your Montex account.</p>
              <p style="font-size: 16px;">If this change wasn’t made by you, please contact our support team immediately to secure your account.</p>
              <div style="text-align: center; margin: 25px 0;">
                <a href="${
                  process.env.APP_URL || "https://montex.netlify.app"
                }" 
                   style="background-color: #004aad; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
                  Visit Montex
                </a>
              </div>
              <p style="font-size: 16px;">Thank you for shopping with Montex.</p>
              <p style="font-size: 16px; margin-bottom: 0;">– The Montex Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 13px; color: #666;">
              &copy; ${new Date().getFullYear()} Montex. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const generateEmailTemplate = (otp, name = "Customer") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Montex Password Reset OTP</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="width: 100%; max-width: 360px; background-color: #ffffff; padding: 20px; margin: 30px auto; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="text-align: center; padding: 12px 0; border-bottom: 1px solid #dddddd;">
      <h2 style="margin: 0; font-size: 22px; color: #004aad;">Password Reset Request</h2>
    </div>

    <!-- Body -->
    <div style="padding: 20px; font-size: 15px; color: #333333; line-height: 1.6;">
      <p style="margin-top: 0;">Hi ${name},</p>
      <p>We received a request to reset your password for your Montex account.</p>
      <p>Please use the following One-Time Password (OTP) to proceed. This code is valid for the next 10 minutes:</p>

      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; padding: 14px 30px; font-size: 22px; font-weight: bold; color: #ffffff; background-color: #004aad; border-radius: 8px; letter-spacing: 2px;">
          ${otp}
        </span>
      </div>

      <p>If you didn’t request a password reset, feel free to ignore this email or reach out to our support team immediately.</p>

      <p>Thank you,<br>The Montex Team</p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; font-size: 12px; color: #888888; padding-top: 10px;">
      &copy; ${new Date().getFullYear()} Montex. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

const generateWelcomeTemplate = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting">
  <title>Welcome to Montex</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr style="background-color: #1f2937;">
            <td style="padding: 30px 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 26px;">Welcome to <span style="color: #fbbf24;">Montex</span>!</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 30px 20px; text-align: left; color: #333;">
              <h2 style="margin-top: 0;">Hi ${name},</h2>
              <p style="line-height: 1.6; font-size: 16px;">
                Thanks for signing up at <strong>Montex</strong> – your new go-to place for fashion-forward shopping and unbeatable deals!
              </p>
              <p style="line-height: 1.6; font-size: 16px;">
                Get ready to explore a curated collection of trendy apparel, accessories, and more. We’re here to bring style, comfort, and convenience right to your doorstep.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  process.env.APP_URL || "https://montex.netlify.app"
                }" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style="background-color: #1f2937; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 16px; display: inline-block;">
                  Start Shopping
                </a>
              </div>
              <p style="font-size: 16px;">Need help or have any questions? Our support team is always here for you.</p>
              <p style="font-size: 16px;">Happy shopping,<br/>– The Montex Team</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr style="background-color: #1f2937; color: #fff;">
            <td style="padding: 20px; text-align: center; font-size: 14px;">
              &copy; ${new Date().getFullYear()} Montex. All rights reserved.<br/>
              <a href="${
                process.env.APP_URL || "https://montex.netlify.app"
              }" style="color: #fbbf24; text-decoration: none;">montex.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = {
  generatePasswordUpdateTemplate,
  generateEmailTemplate,
  generateWelcomeTemplate,
};
