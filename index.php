<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>D'SAPATUAN - Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <h2>D’SAPATUAN</h2>
        <form action="login.php" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            
            <div class="options">
                <label><input type="checkbox" name="remember"> Remember me</label>
                <a href="#">forgot password?</a>
            </div>
            
            <button type="submit">Submit</button>
        </form>
    </div>
</body>
</html>
<?php
echo "Selamat datang di halaman login D'SAPATUAN!";
?>

