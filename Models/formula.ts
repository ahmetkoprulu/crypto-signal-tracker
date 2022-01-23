import mongoose from "mongoose";

export interface Formula {
  _id: string;
  equation: string;
  pairs: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

const formula = new mongoose.Schema(
  {
    equation: {
      type: Array,
      index: true,
    },

    pairs: {
      type: Array,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Formula & mongoose.Document>("Formula", formula);
