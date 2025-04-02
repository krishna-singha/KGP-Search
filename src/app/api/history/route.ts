import { NextRequest, NextResponse } from "next/server";
import { Client } from "@elastic/elasticsearch";
import { v4 as uuidv4 } from "uuid";

// Initialize Elasticsearch Client
const esClient = new Client({ node: "http://localhost:9200" });

// Ensure Elasticsearch Index Exists
async function ensureIndexExists() {
  const indexExists = await esClient.indices.exists({
    index: "user_search_history",
  });

  if (!indexExists) {
    await esClient.indices.create({
      index: "user_search_history",
      body: {
        mappings: {
          properties: {
            user_id: { type: "keyword" },
            email: { type: "keyword" },
            searchid: { type: "keyword" },
            url: { type: "text" },
            time: { type: "date" },
            type: { type: "keyword" },
            query: { type: "text" },
          },
        },
      },
    });
    console.log("Created 'user_search_history' index.");
  }
}

// Store Search History (Each Entry as a Separate Document)
async function storeSearchHistory(
  userId: string,
  email: string,
  searchData: any[]
) {
  const bulkBody = searchData.flatMap((search) => [
    { index: { _index: "user_search_history", _id: uuidv4() } },
    { user_id: userId, email, searchid: uuidv4(), ...search },
  ]);

  await esClient.bulk({ refresh: true, body: bulkBody });
}

// API to Save Search History
export async function POST(request: NextRequest) {
  try {
    await ensureIndexExists();
    const { user_id, email, searchHistory } = await request.json();

    if (!user_id || !email || !searchHistory?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await storeSearchHistory(user_id, email, searchHistory);

    return NextResponse.json(
      { message: "Search history saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error saving search history:", error);
    return NextResponse.json(
      { error: "Failed to save search history" },
      { status: 500 }
    );
  }
}

// API to Retrieve Search History for a User
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing user_id parameter" },
        { status: 400 }
      );
    }

    const { hits } = await esClient.search({
      index: "user_search_history",
      body: {
        query: { term: { user_id: userId } },
        size: 10,
        sort: [{ time: "desc" }],
      },
    });

    const searchHistory = hits.hits.map((hit: any) => hit._source);

    return NextResponse.json(
      { user_id: userId, searchHistory },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error retrieving search history:", error);
    return NextResponse.json(
      { error: "Failed to retrieve search history" },
      { status: 500 }
    );
  }
}

// // API to Handle Search History Retrieval
// export async function GET(){
//   try {
//     const { hits } = await esClient.search({
//       index: "user_search_history",
//       body: {
//         query: {
//           match_all: {},
//         },
//         size: 10,
//         sort: [{ "search.time": "desc" }],
//       },
//     });
//     const searchHistory = hits.hits.map((hit: any) => hit._source);
//     return NextResponse.json(
//       { searchHistory },
//       { status: 200 }
//     );
//   }
//   catch (error) {
//     console.error("❌ Error retrieving search history:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve search history" },
//       { status: 500 }
//     );
//   }
// }

// API to Delete history for a specific user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const searchId = searchParams.get("searchid");

    if (!searchId) {
      return NextResponse.json(
        { error: "Missing searchid parameter" },
        { status: 400 }
      );
    }

    if (searchId !== "all") {
      const response = await esClient.deleteByQuery({
        index: "user_search_history",
        body: {
          query: { term: { "searchid.keyword": searchId } },
        },
      });

      if (response.deleted === 0) {
        return NextResponse.json(
          { error: "No matching search entry found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Search entry deleted successfully" },
        { status: 200 }
      );
    } else {
      await esClient.deleteByQuery({
        index: "user_search_history",
        body: {
          query: { term: { user_id: userId } },
        },
      });

      return NextResponse.json(
        { message: `Deleted all searches for user ${userId}` },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("❌ Error deleting user search history:", error);
    return NextResponse.json(
      { error: "Failed to delete search history" },
      { status: 500 }
    );
  }
}
