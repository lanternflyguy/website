<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $propertyType = htmlspecialchars($_POST['propertyType']);
    $location = htmlspecialchars($_POST['location']);
    $message = htmlspecialchars($_POST['message']);
    
    // File upload handling
    $uploadDir = "uploads/";
    $uploadedFiles = [];
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    if (!empty($_FILES['fileInput']['name'][0])) {
        foreach ($_FILES['fileInput']['name'] as $key => $name) {
            if ($_FILES['fileInput']['error'][$key] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES['fileInput']['tmp_name'][$key];
                $fileSize = $_FILES['fileInput']['size'][$key];
                $fileType = $_FILES['fileInput']['type'][$key];
                
                // Validate file size (5MB max)
                if ($fileSize > 5 * 1024 * 1024) {
                    continue; // Skip files that are too large
                }
                
                // Validate file type (images only)
                $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
                if (!in_array($fileType, $allowedTypes)) {
                    continue; // Skip invalid file types
                }
                
                // Generate unique filename
                $fileName = time() . '_' . basename($name);
                $filePath = $uploadDir . $fileName;
                
                if (move_uploaded_file($tmpName, $filePath)) {
                    $uploadedFiles[] = $filePath;
                }
            }
        }
    }
    
    // Email setup
    $to = "chris@lanternflyguy.com";
    $subject = "New Contact Form Submission from $name";
    
    $emailBody = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
    </head>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Property Type:</strong> $propertyType</p>
        <p><strong>Location:</strong> $location</p>
        <p><strong>Message:</strong><br> $message</p>
        <p><strong>Attached Files:</strong> " . count($uploadedFiles) . " files</p>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    
    // Send email
    if (mail($to, $subject, $emailBody, $headers)) {
        // Success - you could redirect to a thank you page
        echo "<script>alert('Thank you for your message! We will contact you shortly.'); window.location.href = 'contact.html';</script>";
    } else {
        // Error
        echo "<script>alert('Sorry, there was an error sending your message. Please call us directly at (516) 725-0672.'); window.location.href = 'contact.html';</script>";
    }
    
    // If you want to save to database as well, you'd add that code here
}
?>
