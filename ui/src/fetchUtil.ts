export interface FetchResponse<T> {
  data?: T;
  error?: any;
}

export interface FetchRequest {
  url: string;
  options?: object;
}

export async function doFetch<T>({
  url,
  options = {}
}: FetchRequest): Promise<FetchResponse<T>> {
  try {
    const response = await fetch(url, options);

    if (response.status < 200 || response.status >= 300) {
      const error = await response.text();
      return { error };
    } else {
      const clonedResponse = response.clone();
      try {
        const data = await response.json();
        return { data };
      } catch (e) {
        console.log(
          `Failed to read JSON from response with error: ${e}; Attempting to read response as text`
        );
        const data: any = await clonedResponse.text();
        return { data };
      }
    }
  } catch (e) {
    return { error: e };
  }
}
