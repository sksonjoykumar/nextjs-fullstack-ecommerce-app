import mongoose from 'mongoose';

const useSchema = new mongoose.Schema(
  {
    clerkId: String,
    wishlist: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Ensure the model is only created once
const User = mongoose.models.User || mongoose.model('User', useSchema);

// export user model
export default User;
