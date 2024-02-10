export const notFound = (req, res) => {
    return res.status(404).json({message: `${req.originalUrl} - Not found`})
}