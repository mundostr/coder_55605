class CustomError extends Error {
    constructor(obj) {
        super(obj.message);
        this.code = obj.code;
        this.moreInfo = obj.moreInfo;
    }
}

export default CustomError;