import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SearchResults from "@/components/searchResult";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: () => "test search",
  }),
}));

jest.mock("@/lib/redux/hooks", () => ({
  useAppSelector: jest.fn((fn) =>
    fn({
      user: { uid: "mock-uid", email: "test@example.com" },
      historyMode: { enabled: true },
      filter: { value: "all" },
    })
  ),
}));

describe("SearchResults", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockResults = [
    {
      url: "https://example.com/page1",
      favicon: "/favicon.svg",
      title: "Example Title 1",
      content: "Example content 1",
    },
    {
      url: "https://example.com/page2",
      favicon: "/favicon.svg",
      title: "Example Title 2",
      content: "Example content 2",
    },
  ];

  it("renders search results", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { results: mockResults },
    });

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText("Example Title 1")).toBeInTheDocument();
      expect(screen.getByText("Example Title 2")).toBeInTheDocument();
    });
  });

  it("shows no results found message when result list is empty", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { results: [] } });

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText("No results found!")).toBeInTheDocument();
    });
  });

  it("handles click event and history logging", async () => {
    mockedAxios.post
      .mockResolvedValueOnce({ data: { results: mockResults } }) // fetch
      .mockResolvedValueOnce({}); // click
    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText("Example Title 1")).toBeInTheDocument();
    });

    const clickable = screen.getByText("Example Title 1");
    fireEvent.click(clickable);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/click"),
        { url: "https://example.com/page1" }
      );
    });

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/history", {
      user_id: "mock-uid",
      email: "test@example.com",
      searchHistory: [
        {
          type: "click",
          query: "test search",
          url: "https://example.com/page1",
          time: expect.any(String),
        },
      ],
    });
  });

  it("paginates results correctly", async () => {
    const manyResults = Array.from({ length: 30 }).map((_, i) => ({
      url: `https://example.com/page${i + 1}`,
      favicon: "/favicon.svg",
      title: `Result ${i + 1}`,
      content: `Content ${i + 1}`,
    }));

    mockedAxios.post.mockResolvedValueOnce({
      data: { results: manyResults },
    });

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText("Result 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Next"));
    await waitFor(() => {
      expect(screen.getByText("Result 16")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Previous"));
    await waitFor(() => {
      expect(screen.getByText("Result 1")).toBeInTheDocument();
    });
  });
});
