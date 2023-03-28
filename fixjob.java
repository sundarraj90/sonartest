// Import required libraries
import java.net.*;
import java.io.*;

// Set up the URL and connection
URL url = new URL("http://43.205.135.164:8080/job/myjob/build");
HttpURLConnection connection = (HttpURLConnection) url.openConnection();

// Set the required headers
connection.setRequestMethod("POST");
connection.setRequestProperty("Jenkins-Crumb", "crumb-value");

// Send the request
OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
out.write("");
out.close();

// Check the response code
if (connection.getResponseCode() == HttpURLConnection.HTTP_CREATED) {
    System.out.println("Build triggered successfully.");
} else {
    System.out.println("Build trigger failed: " + connection.getResponseMessage());
}

// Close the connection
connection.disconnect();

