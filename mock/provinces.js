export default {
    [`GET /province/getProvincePage`]: (req, res) => {
        const response = {
            success: true,
            message: null,
            status: 200,
            results: {
                content: []
            }
        }
        res.send(response);
    }
}