import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";
import filterEmoji from "./filterEmoji";

// Mock the Clipboard library
jest.mock("clipboard", () => {
  return jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    on: jest.fn(),
  }));
});

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Emoji Search App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  it("renders the title successfully", () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    // Check if the header text "Emoji Search" is rendered
    expect(container.textContent).toContain("Emoji Search");

    // Check if header component is rendered
    const header = container.querySelector(".component-header");
    expect(header).toBeTruthy();
  });

  it("renders the emoji list successfully when the application is first opened", () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    // Check if emoji results container is rendered
    const emojiContainer = container.querySelector(".component-emoji-results");
    expect(emojiContainer).toBeTruthy();

    // Check if initial emojis are rendered (should show first 20 emojis)
    const emojiRows = container.querySelectorAll(".component-emoji-result-row");
    expect(emojiRows.length).toBe(20); // Default limit is 20

    // Check if some expected emojis are present based on filterEmoji function
    const initialEmojis = filterEmoji("", 20);
    expect(emojiRows.length).toBe(initialEmojis.length);

    // Check if the first emoji title is rendered
    expect(container.textContent).toContain(initialEmojis[0].title);
  });

  it("re-renders the emoji list according to the filter when a filtering operation is performed", () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    // Find the search input
    const searchInput = container.querySelector("input");
    expect(searchInput).toBeTruthy();

    // Test filtering by typing "cat"
    act(() => {
      searchInput.value = "cat";
      const event = new Event("change", { bubbles: true });
      searchInput.dispatchEvent(event);
    });

    // Check if results are filtered
    const catEmojis = filterEmoji("cat", 20);
    const emojiRowsAfterFilter = container.querySelectorAll(
      ".component-emoji-result-row"
    );
    expect(emojiRowsAfterFilter.length).toBe(catEmojis.length);

    // If there are cat emojis, check if they contain cat-related text
    if (catEmojis.length > 0) {
      const hasMatch = catEmojis.some((emoji) =>
        container.textContent.includes(emoji.title)
      );
      expect(hasMatch).toBe(true);
    }

    // Test filtering by typing "smile"
    act(() => {
      searchInput.value = "smile";
      const event = new Event("change", { bubbles: true });
      searchInput.dispatchEvent(event);
    });

    const smileEmojis = filterEmoji("smile", 20);
    const emojiRowsSmile = container.querySelectorAll(
      ".component-emoji-result-row"
    );
    expect(emojiRowsSmile.length).toBe(smileEmojis.length);

    // Test clearing the filter
    act(() => {
      searchInput.value = "";
      const event = new Event("change", { bubbles: true });
      searchInput.dispatchEvent(event);
    });

    const emojiRowsCleared = container.querySelectorAll(
      ".component-emoji-result-row"
    );
    expect(emojiRowsCleared.length).toBe(20); // Should return to default 20 emojis
  });

  it("copies the relevant emoji when any emoji is clicked on the list", () => {
    // Mock the Clipboard constructor
    const mockClipboard = {
      destroy: jest.fn(),
      on: jest.fn(),
    };

    const ClipboardMock = jest.fn().mockImplementation(() => mockClipboard);
    require("clipboard").mockImplementation(ClipboardMock);

    act(() => {
      ReactDOM.render(<App />, container);
    });

    // Check if clipboard was initialized with correct selector
    expect(ClipboardMock).toHaveBeenCalledWith(".copy-to-clipboard");

    // Find the first emoji row
    const firstEmojiRow = container.querySelector(
      ".component-emoji-result-row"
    );
    expect(firstEmojiRow).toBeTruthy();

    // Check if the emoji row has the correct data-clipboard-text attribute
    const clipboardText = firstEmojiRow.getAttribute("data-clipboard-text");
    expect(clipboardText).toBeTruthy();
    expect(clipboardText.length).toBeGreaterThan(0);

    // Check if the copy-to-clipboard class is present
    expect(firstEmojiRow.classList.contains("copy-to-clipboard")).toBe(true);

    // Check if "Click to copy emoji" text is present
    expect(container.textContent).toContain("Click to copy emoji");
  });

  it("displays search input with proper functionality", () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    // Check if search input is rendered
    const searchInput = container.querySelector("input");
    expect(searchInput).toBeTruthy();

    // Check if search input container has correct class
    const searchContainer = container.querySelector(".component-search-input");
    expect(searchContainer).toBeTruthy();

    // Check if input accepts text
    act(() => {
      searchInput.value = "test";
      const event = new Event("change", { bubbles: true });
      searchInput.dispatchEvent(event);
    });
    expect(searchInput.value).toBe("test");
  });

  it("shows correct emoji information in each row", () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    // Check if emoji rows contain title and image
    const firstEmojiRow = container.querySelector(
      ".component-emoji-result-row"
    );
    expect(firstEmojiRow).toBeTruthy();

    // Check if image is present
    const emojiImage = firstEmojiRow.querySelector("img");
    expect(emojiImage).toBeTruthy();
    expect(emojiImage.src).toContain("cdn.jsdelivr.net");

    // Check if title span is present
    const titleSpan = firstEmojiRow.querySelector(".title");
    expect(titleSpan).toBeTruthy();
    expect(titleSpan.textContent.length).toBeGreaterThan(0);

    // Check if info span is present
    const infoSpan = firstEmojiRow.querySelector(".info");
    expect(infoSpan).toBeTruthy();
    expect(infoSpan.textContent).toBe("Click to copy emoji");
  });

  it("verifies proper component structure", () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    // Check if all main components are rendered
    expect(container.querySelector(".component-header")).toBeTruthy();
    expect(container.querySelector(".component-search-input")).toBeTruthy();
    expect(container.querySelector(".component-emoji-results")).toBeTruthy();

    // Check if header contains emoji images
    const headerImages = container.querySelectorAll(".component-header img");
    expect(headerImages.length).toBe(2); // Two emoji images in header
  });
});
