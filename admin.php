<?php
// admin.php – kleines Admin-Dashboard

session_start();

// --- Einfaches Login (später ggf. sicherer machen) ---
$USERNAME = "admin";
$PASSWORD = "1234"; // Bitte ändern!

if (isset($_POST['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit;
}

if (isset($_POST['login'])) {
    if ($_POST['username'] === $USERNAME && $_POST['password'] === $PASSWORD) {
        $_SESSION['logged_in'] = true;
    } else {
        $error = "Falscher Benutzername oder Passwort!";
    }
}

// --- Besucherstatistik laden ---
$visitsFile = __DIR__ . '/data/visits.json';
$visits = file_exists($visitsFile) ? json_decode(file_get_contents($visitsFile), true) : [];

// --- Blogposts laden ---
$postsFile = __DIR__ . '/data/posts.json';
$posts = file_exists($postsFile) ? json_decode(file_get_contents($postsFile), true) : [];

// --- Blogpost hinzufügen ---
if (isset($_POST['new_post']) && $_SESSION['logged_in']) {
    $title = trim($_POST['title']);
    $content = trim($_POST['content']);
    $filename = strtolower(str_replace(' ', '_', $title)) . ".html";
    $filePath = __DIR__ . "/blog/" . $filename;

    $template = "<!DOCTYPE html>
<html lang='de'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>$title</title>
<link rel='stylesheet' href='/style/style.css'>
</head>
<body>
<header>
<h1>Blog</h1>
<nav>
<a href='../index.html'>Home</a>
<a href='../blog.html'>← Zurück zum Blog</a>
</nav>
</header>
<main>
<h2>$title</h2>
<p>$content</p>
</main>
<footer>
<div class='footer-container'>
<p>© 2025 Dein Name – Alle Rechte vorbehalten</p>
<nav>
<a href='../blog.html'>Blog</a>
<a href='../about.html'>Über mich</a>
<a href='../impressum.html'>Impressum</a>
<a href='../datenschutz.html'>Datenschutz</a>
</nav>
</div>
</footer>
</body>
</html>";

    file_put_contents($filePath, $template);

    $posts[] = [
        'title' => $title,
        'file' => "blog/$filename",
        'date' => date("Y-m-d H:i")
    ];
    file_put_contents($postsFile, json_encode($posts, JSON_PRETTY_PRINT));

    $success = "Neuer Blogpost wurde erstellt: <a href='blog/$filename' target='_blank'>$filename</a>";
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Adminbereich</title>
<style>
body {
    background: #111;
    color: white;
    font-family: 'Segoe UI', sans-serif;
    padding: 2rem;
}
h1 {
    color: cyan;
}
form {
    margin-bottom: 2rem;
}
input, textarea {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
}
button {
    background: cyan;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    color: black;
    font-weight: bold;
}
.table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 1rem;
}
.table th, .table td {
    border-bottom: 1px solid #333;
    padding: 0.5rem;
}
</style>
</head>
<body>

<?php if (!isset($_SESSION['logged_in'])): ?>
    <h1>Admin Login</h1>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="post">
        <input type="text" name="username" placeholder="Benutzername" required>
        <input type="password" name="password" placeholder="Passwort" required>
        <button type="submit" name="login">Login</button>
    </form>
<?php else: ?>
    <h1>Willkommen im Adminbereich</h1>
    <form method="post"><button name="logout">Logout</button></form>

    <?php if (isset($success)) echo "<p style='color:lime;'>$success</p>"; ?>

    <h2>📊 Aufrufe</h2>
    <table class="table">
        <tr><th>Seite</th><th>Aufrufe</th></tr>
        <?php foreach ($visits as $page => $count): ?>
            <tr><td><?= htmlspecialchars($page) ?></td><td><?= $count ?></td></tr>
        <?php endforeach; ?>
    </table>

    <h2>📝 Neuen Blogpost hinzufügen</h2>
    <form method="post">
        <input type="text" name="title" placeholder="Titel" required>
        <textarea name="content" placeholder="Inhalt (HTML erlaubt)" rows="8" required></textarea>
        <button type="submit" name="new_post">Blogpost erstellen</button>
    </form>

    <h2>📚 Bestehende Blogposts</h2>
    <table class="table">
        <tr><th>Titel</th><th>Datei</th><th>Datum</th></tr>
        <?php foreach (array_reverse($posts) as $p): ?>
            <tr>
                <td><?= htmlspecialchars($p['title']) ?></td>
                <td><a href="<?= htmlspecialchars($p['file']) ?>" target="_blank">Ansehen</a></td>
                <td><?= $p['date'] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>

<?php endif; ?>
</body>
</html>
