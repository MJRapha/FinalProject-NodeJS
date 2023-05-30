import { Schema } from "mongoose";
//role has a role name: (user/admin/moderator)
const roleSchema = new Schema({
    name: { type: String, unique: true },
});
export { roleSchema };
