# Connect a custom Skipole MCP server to ChatGPT

This guide covers a user- or workspace-configured custom MCP connection. It does not represent an official ChatGPT app listing or partnership.

Current MCP endpoint:

`https://skipole-data-platform.replit.app/mcp`

ChatGPT documents custom MCP connections for supported Business and Enterprise/Edu workspaces. Availability and the exact controls depend on the workspace plan and administrator settings.

## Workspace connection

1. In ChatGPT, open **Plugins** and select **Add custom MCP server**. If the workspace requires it, an administrator must first enable developer mode or custom MCP connectors.
2. Enter the endpoint above and choose OAuth authentication.
3. Complete Skipole sign-in and consent, then scan the available tools.
4. Verify the tool list and permissions before using the connection.

The Skipole MCP flow has been verified with Claude, not ChatGPT. ChatGPT authentication, discovery, and tool calls must be tested in a supported workspace before claiming compatibility. Only catalog and usage reads are currently available for live operations.
