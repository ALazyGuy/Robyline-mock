<?php
require 'PHPMailer/PHPMailerAutoload.php';

$name = $_POST['name'];
$company = $_POST['company'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$comment = $_POST['comment'];

$message = 'Имя: ' . $name . '<br>Компания: ' . $company . '<br>Email: ' . $email . '<br>Телефон: ' . $phone . '<br>Комментарий: ' . $comment;

if (isset($_POST['phone']) && isset($_POST['email'])) {
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
  $mail->setFrom("testemailrobyline2@yandex.com", "Администратор заявок");
  $mail->Subject = "Заявка";
  $mail->Body = $message;
  $mail->CharSet = 'windows-1251';
  $mail->send();
  header('Location: /');
  die();
}
?>