const handleServerError = (err, req, res, next) => {
    res.status(404).send({ msg: "resources not found" })

    console.log(err.message)
        if (err.name === "ValidationError") {
            return res.status(400).send({
                msg: "Bad message",
                errors: err.errors,
                // errors: err.message--errors:err.errors--for client server
            })
        }

        res.status(500).send({ msg: "Required namedd" })
}
module.exports = mongoose.model("handle",handleServerError)