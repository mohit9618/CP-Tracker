function otpEmailTemplate(username, otp) {
  return `
    <div style="font-family: Arial, sans-serif; padding:20px">
      <h2>Welcome to CP Tracker</h2>

      <p>Hello <b>${username}</b>,</p>

      <p>Your verification code is:</p>

      <h1 style="letter-spacing:5px;color:#2563eb">
        ${otp}
      </h1>

      <p>This code is valid for <b>10 minutes</b>.</p>

      <p>If you didn't request this, please ignore this email.</p>

      <br>

      <p>Thanks,<br><b>CP Tracker Team</b></p>
    </div>
  `;
}

module.exports = otpEmailTemplate;