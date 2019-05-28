# InterPlatformChat
InterPlatformChat or IPC is a NodeJS based application that enables the users to connect with other users with the independence of choosing the messenger they like the most.

## Development Idea
- Every user should be treated as a node that is connected to the parent node, i.e. InterPlatformChat server through an interface.

### Users or Node
Every user chooses a Platform of their own choice and connects with the interface. Once done they are redirected to a webpage where they chose the user they want to talk to. Once done they are reverted back to their platform where the messages sent to the interface are sent to the person connected directly.

### Interface
The interface is different for each platform and depends on the developer tools provided by that particular platform. The interface ranges from a Chatbot to a dummy user named InterPlatformChat. Now these Interface connect to the InterPlatformChat server where they are treated as nodes. All user has to do is connect to the option we have provided on each platform, choose the user they want to talk to and start having a conversation.

### InterPlatformChat Server
The server maintains a record of each connection and keeps on monitoring each node. Every time it receives a message from any node it checks for it's connection. Once the receiver is found the server responds to the receiver with the message it has received from the sender.

## Usage Guide
It is still in pre-production stage and hence can't be used right now.

## Contributors Guide
- ### Commit Guidelines
 - No commit should include changes in both frontend and backend directories.
 - Format of Commit Message
 ```
 git commit -m "<frontend OR backend OR (empty)>: <Reason or Contents of changes> | <Github Issue No. if applicable>"
 ```

## Nodes Suppourted
- Gitter

## Status
- Slack node in early-development stage.
- WeChat node in research stage.

## Ideation Issues
- For the platforms that don't provide support for Chat-Bots we have come up with an idea of dummy user. Once connected to the user they want to talk to the user messages this dummy user which then forwards the message to the user on the other end. This gives rise to a privacy issue. The problem with this idea is that gitter records all of the conversation that has been done between the users, i.e. the dummy InterPlatformChat user and the actual user and provides it to us. This means we'll always have the record of each and every message that has been sent or received by a user connected using Gitter. Now, it could be argued that even in the case of a Chat Bot the response still do come through a server where the messages could be easily stored and used in similar way. But if there's a better way why not use that.

## Resources
- Storyboard : https://trello.com/invite/b/8lOmBe9k/e1f1fe5753c87efadf9bf0c6eec5844a/ipc
