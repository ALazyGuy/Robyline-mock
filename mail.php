<?php
require 'PHPMailer/PHPMailerAutoload.php';
$mail = new PHPMailer();
$mail->isSMTP();                                    
$mail->Host = 'smtp.yandex.ru';  
$mail->SMTPAuth = true;                               
$mail->Username = "testemailrobyline2@yandex.com";
$mail->Password = "bwwhjtbynikdzrzf";                          
$mail->SMTPSecure = 'tls';
$mail->Port = 587;  
$mail->isHTML(true);
$mail->addAddress("testemailrobyline1@yandex.com", "Test1 Test1");
$mail->setFrom("testemailrobyline2@yandex.com", "Test2 Test2");
$mail->Subject = "Test is Test Email sent via Gmail SMTP Server using PHP Mailer";
$mail->Body = "This is a Test Email sent via Gmail SMTP Server using PHP mailer class."; 
if(!$mail->send()) {
  echo "Error while sending Email.";
  echo $mail->ErrorInfo;
} else {
  echo "Email sent successfully";
}
?>