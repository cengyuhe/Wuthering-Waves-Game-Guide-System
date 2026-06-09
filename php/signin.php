<?php

header(
    "Cache-Control: no-store, no-cache, must-revalidate, max-age=0"
);

header(
    "Pragma: no-cache"
);

header(
    "Expires: 0"
);

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();

require_once "config.php";

$conn =
    new mysqli(
        $DB_HOST,
        $DB_USER,
        $DB_PASS,
        $DB_NAME
    );

if($conn->connect_error)
{
    die(
        json_encode([
            "success"=>false,
            "message"=>"Database connection failed"
        ])
    );
}

if(
    !isset($_SESSION["user_id"])
    &&
    isset($_COOKIE["remember_token"])
)
{
    $token = $_COOKIE["remember_token"];

    $stmt =
        $conn->prepare(
            "SELECT *
             FROM users
             WHERE remember_token=?
             AND remember_expiry > NOW()"
        );

    $stmt->bind_param(
        "s",
        $token
    );

    $stmt->execute();

    $result = $stmt->get_result();

    if($user = $result->fetch_assoc())
{
    session_regenerate_id(true);

    $_SESSION["user_id"] =
        $user["user_id"];

    $_SESSION["username"] =
        $user["username"];
    }
}

header("Content-Type: application/json");

$action=$_GET["action"] ?? "";

if($action=="register")
{
    $data=json_decode(file_get_contents("php://input"), true);

    $username =
    trim(
        strip_tags(
            $data["username"] ?? ""
        )
    );
    $email =
    strtolower(
        trim($data["email"] ?? "")
    );
    $password = $data["password"] ?? "";

    if(strlen($username) < 3 || strlen($password) < 8 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid input data."]);
        exit;
    }

    $check_stmt = $conn->prepare("SELECT user_id FROM users WHERE username=? OR email=?");
    $check_stmt->bind_param("ss", $username, $email);
    $check_stmt->execute();
    if($check_stmt->get_result()->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Username or Email already exists."]);
        exit;
    }
    $check_stmt->close();

    $hash=password_hash($password, PASSWORD_DEFAULT);
    $stmt=$conn->prepare("INSERT INTO users (username,email,password_hash) VALUES(?,?,?)");
    $stmt->bind_param("sss", $username, $email, $hash);

    echo json_encode([
        "success" => $stmt->execute()
    ]);
    exit;
}

if($action=="login")
{
    $data=json_decode(
        file_get_contents("php://input"),
        true
    );

    $email =
    strtolower(
        trim(
            $data["email"] ?? ""
        )
    );
    $password = $data["password"] ?? "";

    $stmt=$conn->prepare(
        "SELECT *
         FROM users
         WHERE email=?"
    );

    $stmt->bind_param("s",$email);

    $stmt->execute();

    $result=$stmt->get_result();

    $user=$result->fetch_assoc();

    if(
        $user &&
        password_verify(
            $password,
            $user["password_hash"]
        )
    )
    {
        session_regenerate_id(true);

        $_SESSION["user_id"]=
            $user["user_id"];

        $_SESSION["username"]=
            $user["username"];

        $remember =
            $data["remember_me"] ?? false;

if($remember)
{
    $token =
        bin2hex(random_bytes(32));

    $expiry =
        date(
            "Y-m-d H:i:s",
            strtotime("+30 days")
        );

    $update =
        $conn->prepare(
            "UPDATE users
             SET remember_token=?,
                 remember_expiry=?
             WHERE user_id=?"
        );

    $update->bind_param(
        "ssi",
        $token,
        $expiry,
        $user["user_id"]
    );

    $update->execute();

    setcookie(
    "remember_token",
    $token,
    [
        "expires"  => time() + (30 * 24 * 60 * 60),
        "path"     => "/",
        "httponly" => true,
        "secure"   => isset($_SERVER["HTTPS"]),
        "samesite" => "Lax"
    ]
);
}
else
{
    $update =
        $conn->prepare(
            "UPDATE users
             SET remember_token=NULL,
                 remember_expiry=NULL
             WHERE user_id=?"
        );

    $update->bind_param(
        "i",
        $user["user_id"]
    );

    $update->execute();

    setcookie(
        "remember_token",
        "",
        time()-3600,
        "/"
    );
}


        echo json_encode([
            "success"=>true
        ]);
    }
    else
    {
        echo json_encode([
            "success"=>false
        ]);
    }

    exit;
}

