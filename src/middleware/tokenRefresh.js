// middleware/tokenRefresh.js
import { clearTokens } from "../features/auth/authSlice";
import { refreshTokens } from "../features/auth/authThunks";

// Use a lock to coordinate token refresh
let refreshLock = null;

const tokenRefreshMiddleware = (store) => (next) => async (action) => {
  if (
    action.type === "auth/refreshTokens/rejected" &&
    action.error.message === "Token expired"
  ) {
    // Use a lock to coordinate token refresh
    if (!refreshLock) {
      // Create a new promise for token refresh
      refreshLock = (async () => {
        try {
          const refreshTokenValue = store.getState().auth.refreshToken;

          // Dispatch the refresh tokens thunk
          await store.dispatch(refreshTokens(refreshTokenValue));
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Handle token refresh failure, log the user out, etc.
          store.dispatch(clearTokens());
        } finally {
          // Reset the refreshLock once the refresh is complete
          refreshLock = null;
        }
      })();

      // Wait for the completion of the token refresh before retrying the original action
      await refreshLock;

      // Retry the original action after token refresh
      const retryAction = { ...action, meta: { retry: true } };
      return next(retryAction);
    } else {
      // If token refresh is already in progress, wait for its completion before retrying
      await refreshLock;

      // Retry the original action after token refresh
      const retryAction = { ...action, meta: { retry: true } };
      return next(retryAction);
    }
  }

  return next(action);
};

export default tokenRefreshMiddleware;
