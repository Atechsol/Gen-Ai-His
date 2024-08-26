import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email credentials
email = "usmaaanusu@gmail.com"
password = "8086212521"  # Use an app password if 2FA is enabled

# Create the email
msg = MIMEMultipart()
msg['From'] = email
msg['To'] = 'recipient@example.com'
msg['Subject'] = 'Test Email'

body = 'This is a test email.'
msg.attach(MIMEText(body, 'plain'))

# Send the email
try:
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(email, password)
        server.sendmail(email, 'recipient@example.com', msg.as_string())
    print("Email sent successfully")
except smtplib.SMTPAuthenticationError as e:
    print(f"Authentication Error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
