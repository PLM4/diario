import { UUID } from "crypto";

const API_BASE_URL = "http://localhost:8080/api";

export async function deletePost(id: UUID): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting post");
    }
  } catch (error) {
    console.error("Error in deletePost, falling back to mock:", error);
  }
}

export async function editPost(id: UUID): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error("Error edit post");
    }
  } catch (error) {
    console.error("Error in editPost, falling back to mock:", error);
  }
}
