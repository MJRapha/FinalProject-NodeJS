import { Schema } from "mongoose";
import { Role } from "../../@types.js";
//role has a role name: (user/admin/moderator)
const roleSchema = new Schema<Role>({
    name: { type: String, unique: true },
});

export { roleSchema };
