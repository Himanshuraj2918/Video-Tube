
import mongoose,{Schema} from "mongoose";

const subscriptionsSchema = new Schema({
      subscriber:{
        type:Schema.Types.ObjectId, //those who are subscribe
        ref:"User"
      },
      channels:{
        type:Schema.Types.ObjectId, //which channel was subscribed
        ref:"User"
      }
},
{
    timestamps:true
})

export const Subscription = mongoose.model("Subscription",subscriptionsSchema)