AI Meeting Summarizer
1. Overview

This tool is built as a single-page application (SPA) using React, demonstrating modern front-end development practices, including component-based architecture, state management with hooks, and direct API integration.

2. Features

    Dual Input Methods: Supports both pasting text directly and uploading .txt files.

    File Validation: Ensures that only valid .txt files are uploaded and processed.

    Custom Prompts: Allows users to guide the AI's summarization process with specific instructions for tailored results.

    AI-Powered Summarization: Integrates with the Google Gemini API to provide intelligent and context-aware summaries.

    Interactive UI: A clean, two-stage user interface that first captures input and then displays the editable output.

    Email Sharing: A simple feature to send the generated summary to a specified email address.

    Responsive Design: Styled with Tailwind CSS for a seamless experience across all device sizes.

3. Approach and Process

The application was developed with a focus on modularity, clean state management, and a clear user flow.
a. Component-Based Architecture

The UI is broken down into logical, reusable components:

    App (Main Component): Serves as the central hub, managing all application state and housing the core logic for API calls, file handling, and event management.

    InputComponent: A dedicated component responsible for gathering all user inputs, including the transcript (via paste or upload) and the custom prompt. It conditionally renders the text area or the file upload zone.

    OutputComponent: A component that appears after a summary has been generated. It displays the summary in an editable textarea and provides the interface for sharing it via email.

    Spinner: A simple, reusable component to indicate loading states during asynchronous operations like API calls.

b. State Management

State is managed locally within the App component using React's useState hook. This approach is sufficient for an application of this scale and avoids the overhead of more complex state management libraries. Key state variables include transcript, prompt, summary, isLoading, error, and hasGenerated (which controls the switch between the input and output views).
c. API Integration

Summary generation is handled by a direct, asynchronous fetch call to the Google Gemini API.

    The handleGenerateSummary function constructs a detailed prompt by combining the user's custom instruction with the provided transcript.

    This prompt is sent in the request body to the Gemini API endpoint.

    The application handles the API response, parsing the JSON to extract the generated text.

    Robust error handling is included to manage potential network failures or invalid API responses, displaying user-friendly error messages.

d. File Handling

File uploads are managed on the client-side using the FileReader API.

    An onChange event on the file input triggers the handleFileChange function.

    The function first validates the file to ensure it has a .txt extension and a text/plain MIME type.

    If valid, a FileReader instance reads the file's content as text.

    Upon successful loading (onload), the file's content is set to the transcript state, making it ready for summarization.

4. Tech Stack

    Front-End Framework: React (v18+) for building the user interface with functional components and hooks.

    AI Model: Google Gemini API (gemini-2.5-flash-preview-05-20) for the core text generation and summarization capabilities.

    Language: JavaScript (ES6+)

5. Deployed Link

    URL: https://summarizer-9baawkunm-amal-antonys-projects-e35e988a.vercel.app/
