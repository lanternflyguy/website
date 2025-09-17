<?php
require_once 'vendor/autoload.php'; // If using Composer with Twilio
use Twilio\Rest\Client;

// Your Twilio credentials
$account_sid = 'YOUR_TWILIO_ACCOUNT_SID';
$auth_token = 'YOUR_TWILIO_AUTH_TOKEN';
$twilio_number = 'YOUR_TWILIO_PHONE_NUMBER';
$your_phone_number = 'YOUR_PERSONAL_PHONE_NUMBER'; // Where to send the SMS

// Get data from request
$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'];
$customerName = $data['customerInfo']['name'];
$customerPhone = $data['customerInfo']['phone'];

// Create SMS body
$smsBody = "New message from Lantern Fly Guys website chat:\n";
$smsBody .= "Customer: $customerName\n";
$smsBody .= "Phone: $customerPhone\n";
$smsBody .= "Message: $message";

// Initialize Twilio client
$client = new Client($account_sid, $auth_token);

try {
    // Send SMS
    $client->messages->create(
        $your_phone_number,
        [
            'from' => $twilio_number,
            'body' => $smsBody
        ]
    );
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