if($action=="forgot_password")
{
    $data =
        json_decode(
            file_get_contents("php://input"),
            true
        );

    $email =
        strtolower(
            trim(
                $data["email"] ?? ""
            )
        );

    $stmt =
        $conn->prepare(
            "SELECT user_id
             FROM users
             WHERE email=?"
        );

    $stmt->bind_param(
        "s",
        $email
    );

    $stmt->execute();

    $result =
        $stmt->get_result();

    if($user = $result->fetch_assoc())
    {
        $code =
            str_pad(
                random_int(0,999999),
                $VERIFY_CODE_LENGTH,
                "0",
                STR_PAD_LEFT
            );

        $expiry =
            date(
                "Y-m-d H:i:s",
                time() + $VERIFY_CODE_EXPIRE_SECONDS
            );

        $update =
            $conn->prepare(
                "UPDATE users
                 SET verify_code=?,
                     verify_expiry=?,
                     verify_attempts=0,
                     verify_locked_until=NULL
                 WHERE user_id=?"
            );

        $update->bind_param(
            "ssi",
            $code,
            $expiry,
            $user["user_id"]
        );

        $update->execute();

        $emailData = [
            "sender" => [
                "name"  => $MAIL_SENDER_NAME,
                "email" => $MAIL_SENDER
            ],
            "to" => [
                [
                    "email" => $email
                ]
            ],
            "subject" =>
                "Your Verification Code",
            "htmlContent" =>
                "
                <h2>Password Reset Verification</h2>

                <p>Your verification code is:</p>

                <h1>{$code}</h1>

                <p>
                    This code will expire in
                    {$VERIFY_CODE_EXPIRE_SECONDS}
                    seconds.
                </p>

                <p>
                    If you did not request this,
                    please ignore this email.
                </p>
                "
        ];

        $curl =
            curl_init();

        curl_setopt_array(
            $curl,
            [
                CURLOPT_URL =>
                    "https://api.brevo.com/v3/smtp/email",

                CURLOPT_RETURNTRANSFER =>
                    true,

                CURLOPT_POST =>
                    true,

                CURLOPT_HTTPHEADER =>
                    [
                        "accept: application/json",
                        "api-key: ".$BREVO_API_KEY,
                        "content-type: application/json"
                    ],

                CURLOPT_POSTFIELDS =>
                    json_encode(
                        $emailData
                    )
            ]
        );

        $brevoResponse =
            curl_exec($curl);

        $httpCode =
            curl_getinfo(
                $curl,
                CURLINFO_HTTP_CODE
            );

        curl_close($curl);

        if($httpCode == 201)
        {
            echo json_encode([
                "success"=>true
            ]);
        }
        else
        {
            echo json_encode([
                "success"=>false,
                "message"=>"Failed to send email."
            ]);
        }
    }
    else
    {
        echo json_encode([
            "success"=>false,
            "message"=>"Email not found."
        ]);
    }

    exit;
}

