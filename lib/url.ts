import { model, models, Schema } from "mongoose";

const urlSchema = new Schema(
  {
    url: { type: String, required: true },
    shorturl: { type: String, required: true, unique: true },
    userId: { type: String, default: null }, // Clerk userId or null
    clicksByDate: {
      type: Map,
      of: Number, // date string (YYYY-MM-DD) -> count
      default: {},
    },
  },
  { timestamps: true }
);

const Url = models.Url || model("Url", urlSchema);
export default Url;