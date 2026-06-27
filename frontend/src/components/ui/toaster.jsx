"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

const _baseToaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

// Provide a backward-compatible `add` method used across the codebase.
if (typeof _baseToaster.add !== "function") {
  _baseToaster.add = (opts) => {
    // Try known method names from different toaster implementations
    if (typeof _baseToaster.push === "function") return _baseToaster.push(opts);
    if (typeof _baseToaster.toast === "function")
      return _baseToaster.toast(opts);
    if (typeof _baseToaster.notify === "function")
      return _baseToaster.notify(opts);
    if (typeof _baseToaster.create === "function")
      return _baseToaster.create(opts);
    // Last resort: log to console so it's visible during development
    // eslint-disable-next-line no-console
    console.warn("toaster.add: no underlying method found", opts);
    return null;
  };
}

export const toaster = _baseToaster;

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