if($action=="verify_code")
{
    $data =
        json_decode(
            file_get_contents("php://input"),
            true
        );

    $email =
        strtolower(
            trim(
                $data["email"] ?? ""
            )
        );

    $code =
        trim(
            $data["code"] ?? ""
        );

    $stmt =
        $conn->prepare(
            "SELECT *
             FROM users
             WHERE email=?"
        );

    $stmt->bind_param(
        "s",
        $email
    );

    $stmt->execute();

    $user =
        $stmt
        ->get_result()
        ->fetch_assoc();

    if(!$user)
    {
        echo json_encode([
            "success"=>false,
            "message"=>"User not found."
        ]);

        exit;
    }

    if(
        $user["verify_locked_until"]
        &&
        strtotime(
            $user["verify_locked_until"]
        ) > time()
    )
    {
        echo json_encode([
            "success"=>false,
            "message"=>"Too many failed attempts. Wait 5 minutes."
        ]);

        exit;
    }

    if(
        $user["verify_expiry"] &&
        strtotime(
            $user["verify_expiry"]
        ) < time()
    )
    {
        echo json_encode([
            "success"=>false,
            "message"=>"Verification code expired."
        ]);

        exit;
    }

    if($code === $user["verify_code"])
{
    $update =
        $conn->prepare(
            "UPDATE users
             SET verify_code=NULL,
                 verify_expiry=NULL,
                 verify_attempts=0,
                 verify_locked_until=NULL
             WHERE user_id=?"
        );

    $update->bind_param(
        "i",
        $user["user_id"]
    );

    $update->execute();

    $_SESSION["reset_user_id"] =
        $user["user_id"];

    echo json_encode([
        "success"=>true
    ]);

    exit;
}

    else
    {
        $attempts =
            $user["verify_attempts"] + 1;

        if($attempts >= 5)
        {
            $lockUntil =
                date(
                    "Y-m-d H:i:s",
                    strtotime("+5 minutes")
                );

            $update =
                $conn->prepare(
                    "UPDATE users
                     SET verify_attempts=?,
                         verify_locked_until=?
                     WHERE user_id=?"
                );

            $update->bind_param(
                "isi",
                $attempts,
                $lockUntil,
                $user["user_id"]
            );

            $update->execute();

            echo json_encode([
                "success"=>false,
                "message"=>"Too many attempts. Locked for 5 minutes."
            ]);
        }
        else
        {
            $update =
                $conn->prepare(
                    "UPDATE users
                     SET verify_attempts=?
                     WHERE user_id=?"
                );

            $update->bind_param(
                "ii",
                $attempts,
                $user["user_id"]
            );

            $update->execute();

            echo json_encode([
                "success"=>false,
                "message"=>"Wrong verification code."
            ]);
        }
    }

    exit;
}

if($action=="reset_password")
{
    if(
        !isset(
            $_SESSION["reset_user_id"]
        )
    )
    {
        echo json_encode([
            "success"=>false,
            "message"=>"Unauthorized."
        ]);

        exit;
    }

    $data =
        json_decode(
            file_get_contents("php://input"),
            true
        );

    $password =
        $data["password"] ?? "";

    if(strlen($password) < 8)
    {
        echo json_encode([
            "success"=>false,
            "message"=>"Password must be at least 8 characters."
        ]);

        exit;
    }

    $hash =
        password_hash(
            $password,
            PASSWORD_DEFAULT
        );

    $user_id =
        $_SESSION["reset_user_id"];

    $stmt =
    $conn->prepare(
        "SELECT password_hash
         FROM users
         WHERE user_id=?"
    );

$stmt->bind_param(
    "i",
    $user_id
);

$stmt->execute();

$user =
    $stmt
    ->get_result()
    ->fetch_assoc();

if(
    password_verify(
        $password,
        $user["password_hash"]
    )
)
{
    echo json_encode([
        "success"=>false,
        "message"=>"Please choose a different password from your current password."
    ]);

    exit;
}

    $update =
        $conn->prepare(
            "UPDATE users
             SET password_hash=?,
                 remember_token=NULL,
                 remember_expiry=NULL
             WHERE user_id=?"
        );

    $update->bind_param(
        "si",
        $hash,
        $user_id
    );

    $update->execute();

    unset(
        $_SESSION["reset_user_id"]
    );

    echo json_encode([
        "success"=>true
    ]);

    exit;
}

if($action=="check_login")
{
    echo json_encode([
        "logged_in" => isset($_SESSION["user_id"]),
        "username" => $_SESSION["username"] ?? null
    ]);

    exit;
}

if($action=="logout")
{
    if(isset($_SESSION["user_id"]))
    {
        $stmt =
            $conn->prepare(
                "UPDATE users
                 SET remember_token=NULL,
                     remember_expiry=NULL
                 WHERE user_id=?"
            );

        $stmt->bind_param(
            "i",
            $_SESSION["user_id"]
        );

        $stmt->execute();
    }

    setcookie(
        "remember_token",
        "",
        time() - 3600,
        "/"
    );

    $_SESSION = [];

    session_unset();

    session_destroy();

    setcookie(
        session_name(),
        "",
        time() - 3600,
        "/"
    );

    echo json_encode([
        "success" => true
    ]);

    exit;
}

?>