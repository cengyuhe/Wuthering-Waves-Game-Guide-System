<?php

$DB_HOST = "localhost";
$DB_USER = "root";
$DB_PASS = "";
$DB_NAME = "wuthering_waves_db";

require_once 'secrets.php';

$BREVO_API_KEY = $REAL_BREVO_API_KEY;

$MAIL_SENDER = "wuwatesting123@gmail.com";

$MAIL_SENDER_NAME = "wuwa test";

$VERIFY_CODE_LENGTH = 6;

$VERIFY_CODE_EXPIRE_SECONDS = 60;

$MAX_VERIFY_ATTEMPTS = 5;

$VERIFY_LOCK_MINUTES = 5;

?>