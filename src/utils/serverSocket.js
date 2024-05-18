
export const serverSocket = (socketServer) => {
    return (req, res, next) => {
        req.socketServer = socketServer
        return next()
    }
}
