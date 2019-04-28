import writeStreamFunctions from "./write-stream-func";

const messageHandler = (senderPlatform, message, senderParams) => {

    // API hit to find the connection
    const recieverPlatform = 'gitter';
    const recieverParams = {
        roomId: "5c9de354d73408ce4fbc325f"
    }

    writeStreamFunctions[recieverPlatform](message, recieverParams);

}

export default messageHandler;