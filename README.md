# MongoDB-ChatBox

This is a Node.js application using the Express framework to create a simple chat system with a MongoDB database. The chat system allows users to send messages and view previous messages. Below is an overview of the code:

1. Import required modules:

* express: The Express web framework.
* body-parser: Middleware to parse incoming request bodies.
* mongodb: MongoDB client to interact with the database.
* socket.io: Enables real-time, bidirectional communication between the server and clients using WebSockets.

2. Create an Express app, set the view engine to EJS, and use the body-parser middleware to parse URL-encoded request bodies.

3. Define the routes:

* /: Renders the "index" view, which might be the homepage of the application.
* /chat: Renders the "chat" view, where users can interact with the chat system.
* /info: Renders the "info" view, which could be an informational page.

4. Start the Express app, listening on port 3000.

5. Connect to the MongoDB database named "Chat" (running on localhost), using the mongo.connect method.

6. Set up a WebSocket server using socket.io on port 8080.

7. Upon a client connecting to the WebSocket server, the server performs the following actions:

* Retrieves the last 100 messages from the "Chat" collection in the database and sends them to the connected client using the col.find() method.
* Listens for incoming messages (input event) from clients.
* Validates the input data (name and message) and sends an error message if either is empty or contains only whitespace.
* If the input data is valid, the server inserts the message into the database using the col.insert() method.
* The server then emits the latest message to all connected clients using client.emit('output', [data]).

Please note that for this code to work, you need to have a MongoDB server running on 127.0.0.1 (localhost) with a database named "Chat."
