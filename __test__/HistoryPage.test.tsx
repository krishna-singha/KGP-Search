import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HistoryPage from "@/app/history/page";
import axios from "axios";

// Mock hooks and axios
jest.mock("@/lib/redux/hooks", () => ({
  useAppSelector: jest.fn(() => ({ uid: "mock-uid" })),
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("HistoryPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search history items correctly", async () => {
    const mockData = {
      data: {
        searchHistory: [
          {
            searchid: "1",
            type: "web",
            url: "https://example.com",
            query: "test search",
            time: new Date().toISOString(),
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockData);

    render(<HistoryPage />);

    // Wait for the query text to appear
    await waitFor(() => {
      expect(screen.getByText("test search")).toBeInTheDocument();
    });

    // Check that URL is rendered
    expect(screen.getByText("https://example.com")).toBeInTheDocument();
  });

  it("shows empty message when no history exists", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { searchHistory: [] } });

    render(<HistoryPage />);

    await waitFor(() => {
      expect(
        screen.getByText("No search history found.")
      ).toBeInTheDocument();
    });
  });

  it("calls delete API when delete button is clicked", async () => {
    const mockData = {
      data: {
        searchHistory: [
          {
            searchid: "1",
            type: "web",
            url: "https://example.com",
            query: "test search",
            time: new Date().toISOString(),
          },
        ],
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockData);
    mockedAxios.delete.mockResolvedValueOnce({});

    render(<HistoryPage />);

    await waitFor(() => {
      expect(screen.getByText("test search")).toBeInTheDocument();
    });

    const deleteBtn = screen.getByLabelText("delete-history-1");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `/api/history?user_id=mock-uid&searchid=1`
      );
    });
  });
});
