<?php
require_once './config.php';

// Initialize variables
$errors = [];
$success = '';

// Handle logout
if (!empty($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Handle login
if (!empty($_POST['action']) && $_POST['action'] === 'login') {
    if ($_POST['password'] === $ADMIN_PASSWORD) {
        $_SESSION['logged_in'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $errors[] = 'Incorrect password.';
    }
}

// Load current data
$data = [];
if (file_exists($DATA_FILE)) {
    $json = file_get_contents($DATA_FILE);
    $data = json_decode($json, true);
}

// Handle save
if (!empty($_POST['action']) && $_POST['action'] === 'save' && !empty($_SESSION['logged_in'])) {
    $decoded = json_decode($_POST['jsondata'], true);
    if ($decoded === null && json_last_error() !== JSON_ERROR_NONE) {
        $errors[] = 'Invalid JSON — please correct the format.';
    } else {
        if (file_put_contents($DATA_FILE, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
            $data = $decoded;
            $success = 'Saved successfully.';
        } else {
            $errors[] = 'Failed to write data.json — check file permissions.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin — Portfolio</title>
<link rel="stylesheet" href="assets/style.css">
<script src="assets/script.js" defer></script>
</head>
<body>
<div class="container admin">
<h1>Admin Panel</h1>

<?php if (!empty($errors)): ?>
    <div class="error"><?php echo implode('<br>', array_map('htmlspecialchars', $errors)); ?></div>
<?php endif; ?>

<?php if (empty($_SESSION['logged_in'])): ?>
    <form method="post">
        <input type="hidden" name="action" value="login">
        <label>Admin password:</label>
        <input type="password" name="password" required>
        <button type="submit">Login</button>
    </form>
    <p class="small">Change your password in <code>config.php</code></p>
<?php else: ?>
    <p>Logged in as admin. <a href="?logout=1">Logout</a></p>
    <p class="small">Edit the JSON below and press Save. Invalid JSON will not be saved.</p>
    <form method="post">
        <input type="hidden" name="action" value="save">
        <textarea name="jsondata" rows="20"><?php echo htmlspecialchars(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)); ?></textarea>
        <button type="submit">Save</button>
    </form>
    <?php if (!empty($success)): ?>
        <div class="success"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>
<?php endif; ?>
</div>
</body>
</html>
