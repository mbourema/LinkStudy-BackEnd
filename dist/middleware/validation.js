"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    age: zod_1.z.number().min(1),
    email: zod_1.z.string().email(),
});
const validateUser = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
    }
    next();
};
exports.validateUser = validateUser;
