import { NextResponse } from "next/server";
import connect from "@/lib/dbConnect";
import { addResource } from "@/action/resources";;
import Resource from "@/models/Resouces";

// ✅ Connect to Database
await connect();

// ✅ Utility function to validate request data
// const validateRequest = ({ domains }) => {
//     if (!Array.isArray(domains) || domains.length === 0) {
//       return { success: false, message: "At least one domain is required." };
//     }
  
//     for (const domain of domains) {
//       if (!domain.title) {
//         return { success: false, message: "Domain title is required." };
//       }
  
//       if (!domain.image) {
//         return { success: false, message: "Domain image is required." };
//       }
  
//       if (domain.topics && Array.isArray(domain.topics)) {
//         for (const topic of domain.topics) {
//           if (!topic.title) {
//             return { success: false, message: "Topic title is required." };
//           }
  
//           if (topic.subtopics && Array.isArray(topic.subtopics)) {
//             for (const sub of topic.subtopics) {
//               if (!sub.title) {
//                 return { success: false, message: "Subtopic title is required." };
//               }
//             }
//           }
//         }
//       }
//     }
  
//     return { success: true, message: "Validation successful." };
//   };
  
  

// ✅ POST Request: Calls the Server Action to Add a Resource
// ✅ POST Request: Calls the Server Action to Add a Resource
export async function POST(req) {
    try {
      const data = await req.json();
      console.log("Incoming data:", JSON.stringify(data, null, 2)); // Log the incoming data
  
      // Validate the request data
    //   const validationResult = validateRequest(data);
    //   if (!validationResult.success) {
    //     return NextResponse.json(
    //       { message: validationResult.message, success: false },
    //       { status: 400 }
    //     );
    //   }
  
      // Call Server Action (`addResource`)
      const response = await addResource(data);
      return NextResponse.json(response, { status: response.success ? 201 : 400 });
    } catch (error) {
      return NextResponse.json(
        { message: error.message || "Internal server error", success: false },
        { status: 500 }
      );
    }
  }
// ✅ GET Request: Fetch All Resources
export async function GET() {
  try {
    const resources = await Resource.find();
    return NextResponse.json({ success: true, data: resources }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch resources", success: false },
      { status: 500 }
    );
  }
}
